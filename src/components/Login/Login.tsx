// src/components/Login/Login.tsx
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Login.css';

type FormData = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<FormData>();

 const onSubmit = async (data: FormData) => {
  try {
    const res = await axios.post('https://dummyjson.com/auth/login', data);
    const userRes = await axios.get(`https://dummyjson.com/users/${res.data.id}`);

    localStorage.setItem('token', res.data.token); // optional
    localStorage.setItem('user', JSON.stringify(userRes.data));

    window.location.href = '/dashboard'; // redirect
  } catch {
    // handle error
  }
};

  return (
    <div className="login-bg d-flex align-items-center justify-content-center vh-100">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="text-center fw-bold">User Management System</h3>
        <p className="text-center text-muted mb-4">SIGN IN</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              {...register('username', { required: 'Username is required' })}
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register('password', { required: 'Password is required' })}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 fw-bold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
