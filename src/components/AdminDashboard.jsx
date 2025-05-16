import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';
import Chart from 'chart.js/auto';
import NavbarComponent from './Navbar';
import { ip } from './ip';

export default function AdminDashboard() {
  const chartRef = useRef(null);
  const myChart = useRef(null);
  const [adminName, setAdminName] = useState('Admin');
  const [counts, setCounts] = useState({ users: 0, doctors: 0, admins: 0 });
  const [genderStats, setGenderStats] = useState({ male: 0, female: 0 });
  const [monthlyGenderData, setMonthlyGenderData] = useState({
    malePatients: Array(12).fill(0),
    maleDoctors: Array(12).fill(0),
    femalePatients: Array(12).fill(0),
    femaleDoctors: Array(12).fill(0),
  });
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('admin'));
    if (storedAdmin) {
      setAdminName(`${storedAdmin.firstName} ${storedAdmin.lastName}`);
    }
  }, []);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const res = await fetch(`${ip}/admin/counts`);
        const data = await res.json();
        setCounts(data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    }

    async function fetchGenderStats() {
      try {
        const res = await fetch(`${ip}/admin/gender-stats`);
        const data = await res.json();
        setGenderStats(data);
      } catch (error) {
        console.error('Error fetching gender stats:', error);
      }
    }

    fetchCounts();
    fetchGenderStats();
  }, []);

  useEffect(() => {
    async function fetchMonthlyGenderRegistrations() {
      try {
        const res = await fetch(`${ip}/admin/monthly-gender-registrations?year=${selectedYear}`);
        const data = await res.json();
        setMonthlyGenderData(data);
      } catch (error) {
        console.error('Error fetching monthly gender registrations:', error);
      }
    }

    fetchMonthlyGenderRegistrations();
  }, [selectedYear]);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    if (myChart.current) {
      myChart.current.destroy();
    }

    myChart.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Male Patients',
            data: monthlyGenderData.malePatients,
            backgroundColor: '#ADD8E6',
          },
          {
            label: 'Male Doctors',
            data: monthlyGenderData.maleDoctors,
            backgroundColor: '#00008B',
          },
          {
            label: 'Female Patients',
            data: monthlyGenderData.femalePatients,
            backgroundColor: '#FFB6C1',
          },
          {
            label: 'Female Doctors',
            data: monthlyGenderData.femaleDoctors,
            backgroundColor: '#C71585',
          },
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'bottom' }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

    return () => {
      if (myChart.current) {
        myChart.current.destroy();
      }
    };
  }, [monthlyGenderData, selectedYear]);

  const years = [
    new Date().getFullYear(),
    new Date().getFullYear() - 1,
    new Date().getFullYear() - 2,
  ];

  return (
    <div style={{ backgroundColor: '#e9f7f6', minHeight: '100vh' }}>
      <NavbarComponent />
      <Container className="py-5">
        <h3 className="mb-4 text-dark">
          Welcome, <strong style={{ color: '#077A7D' }}>{adminName}</strong> 👋
        </h3>

        <Row className="g-4">
          <Col md={4}>
            <Card className="p-4 shadow-sm border-0">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-person-fill me-3 fs-3 text-primary"></i>
                <h5 className="card-title mb-0">Users</h5>
              </div>
              <div style={{ fontSize: '2rem', color: '#077A7D' }}>{counts.users}</div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-4 shadow-sm border-0">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-person-badge-fill me-3 fs-3 text-info"></i>
                <h5 className="card-title mb-0">Doctors</h5>
              </div>
              <div style={{ fontSize: '2rem', color: '#077A7D' }}>{counts.doctors}</div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="p-4 shadow-sm border-0">
              <div className="d-flex align-items-center mb-3">
                <i className="bi bi-person-check-fill me-3 fs-3 text-warning"></i>
                <h5 className="card-title mb-0">Admins</h5>
              </div>
              <div style={{ fontSize: '2rem', color: '#077A7D' }}>{counts.admins}</div>
            </Card>
          </Col>
        </Row>

        <div className="mt-5 p-4 shadow-sm rounded" style={{ backgroundColor: 'white' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">User Registration by Month</h5>
            <Form.Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              style={{ width: 'auto', borderColor: '#e0e0e0' }}
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Form.Select>
          </div>
          <canvas ref={chartRef} height="100"></canvas>
        </div>
      </Container>
    </div>
  );
}
