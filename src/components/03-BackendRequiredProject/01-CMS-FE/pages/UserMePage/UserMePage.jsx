import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserInfo, getUserMe } from "../../api/user";
import { ErrorMessage, SuccessMessage, LoadingSpinner } from "../../components/Feedback/ErrorMessage";
import "./UserMePage.scss";

export const UserMePage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setInitialLoading(true);
        const result = await getUserMe();
        if (result.data) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (error.response?.status === 401) {
          // Token expired or invalid, redirect to login
          navigate("/");
          return;
        }
        if (error.message === 'User ID is required to fetch user information') {
          // No user info in localStorage, redirect to login
          navigate("/");
          return;
        }
        setError("Failed to fetch user information, please refresh the page and try again");
      } finally {
        setInitialLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  const validateForm = () => {
    if (!data.userName || !data.userName.trim()) {
      setError("Username cannot be empty");
      return false;
    }
    if (data.userName.trim().length < 2) {
      setError("Username must be at least 2 characters long");
      return false;
    }
    return true;
  };

  const onClickUpdate = async () => {
    setError("");
    setSuccess("");
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await updateUserInfo({
        email: data.email,
        userName: data.userName.trim(),
      });
      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error('Failed to update profile:', error);
      if (error.response?.status === 401) {
        // Token expired or invalid, redirect to login
        navigate("/");
        return;
      }
      setError(error.response?.data?.message || "Failed to update profile, please try again");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="cms-user-profile-page-container">
        <LoadingSpinner message="Loading user information..." />
      </div>
    );
  }

  return (
    <div className="cms-user-profile-page-container">
      <ErrorMessage error={error} onClose={() => setError("")} />
      <SuccessMessage message={success} onClose={() => setSuccess("")} />
      
      {loading && <LoadingSpinner message="Updating profile..." />}
      
      <form className="cms-user-profile-form">
        <h2 className="cms-profile-title">My Profile</h2>
        
        <div className="cms-profile-info">
          <p className="cms-info-text">
            Update your profile information below. Your email address cannot be changed.
          </p>
        </div>

        <div className="cms-form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            value={data.email || ''}
            disabled
            placeholder="your@email.com"
          />
        </div>

        <div className="cms-form-group">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={data.userName || ''}
            onChange={onChange}
            placeholder="Enter your username"
            disabled={loading}
          />
        </div>

        <div className="cms-form-actions">
          <button 
            type="button" 
            className="cms-update-profile-btn" 
            onClick={onClickUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};
