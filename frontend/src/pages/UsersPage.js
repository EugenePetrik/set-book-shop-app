import React, { useState, useEffect } from 'react';
import { getUsers, createUser, deleteUser } from '../services/userApi';
import Notification from '../components/Notification';

import '../styles/pages/UsersPage.css';

const UsersPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    login: '',
    email: '',
    address: '',
    userId: '',
  });

  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        if (Array.isArray(usersData.data)) {
          setUsers(usersData.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        setNotification({ message: 'Failed to fetch users', type: 'error' });
      }
    };

    fetchUsers();
  }, []);

  const handleChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async e => {
    e.preventDefault();
    // TODO: Implement the user search functionality
  };

  const handleCreateUser = async () => {
    try {
      await createUser(formData);
      setNotification({ message: 'User created successfully', type: 'success' });
      // Refresh users list
      const usersData = await getUsers();
      setUsers(usersData.data);
    } catch (error) {
      setNotification({ message: 'Failed to create user', type: 'error' });
    }
  };

  const handleUpdateUser = async userId => {
    // TODO: Implement the user update functionality
  };

  const handleDeleteUser = async userId => {
    try {
      await deleteUser(userId);
      setNotification({ message: 'User deleted successfully', type: 'success' });
      // Refresh users list
      const usersData = await getUsers();
      setUsers(usersData.data);
    } catch (error) {
      setNotification({ message: 'Failed to delete user', type: 'error' });
    }
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="container users-page">
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
      <form className="search-form" onSubmit={handleSearch}>
        <div className="form-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login">Login</label>
          <input
            type="text"
            name="login"
            value={formData.login}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group full-width">
          <label htmlFor="userId">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
          />
        </div>
        <div className="search-button-container">
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
      <h3>Search Results</h3>
      <table className="table users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>User Name</th>
            <th>Login</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map(user => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.login}</td>
              <td>{user.email}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="actions-pagination-container">
        <div className="actions">
          <button onClick={handleCreateUser} className="create-button">
            Create
          </button>
          <button onClick={handleUpdateUser} className="edit-button">
            Edit
          </button>
          <button onClick={handleDeleteUser} className="delete-button">
            Delete
          </button>
        </div>
        <div className="pagination pagination-with-buttons">
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
          {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
            <button
              key={number + 1}
              onClick={() => paginate(number + 1)}
              className={number + 1 === currentPage ? 'active' : ''}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(users.length / usersPerPage)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
