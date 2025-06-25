import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../api/user";
import { ErrorMessage, SuccessMessage, LoadingSpinner } from "../../components/Feedback/ErrorMessage";
import "./RegisterPage.scss";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Clear field error when user starts typing
    if (fieldErrors[e.target.name]) {
      setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!data.username) {
      errors.username = "Please enter username";
    } else if (data.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }
    
    if (!data.email) {
      errors.email = "Please enter email address";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (!data.password) {
      errors.password = "Please enter password";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    
    if (!data.confirmPassword) {
      errors.confirmPassword = "Please confirm password";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onClickRegister = async () => {
    setError("");
    setSuccess("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const result = await register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      
      if (result) {
        setSuccess("Registration successful! Redirecting to login page in 3 seconds...");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle different types of errors
      if (err.response?.status === 409) {
        setError("This email is already registered, please use a different email");
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || "Invalid request format, please check your input");
      } else if (err.response?.status >= 500) {
        setError("Server error, please try again later");
      } else if (err.message === 'Network Error') {
        setError("Network connection failed, please check your connection");
      } else {
        setError(err.response?.data?.message || "Registration failed, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="cms-auth-register-page">
        <LoadingSpinner message="Registering..." />
      </div>
    );
  }

  return (
    <div className="cms-auth-register-page">
      <ErrorMessage error={error} onClose={() => setError("")} />
      <SuccessMessage message={success} onClose={() => setSuccess("")} />
      
      <form className="cms-register-form-container">
        <h2>Create New Account</h2>
        
        <div className="cms-form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username"
            name="username" 
            className={`cms-form-input ${fieldErrors.username ? 'cms-form-input-error' : ''}`}
            placeholder="Enter your username"
            value={data.username || ""}
            onChange={onChange} 
          />
          {fieldErrors.username && <div className="cms-form-error">{fieldErrors.username}</div>}
        </div>
        
        <div className="cms-form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            className={`cms-form-input ${fieldErrors.email ? 'cms-form-input-error' : ''}`}
            placeholder="Enter your email address"
            value={data.email || ""}
            onChange={onChange} 
          />
          {fieldErrors.email && <div className="cms-form-error">{fieldErrors.email}</div>}
        </div>
        
        <div className="cms-form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`cms-form-input ${fieldErrors.password ? 'cms-form-input-error' : ''}`}
            placeholder="Create password (at least 6 characters)"
            value={data.password || ""}
            onChange={onChange}
          />
          {fieldErrors.password && <div className="cms-form-error">{fieldErrors.password}</div>}
        </div>
        
        <div className="cms-form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`cms-form-input ${fieldErrors.confirmPassword ? 'cms-form-input-error' : ''}`}
            placeholder="Enter password again"
            value={data.confirmPassword || ""}
            onChange={onChange}
          />
          {fieldErrors.confirmPassword && <div className="cms-form-error">{fieldErrors.confirmPassword}</div>}
        </div>
        
        <button 
          type="button" 
          className="cms-register-submit-btn" 
          onClick={onClickRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        
        <div className="cms-login-link-section">
          Already have an account? <Link to="/cms">Login now</Link>
        </div>
      </form>
    </div>
  );
};
