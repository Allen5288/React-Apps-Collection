import React from 'react'
import './CMS.scss'
import { Article, Create, Dashboard } from '@mui/icons-material'
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'
import { CreateArticlePage } from './pages/CreateArticlePage/CreateArticlePage'

const CMS = () => {
  return (
    <div id="cms-id">
      <div className="cms-header">
        <h1 className="cms-title">
          <Dashboard className="cms-icon" />
          Content Management System
        </h1>
        <div className="cms-nav">
          <button className="nav-button active">
            <Create style={{ marginRight: '0.5rem', fontSize: '1rem' }} />
            Dashboard
          </button>
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

export default CMS