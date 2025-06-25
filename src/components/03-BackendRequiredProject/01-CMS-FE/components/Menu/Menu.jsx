import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router";
import { ErrorMessage } from "../Feedback/ErrorMessage";
import "./Menu.scss";

export const Menu = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const onClickLogout = async () => {
    try {
      setError("");
      setIsLoggingOut(true);
      await logout();
      navigate("/cms");
    } catch (error) {
      console.error('Logout failed:', error);
      setError("Logout failed, please try again");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {error && <ErrorMessage error={error} onClose={() => setError("")} />}
      <nav className="cms-top-navigation-menu">
        <div className="cms-menu-container">
          <Link to="/cms" className="cms-menu-logo">
            CMS Dashboard
          </Link>
          <div className="cms-menu-navigation">
            <Link to="/cms/articles" className="cms-menu-nav-link">
              Articles
            </Link>
            <Link to="/cms/create-articles" className="cms-menu-nav-link">
              Create Article
            </Link>
            <Link to="/cms/user-me" className="cms-menu-nav-link">
              Profile
            </Link>
            <button 
              onClick={onClickLogout} 
              className="cms-logout-action-btn"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};
