import React, { useState, useEffect } from 'react';
import { useAuth } from '../component/Context';
import axios from 'axios';

const UserProfile = ({ onBack }) => {
  const { user, token, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Mock order history data
  const orderHistory = [
    {
      id: 'ORD-001',
      date: '2025-01-25',
      items: ['Chocolate Cake', 'Croissants x3'],
      total: 35.49,
      status: 'delivered'
    },
    {
      id: 'ORD-002',
      date: '2025-01-20',
      items: ['Vanilla Cupcakes x6', 'Brownies x4'],
      total: 28.50,
      status: 'delivered'
    },
    {
      id: 'ORD-003',
      date: '2025-01-15',
      items: ['Fruit Pastries x2'],
      total: 8.50,
      status: 'processing'
    }
  ];

  // Mock shopping cart data
  const shoppingCart = [
    {
      id: 1,
      name: 'Butter Biscuits',
      price: 2.25,
      quantity: 4,
      image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Fudge Brownies',
      price: 3.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=100&h=100&fit=crop'
    }
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
      });
      if (user.profilePic?.url) {
        setPreviewUrl(`http://localhost:7000${user.profilePic.url}`);
      }
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('username', formData.username);
      data.append('email', formData.email);
      if (profilePic) {
        data.append('profilePic', profilePic);
      }

      const response = await axios.put(
        'http://localhost:7000/api/auth/update-profile',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.data.user) {
        updateUser(response.data.user);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('Failed to update profile');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      delivered: 'badge bg-success',
      processing: 'badge bg-warning text-dark',
      cancelled: 'badge bg-danger'
    };
    return badges[status] || 'badge bg-secondary';
  };

  const cartTotal = shoppingCart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="min-vh-100" style={{ backgroundColor: 'var(--bakery-cream)' }}>
      {/* Header */}
      <div className="navbar-bakery py-3">
        <div className="container">
          <div className="d-flex align-items-center">
            <button 
              className="btn btn-outline-light me-3"
              onClick={onBack}
            >
              ← Back to Shop
            </button>
            <h2 className="text-white mb-0">User Profile</h2>
          </div>
        </div>
      </div>

      <div className="container py-4">
        <div className="row">
          <div className="col-md-3 mb-4">
            {/* Profile Picture */}
            <div className="card form-bakery text-center">
              <div className="card-body">
                <div className="mb-3">
                  {previewUrl ? (
                    <img 
                      src={previewUrl} 
                      alt="Profile" 
                      className="rounded-circle"
                      style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div 
                      className="rounded-circle bg-secondary d-flex align-items-center justify-content-center mx-auto"
                      style={{ width: '120px', height: '120px' }}
                    >
                      <span className="text-white fs-1">👤</span>
                    </div>
                  )}
                </div>
                <h5>{user?.username}</h5>
                <p className="text-muted">{user?.email}</p>
              </div>
            </div>
          </div>

          <div className="col-md-9">
            {/* Navigation Tabs */}
            <ul className="nav nav-tabs nav-tabs-bakery mb-4">
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  Profile Details
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`}
                  onClick={() => setActiveTab('orders')}
                >
                  Order History
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link ${activeTab === 'cart' ? 'active' : ''}`}
                  onClick={() => setActiveTab('cart')}
                >
                  Shopping Cart
                </button>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Profile Details Tab */}
              {activeTab === 'profile' && (
                <div className="card form-bakery">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h5>Profile Information</h5>
                      <button 
                        className="btn btn-outline-bakery"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                      </button>
                    </div>

                    {isEditing ? (
                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Username</label>
                            <input 
                              type="text"
                              className="form-control"
                              name="username"
                              value={formData.username}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input 
                              type="email"
                              className="form-control"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="col-12 mb-3">
                            <label className="form-label">Profile Picture</label>
                            <input 
                              type="file"
                              className="form-control"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-bakery">
                          Save Changes
                        </button>
                      </form>
                    ) : (
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <strong>Username:</strong> {user?.username}
                        </div>
                        <div className="col-md-6 mb-3">
                          <strong>Email:</strong> {user?.email}
                        </div>
                        <div className="col-12 mb-3">
                          <strong>Member Since:</strong> January 2025
                        </div>
                        <div className="col-12">
                          <strong>Account Status:</strong> <span className="badge bg-success">Active</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Order History Tab */}
              {activeTab === 'orders' && (
                <div className="card form-bakery">
                  <div className="card-body">
                    <h5 className="mb-4">Order History</h5>
                    {orderHistory.length === 0 ? (
                      <p className="text-center text-muted">No orders yet</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Date</th>
                              <th>Items</th>
                              <th>Total</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {orderHistory.map(order => (
                              <tr key={order.id}>
                                <td><strong>{order.id}</strong></td>
                                <td>{order.date}</td>
                                <td>{order.items.join(', ')}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>
                                  <span className={getStatusBadge(order.status)}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Shopping Cart Tab */}
              {activeTab === 'cart' && (
                <div className="card form-bakery">
                  <div className="card-body">
                    <h5 className="mb-4">Shopping Cart</h5>
                    {shoppingCart.length === 0 ? (
                      <p className="text-center text-muted">Your cart is empty</p>
                    ) : (
                      <>
                        {shoppingCart.map(item => (
                          <div key={item.id} className="row align-items-center mb-3 p-3 border rounded">
                            <div className="col-md-2">
                              <img 
                                src={item.image} 
                                alt={item.name}
                                className="img-fluid rounded"
                                style={{ height: '60px', objectFit: 'cover' }}
                              />
                            </div>
                            <div className="col-md-4">
                              <h6>{item.name}</h6>
                              <small className="text-muted">${item.price} each</small>
                            </div>
                            <div className="col-md-3">
                              <div className="d-flex align-items-center">
                                <button className="btn btn-outline-secondary btn-sm">-</button>
                                <span className="mx-3">{item.quantity}</span>
                                <button className="btn btn-outline-secondary btn-sm">+</button>
                              </div>
                            </div>
                            <div className="col-md-2">
                              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                            </div>
                            <div className="col-md-1">
                              <button className="btn btn-outline-danger btn-sm">×</button>
                            </div>
                          </div>
                        ))}
                        <hr />
                        <div className="d-flex justify-content-between align-items-center">
                          <h5>Total: ${cartTotal.toFixed(2)}</h5>
                          <button className="btn btn-bakery">Proceed to Checkout</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
