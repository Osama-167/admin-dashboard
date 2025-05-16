import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/project.png';

export default function NavbarComponent() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('admin');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#077A7D' }}>
      <div className="container">
        <Link className="navbar-brand text-white fw-bold" to="/admin" style={{ fontSize: '25px' }}>
          <img src={logo} alt="Logo" style={{ width: '65px', height: '90px' }} /> GlucoCare Monitor
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/admin' ? 'active' : ''}`}
                to="/admin"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/user' ? 'active' : ''}`}
                to="/user"
              >
                User
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === '/doctor' ? 'active' : ''}`}
                to="/doctor"
              >
                Doctor
              </Link>
            </li>
            <li className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-light ms-3"
                style={{ fontWeight: 'bold' }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
