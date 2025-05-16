import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ip } from './ip';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${ip}/admin/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Login successful!');
        navigate('/admin');
      } else {
        alert(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Signin error:', error);
      alert('Signin failed. Please try again later.');
    }
  };

  return (
    <div style={{ backgroundColor: '#e9f7f6', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '30px', borderRadius: '10px', width: '90%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4" style={{ color: '#077A7D' }}>Sign In</h2>

        <input type="email" placeholder="Email" className="form-control mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="form-control mb-3" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#077A7D', border: 'none' }}>Sign In</button>
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
