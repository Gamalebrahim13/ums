// src/components/Login/Home/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../AuthContext/AuthContext';
import { FaUsers, FaUserPlus, FaChartBar } from 'react-icons/fa';

export default function Home() {
  const { user } = useAuth();
  const [userCount, setUserCount] = useState<number>(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users')
      .then((res) => setUserCount(res.data.total))
      .catch((err) => console.error(err));
  }, []);

  const cardStyle = {
    backgroundColor: isDark ? '#1f1f1f' : '#ffffff',
    color: isDark ? '#ffffff' : '#000000',
    border: isDark ? '1px solid #444' : '1px solid #ddd',
    transition: '0.3s',
    borderRadius: '10px',
    minHeight: '150px',
  };

  return (
    <div
      className={`container-fluid py-4 min-vh-100 ${
        isDark ? 'bg-dark text-white' : 'bg-light text-dark'
      }`}
    >
      <div className="container">
        {/* Header & Dark Mode Toggle */}
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
          <h2 className="fw-bold m-0">👋 Welcome, {user?.firstName || 'User'}!</h2>
          <button
            className={`btn btn-sm ${isDark ? 'btn-light' : 'btn-dark'}`}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        {/* Cards Row */}
        <div className="row g-4">
          {/* Total Users */}
          <div className="col-lg-4 col-md-6">
            <div
              className="card shadow-sm p-3 d-flex flex-row align-items-center gap-3"
              style={cardStyle}
            >
              <FaUsers size={32} className="text-primary" />
              <div>
                <h6 className="mb-0">Total Users</h6>
                <h4 className="fw-bold">{userCount}</h4>
              </div>
            </div>
          </div>

          {/* Add New User */}
          <div className="col-lg-4 col-md-6">
            <div
              className="card shadow-sm p-3 d-flex flex-row align-items-center gap-3"
              style={cardStyle}
            >
              <FaUserPlus size={32} className="text-success" />
              <div>
                <h6 className="mb-0">Add New User</h6>
                <a
                  href="/dashboard/userdata"
                  className={`btn btn-sm mt-2 fw-bold ${
                    isDark ? 'btn-warning text-dark' : 'btn-warning'
                  }`}
                >
                  Go to Form
                </a>
              </div>
            </div>
          </div>

          {/* Placeholder Feature */}
          <div className="col-lg-4 col-md-12">
            <div
              className="card shadow-sm p-3 d-flex flex-row align-items-center gap-3"
              style={cardStyle}
            >
              <FaChartBar size={32} className="text-info" />
              <div>
                <h6 className="mb-0">More Features</h6>
                <p className="small mb-0 text-muted">
                  Dashboard updates coming soon.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
