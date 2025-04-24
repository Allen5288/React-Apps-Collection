import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./AppHeader.css"; // 引入Header的CSS

function AppHeader() {
  const location = useLocation();

  return (
    <header className="app-header">
      <div className="app-header-content">
        {/* 如果不是主页，就显示返回按钮 */}
        {location.pathname !== "/" && (
          <Link to="/" className="back-button">
            ← Back
          </Link>
        )}
        <h1>Allen's Test Space</h1>
        <nav className="app-nav">
          <Link to="/scssDemo" className="nav-link">SCSS Demo</Link>
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
