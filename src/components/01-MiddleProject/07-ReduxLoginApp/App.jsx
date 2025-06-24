import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Admin from "./routes/Admin";
import Dashboard from "./routes/Dashboard";
import Login from "./routes/Login";
import User from "./routes/User";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/admin" element={<ProtectedRoute requiredAdmin="admin"><Admin /></ProtectedRoute>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/user" element={<User />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
      {/* Redirect any unknown routes to the dashboard, replace to avoid adding to history*/}
    </Routes>
  );
};

export default App;
