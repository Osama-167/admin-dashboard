import { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Card } from 'react-bootstrap';
import NavbarComponent from './Navbar';
import { ip } from './ip';

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const fetchDoctors = async () => {
    try {
      const res = await fetch(`${ip}/admin/doctors`);
      const data = await res.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async () => {
    try {
      const res = await fetch(`${ip}/admin/create-doctor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          rePassword: formData.password,
        }),
      });

      if (res.ok) {
        fetchDoctors();
        setShowAddModal(false);
        setFormData({});
        alert('Doctor added successfully!');
      } else {
        const data = await res.json();
        console.error('Add error:', data.message);
      }
    } catch (error) {
      console.error('Add doctor error:', error);
    }
  };

  const handleEditDoctor = async () => {
    try {
      const res = await fetch(`${ip}/admin/update-doctor/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchDoctors();
        setShowEditModal(false);
        setFormData({});
        alert('Doctor updated successfully!');
      } else {
        const data = await res.json();
        console.error('Update error:', data.message);
      }
    } catch (error) {
      console.error('Update doctor error:', error);
    }
  };

  const openEditModal = (doctor) => {
    setEditId(doctor._id);
    setFormData(doctor);
    setShowEditModal(true);
  };

  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this doctor?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${ip}/admin/delete-doctor/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchDoctors();
        alert('Doctor deleted successfully!');
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Delete doctor error:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#e9f7f6', minHeight: '100vh' }}>
      <NavbarComponent />
      <Container className="py-5">
        <Row className="mb-4">
          <Col className="d-flex justify-content-between align-items-center">
            <h3 style={{ color: '#077A7D' }}>Doctor Management</h3>
            <Button style={{ backgroundColor: '#077A7D', border: 'none' }} onClick={() => setShowAddModal(true)}>+ Add Doctor</Button>
          </Col>
        </Row>

        <Card className="p-4 shadow-sm border-0">
          <Table hover responsive>
            <thead style={{ backgroundColor: '#077A7D', color: 'white' }}>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor, idx) => (
                <tr key={doctor._id}>
                  <td>{idx + 1}</td>
                  <td>{doctor.firstName}</td>
                  <td>{doctor.lastName}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>{doctor.gender}</td>
                  <td>
                    <span className={`badge ${doctor.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>{doctor.status}</span>
                  </td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => openEditModal(doctor)}>Edit</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => deleteDoctor(doctor._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton><Modal.Title>Add New Doctor</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3"><Form.Control placeholder="First Name" name="firstName" value={formData.firstName || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control placeholder="Last Name" name="lastName" value={formData.lastName || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="email" placeholder="Email" name="email" value={formData.email || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="text" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3">
                <Form.Select name="gender" value={formData.gender || ''} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3"><Form.Control type="password" placeholder="Password" name="password" value={formData.password || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="date" placeholder="Birthday" name="birthday" value={formData.birthday || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control placeholder="Medical Specialty" name="medicalSpecialty" value={formData.medicalSpecialty || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="number" placeholder="Experience (years)" name="experience" value={formData.experience || ''} onChange={handleInputChange} /></Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAddDoctor}>Add</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton><Modal.Title>Edit Doctor</Modal.Title></Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3"><Form.Control placeholder="First Name" name="firstName" value={formData.firstName || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control placeholder="Last Name" name="lastName" value={formData.lastName || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="email" placeholder="Email" name="email" value={formData.email || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="text" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3">
                <Form.Select name="gender" value={formData.gender || ''} onChange={handleInputChange}>
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3"><Form.Control type="password" placeholder="Password" name="password" value={formData.password || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="date" placeholder="Birthday" name="birthday" value={formData.birthday || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control placeholder="Medical Specialty" name="medicalSpecialty" value={formData.medicalSpecialty || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="number" placeholder="Experience (years)" name="experience" value={formData.experience || ''} onChange={handleInputChange} /></Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleEditDoctor}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

      </Container>
    </div>
  );
}
