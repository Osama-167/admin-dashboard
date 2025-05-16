import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import DoctorManagement from './components/DoctorManagement';
import UserManagement from './components/UserManagement';
import LandingPage from './components/Screen1';
import Signup from './components/Signup';
import Signin from './components/Signin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/doctor" element={<DoctorManagement />} />
        <Route path="/user" element={<UserManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
