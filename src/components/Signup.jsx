import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ip } from './ip';

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    phoneNumber: '',
    birthday: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ip}/admin/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup successful!');
        navigate('/admin'); 
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Signup failed. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundColor: '#e9f7f6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '90%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4" style={{ color: '#077A7D' }}>Signup</h2>

        <input type="text" name="firstName" placeholder="First Name" className="form-control mb-3" value={formData.firstName} onChange={handleChange} required />
        <input type="text" name="lastName" placeholder="Last Name" className="form-control mb-3" value={formData.lastName} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control mb-3" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" className="form-control mb-3" value={formData.password} onChange={handleChange} required />

        <select name="gender" className="form-select mb-3" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <input type="text" name="phoneNumber" placeholder="Phone Number" className="form-control mb-3" value={formData.phoneNumber} onChange={handleChange} required />
        <input type="date" name="birthday" className="form-control mb-3" value={formData.birthday} onChange={handleChange} required />

        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#077A7D', border: 'none' }}>Sign Up</button>
      </form>
    </div>
  );
}


const styles = {
  container: {
    backgroundColor: '#e9f7f6',
    minHeight: '100vh',
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#077A7D',
    marginBottom: '30px',
  },
  form: {
    maxWidth: '400px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  button: {
    padding: '12px',
    backgroundColor: '#077A7D',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
  }
};
