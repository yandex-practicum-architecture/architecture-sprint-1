import React from 'react';
import Login from './components/Login';
import Register from './components/Register';
import InfoTooltip from './components/InfoTooltip';
import ProtectedRoute from './components/ProtectedRoute';

function AuthApp() {
  return (
    <div>
      {/* Здесь можно настроить маршрутизацию, если это необходимо */}
      <Login />
      <Register />
      <InfoTooltip />
      <ProtectedRoute />
    </div>
  );
}

export default AuthApp;
