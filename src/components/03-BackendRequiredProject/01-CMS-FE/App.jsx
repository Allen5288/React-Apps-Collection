import React from 'react'
import { Link } from 'react-router-dom'
import { Article, Create, Dashboard } from '@mui/icons-material'
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'
import { CreateArticlePage } from './pages/CreateArticlePage/CreateArticlePage'

const App = () => {
  return (
    <div id="cms-id">
      <div className="cms-header">
        <h1 className="cms-title">
          <Dashboard className="cms-icon" />
          Content Management System
        </h1>
        <div className="cms-nav">
          <Link to="/cms" className="nav-button active">
            <Create style={{ marginRight: '0.5rem', fontSize: '1rem' }} />
            Dashboard
          </Link>
          <Link to="/cms/create" className="nav-button">
            <Create style={{ marginRight: '0.5rem', fontSize: '1rem' }} />
            Create Article
          </Link>
          <Link to="/cms/articles" className="nav-button">
            <Article style={{ marginRight: '0.5rem', fontSize: '1rem' }} />
            All Articles
          </Link>
        </div>
      </div>
      
      <div className="cms-content">
        <div className="create-article-section">
          <div className="section-header">
            <h2>
              <Create className="section-icon" />
              Create New Article
            </h2>
          </div>
          <CreateArticlePage />
        </div>
        
        <div className="articles-section">
          <div className="section-header">
            <h2>
              <Article className="section-icon" />
              Recent Articles
            </h2>
            <span className="articles-count">Latest Posts</span>
          </div>
          <ArticlesPage />
        </div>
      </div>
    </div>
  )
}

export default App
