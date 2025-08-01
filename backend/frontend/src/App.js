import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { useAuth } from './component/Context';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ElectroShop from './pages/electroshop';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {

  const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  return token ? children : <Navigate to="/login" />;
};

  // Public Route Component (redirect to electroshop if logged in)
  const PublicRoute = ({ children }) => {
    const { token } = useAuth();
    return !token ? children : <Navigate to="/electroshop" />;
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } 
      />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route 
        path="/forgot-password" 
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        } 
      />
      <Route 
        path="/verify-otp" 
        element={
          <PublicRoute>
            <VerifyOTP />
          </PublicRoute>
        } 
      />
      <Route
        path="/home"
        element={<PrivateRoute><Home /></PrivateRoute>}
      />
      <Route
        path="/electroshop"
        element={<PrivateRoute><ElectroShop /></PrivateRoute>}
      />
      <Route
        path="/bakery-shop"
        element={<PrivateRoute><ElectroShop /></PrivateRoute>}
      />
     
    </Routes>
  );
};

export default App;



