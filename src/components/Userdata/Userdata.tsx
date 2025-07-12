import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

import './UserData.css';

type UserFormData = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  birthDate: string;
};

export default function Usersdata() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();
  const [isDark] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormData>();

  function formatDateForInput(dateString: string) {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  useEffect(() => {
    if (isEditMode) {
      axios.get(`https://dummyjson.com/users/${id}`).then((res) => {
        const data = res.data;
        reset({
          firstName: data.firstName,
          lastName: data.lastName,
          age: data.age,
          email: data.email,
          phone: data.phone,
          birthDate: formatDateForInput(data.birthDate),
        });
      });
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data: UserFormData) => {
    try {
      if (isEditMode) {
        await axios.put(`https://dummyjson.com/users/${id}`, data);
        toast.success('User updated successfully!');
      } else {
        await axios.post('https://dummyjson.com/users/add', data);
        toast.success('User added successfully!');
      }
      setTimeout(() => navigate('/dashboard/users'), 1500);
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className={`container-fluid py-5 min-vh-100 d-flex justify-content-center align-items-start ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <div className="form-container">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold">{isEditMode ? 'Update User' : 'Add New User'}</h4>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            {[
              { name: 'firstName', placeholder: 'First Name', rules: { required: 'First name is required' } },
              { name: 'lastName', placeholder: 'Last Name', rules: { required: 'Last name is required' } },
              {
                name: 'email', placeholder: 'Email', rules: {
                  required: 'Email is required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                }
              },
              {
                name: 'phone', placeholder: 'Phone', rules: {
                  required: 'Phone is required',
                  pattern: {
                    value: /^\+?[0-9\s\-]{10,20}$/,
                    message: 'Invalid phone number'
                  }
                }
              },
              {
                name: 'age', placeholder: 'Age', type: 'number', rules: {
                  required: 'Age is required',
                  min: { value: 1, message: 'Minimum age is 1' }
                }
              },
              { name: 'birthDate', placeholder: 'Birth Date', type: 'date', rules: { required: 'Birth date is required' } },
            ].map((field, i) => (
              <div className="col-12 col-md-6 mb-3" key={i}>
                <input
                  type={field.type || 'text'}
                  className="form-control"
                  placeholder={field.placeholder}
                  {...register(field.name as keyof UserFormData, field.rules)}
                />
                {errors[field.name as keyof UserFormData] && (
                  <small className="text-danger">
                    {errors[field.name as keyof UserFormData]?.message as string}
                  </small>
                )}
              </div>
            ))}
            <div className="col-12 mt-3">
              <button type="submit" className="btn btn-warning fw-bold w-100">
                {isEditMode ? 'Update User' : 'Add User'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
