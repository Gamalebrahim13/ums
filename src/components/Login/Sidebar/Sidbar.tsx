import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUsers, FaUser, FaSignOutAlt, FaIdBadge } from 'react-icons/fa';
import { useAuth } from '../../../components/AuthContext/AuthContext'; // ✅ استدعاء الكونتكست

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useAuth(); // ✅ جلب بيانات المستخدم

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: '/dashboard/home', label: 'Home', icon: <FaHome /> },
    { path: '/dashboard/users', label: 'Users', icon: <FaUsers /> },
    { path: '/dashboard/userdata', label: 'User Data', icon: <FaUser /> },
    { path: '/dashboard/profile', label: 'Profile', icon: <FaIdBadge /> },
  ];

  return (
    <div
      className="text-dark d-flex flex-column justify-content-between vh-100 p-2"
      style={{
        width: isOpen ? '220px' : '70px',
        transition: '0.3s',
        backgroundColor: '#F2EAE1',
        minHeight: '100vh',
        borderRight: '1px solid #ddd',
      }}
    >
      {/* Toggle Button */}
      <div className="d-flex justify-content-start">
        <button
          className="btn btn-sm btn-outline-dark mb-2"
          onClick={toggleSidebar}
        >
          {isOpen ? '⮜' : '⮞'}
        </button>
      </div>

      {/* Profile Image & Name */}
      <div className="text-center mb-4">
        <img
          src={user?.image || '/default-avatar.png'} // ✅ الصورة من context
          alt="Avatar"
          className="rounded-circle"
          style={{ width: isOpen ? '80px' : '40px', transition: '0.3s' }}
        />
        {isOpen && (
          <p className="mt-2 mb-0 fw-bold">
            {user?.firstName || 'Loading...'} {/* ✅ الاسم من context */}
          </p>
        )}
      </div>

      {/* Menu Items */}
      <div className="d-flex flex-column align-items-center flex-grow-1 justify-content-start gap-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `text-decoration-none d-flex align-items-center text-dark p-2 rounded w-100 
              ${isActive ? 'bg-warning fw-bold' : 'bg-transparent'}`
            }
            title={!isOpen ? item.label : ''}
          >
            <div className="me-2">{item.icon}</div>
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="text-center mb-2">
        <NavLink
          to="/"
          className="text-decoration-none d-flex align-items-center text-dark p-2 rounded w-100"
        >
          <FaSignOutAlt className="me-2" />
          {isOpen && <span>Logout</span>}
        </NavLink>
      </div>
    </div>
  );
}
