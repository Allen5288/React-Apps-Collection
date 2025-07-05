import React, { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate, Link } from "react-router-dom";
import { ErrorMessage, LoadingSpinner } from "../../components/Feedback/ErrorMessage";
import "./LoginPage.scss";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
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
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const onClickLogin = async () => {
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const result = await authenticate({
        email: data.email,
        password: data.password,
      });
      
      if (result) {
        navigate("/cms/articles");
      } else {
        setError("Login failed, please check your email and password");
      }
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle different types of errors
      if (err.response?.status === 401) {
        setError("Invalid email or password, please try again");
      } else if (err.response?.status === 400) {
        setError("Invalid request format, please check your input");
      } else if (err.response?.status >= 500) {
        setError("Server error, please try again later");
      } else if (err.message === 'Network Error') {
        setError("Network connection failed, please check your connection");
      } else {
        setError(err.response?.data?.message || "Login failed, please try again");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="cms-auth-login-page">
        <LoadingSpinner message="Logging in..." />
      </div>
    );
  }

  return (
    <div className="cms-auth-login-page">
      <ErrorMessage error={error} onClose={() => setError("")} />
      
      <form className="cms-login-form-container">
        <h2>Login to CMS</h2>
        
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
            placeholder="Enter your password"
            value={data.password || ""}
            onChange={onChange}
          />
          {fieldErrors.password && <div className="cms-form-error">{fieldErrors.password}</div>}
        </div>
        
        <button 
          type="button" 
          className="cms-login-submit-btn" 
          onClick={onClickLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        
        <div className="cms-register-link-section">
          Don't have an account? <Link to="/cms/register">Sign up now</Link>
        </div>
      </form>
    </div>
  );
};
