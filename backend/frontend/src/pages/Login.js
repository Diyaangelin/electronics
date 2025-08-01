import React, { useState, useContext } from 'react';
import axios from 'axios';
import { Context } from '../component/Context';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { login } = useContext(Context);
  const [input, setInput] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:7000/api/auth/login', input);
      login(res.data.token);
      navigate('/electroshop');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p className="register-text">
          Don’t have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>
        <p className="forgot-text">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="forgot-link">
            Reset Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

