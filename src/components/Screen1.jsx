import { Link } from 'react-router-dom';
import logo from '../assets/project.png';
import dna from '../assets/dna.png';

export default function Screen1() {
  return (
    <div style={styles.container}>
      <div style={styles.logoSection}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <h1 style={styles.title}>Gluco<span style={styles.span}>Care</span> Monitor</h1>
      </div>

      <img src={dna} alt="DNA Background" style={styles.dnaBackground} />

      <div style={styles.buttonContainer}>
        <Link to="/signin" style={styles.button}><i className="bi bi-box-arrow-in-right"></i> Sign In</Link>
        <Link to="/signup" style={styles.button}><i className="bi bi-person-plus-fill"></i> Sign Up</Link>
      </div>

      <button style={styles.languageButton}><i className="bi bi-translate"></i> Language</button>
    </div>
  );
}

const styles = {
  container: {
    margin: 0,
    padding: 0,
    background: 'linear-gradient(135deg, #00a8a8, #5de0e6)',
    fontFamily: 'Segoe UI, sans-serif',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    position: 'relative',
    textAlign: 'center'
  },
  logoSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '50px',
    zIndex: 2
  },
  logo: {
    width: '120px',
    height: 'auto',
    marginBottom: '15px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    margin: 0,
    letterSpacing: '2px'
  },
  span: {
    color: '#077A7D'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    marginBottom: '20px',
    zIndex: 2
  },
  button: {
    background: '#fff',
    color: '#077A7D',
    fontWeight: 600,
    padding: '12px 30px',
    fontSize: '18px',
    borderRadius: '50px',
    textDecoration: 'none',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  languageButton: {
    background: '#fff',
    color: '#077A7D',
    fontWeight: 600,
    padding: '10px 20px',
    borderRadius: '30px',
    fontSize: '16px',
    marginTop: '20px',
    zIndex: 2,
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
    transition: 'all 0.3s',
    border: 'none'
  },
  dnaBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.3,
    zIndex: 1
  }
};
