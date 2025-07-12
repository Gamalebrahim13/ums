// src/components/Profile/Profile.tsx
import  { useEffect, useState } from 'react';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [isDark, setIsDark] = useState(false); // 💡 Dark mode toggle

  useEffect(() => {
    axios.get('https://dummyjson.com/users/1').then((res) => setUser(res.data));
  }, []);

  if (!user) return <p className="text-center mt-5">Loading profile...</p>;

  return (
    <div
      className={`container-fluid py-5 min-vh-100 ${
        isDark ? 'bg-dark text-white' : 'bg-light text-dark'
      }`}
    >
      <div className="container">
        <div className="d-flex justify-content-between  align-items-center mb-4">
          <h4 className="fw-bold">Profile</h4>
          <button
            className={`btn btn-sm ${isDark ? 'btn-light' : 'btn-dark'}`}
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div
          className="card shadow p-4"
          style={{
            backgroundColor: isDark ? '#1f1f1f' : '#fff',
            border: 'none',
          }}
        >
          <div className="text-center mb-4">
            <img
              src={user.image}
              alt="User Avatar"
              className="rounded-circle"
              width="100"
              height="100"
            />
          </div>

          <div className="row">
            {[
              { label: 'First Name', value: user.firstName },
              { label: 'Last Name', value: user.lastName },
              { label: 'Email', value: user.email },
              { label: 'Age', value: user.age },
              { label: 'Phone Number', value: user.phone },
              { label: 'Birth Date', value: user.birthDate },
            ].map((field, idx) => (
              <div className="col-md-6 mb-3" key={idx}>
                <label className={`form-label ${isDark ? 'text-white' : 'text-dark'}`}>
               {field.label}
                </label>

                <input
                  className={`form-control ${
                    isDark ? 'bg-dark text-white border-secondary' : ''
                  }`}
                  value={field.value}
                  readOnly
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
