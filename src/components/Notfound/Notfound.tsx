// src/components/Notfound/Notfound.tsx

import { Link } from 'react-router-dom';

export default function Notfound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Page Not Found</h1>
      <p style={styles.text}>
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/dashboard" style={styles.button}>
        ⬅️ Back to Dashboard
      </Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center' as const,
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f8f8f8',
    minHeight: '100vh',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#dc3545',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px 24px',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
  },
};
