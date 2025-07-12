// src/components/Login/Userslist/UsersList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function UsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://dummyjson.com/users')
      .then((res) => setUsers(res.data.users))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (id: number) => {
    setSelectedUserId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedUserId !== null) {
      setUsers(users.filter((user) => user.id !== selectedUserId));
      setShowDeleteModal(false);
      setSelectedUserId(null);
    }
  };

  const handleEdit = (user: any) => {
    navigate(`/dashboard/userdata/${user.id}`);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-3">
        <h4 className="fw-bold m-0">Users List</h4>

        <div className="d-flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            className="form-control"
            style={{ minWidth: '200px' }}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-warning fw-bold"
            onClick={() => navigate('/dashboard/userdata')}
          >
            ADD NEW User
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Birth Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user: any) => (
              <tr key={user.id}>
                <td>
                  <img
                    src={user.image}
                    alt="avatar"
                    width="40"
                    height="40"
                    className="rounded-circle"
                  />
                </td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.birthDate}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
