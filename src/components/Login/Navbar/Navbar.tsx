// src/components/Navbar/Navbar.tsx
import  { useEffect, useState } from 'react';
import { useAuth } from '../../../components/AuthContext/AuthContext';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user } = useAuth();
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <nav
      className={`navbar px-4 py-2 border-bottom shadow-sm ${
        isDark ? 'bg-dark text-white' : 'bg-light'
      }`}
      style={{ minHeight: '60px' }} // ✅ تقليل الحجم
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Logo / Title */}
        <Link
          className={`navbar-brand fw-bold fs-5 ${isDark ? 'text-warning' : 'text-dark'}`}
          to="/dashboard/home"
        >
          🧑‍💻 UMS
        </Link>

        <div className="d-flex align-items-center gap-3">
          {/* زر تغيير الوضع */}
          <button
            onClick={() => setIsDark((prev) => !prev)}
            className={`btn btn-sm ${isDark ? 'btn-light' : 'btn-dark'}`}
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          {/* اسم وصورة المستخدم */}
          <span className="fw-bold">{user?.firstName || 'User'}</span>
          <img
            src={user?.image || '/default-avatar.png'}
            alt="avatar"
            className="rounded-circle"
            style={{ width: '35px', height: '35px', objectFit: 'cover' }}
          />
        </div>
      </div>
    </nav>
  );
}
