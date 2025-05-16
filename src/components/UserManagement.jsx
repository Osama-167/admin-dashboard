import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Modal, Form } from 'react-bootstrap';
import NavbarComponent from './Navbar';
import { ip } from './ip';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editId, setEditId] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${ip}/admin/users`);
      const data = await res.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddUser = async () => {
    if (formData.diabetesType < 1 || formData.diabetesType > 3) {
      alert('Diabetes Type must be 1, 2 or 3');
      return;
    }
    try {
      const res = await fetch(`${ip}/admin/create-user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ...formData,
          rePassword: formData.password,
        }),
      });

      if (res.ok) {
        fetchUsers();
        setShowAddModal(false);
        setFormData({});
        alert('User added successfully!');
      } else {
        const data = await res.json();
        console.error('Add error:', data.message);
      }
    } catch (error) {
      console.error('Add user error:', error);
    }
  };

  const handleEditUser = async () => {
    if (formData.diabetesType < 1 || formData.diabetesType > 3) {
      alert('Diabetes Type must be 1, 2 or 3');
      return;
    }
    try {
      const res = await fetch(`${ip}/admin/update-user/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchUsers();
        setShowEditModal(false);
        setFormData({});
        alert('User updated successfully!');
      } else {
        const data = await res.json();
        console.error('Update error:', data.message);
      }
    } catch (error) {
      console.error('Update user error:', error);
    }
  };

  const openEditModal = (user) => {
    setEditId(user._id);
    setFormData(user);
    setShowEditModal(true);
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;
    try {
      const res = await fetch(`${ip}/admin/delete-user/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUsers();
        alert('User deleted successfully!');
      } else {
        console.error('Delete failed');
      }
    } catch (error) {
      console.error('Delete user error:', error);
    }
  };

  return (
    <div style={{ backgroundColor: '#e9f7f6', minHeight: '100vh' }}>
      <NavbarComponent />
      <Container className="py-5">
        <Row className="mb-4">
          <Col className="d-flex justify-content-between align-items-center">
            <h3 style={{ color: '#077A7D' }}>User Management</h3>
            <Button style={{ backgroundColor: '#077A7D', border: 'none' }} onClick={() => setShowAddModal(true)}>+ Add User</Button>
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
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <td>{idx + 1}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.gender}</td>
                  <td>
                    <span className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>{user.status}</span>
                  </td>
                  <td>
                    <Button variant="warning" size="sm" onClick={() => openEditModal(user)}>Edit</Button>{' '}
                    <Button variant="danger" size="sm" onClick={() => deleteUser(user._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
          <Modal.Header closeButton><Modal.Title>Add New User</Modal.Title></Modal.Header>
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
              <Form.Group className="mb-3"><Form.Control type="number" placeholder="Weight (kg)" name="weight" value={formData.weight || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="number" placeholder="Diabetes Type (1-3)" name="diabetesType" value={formData.diabetesType || ''} onChange={handleInputChange} /></Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAddUser}>Add</Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton><Modal.Title>Edit User</Modal.Title></Modal.Header>
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
              <Form.Group className="mb-3"><Form.Control type="number" placeholder="Weight (kg)" name="weight" value={formData.weight || ''} onChange={handleInputChange} /></Form.Group>
              <Form.Group className="mb-3"><Form.Control type="number" placeholder="Diabetes Type (1-3)" name="diabetesType" value={formData.diabetesType || ''} onChange={handleInputChange} /></Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleEditUser}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
}
