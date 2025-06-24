import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './CMS.scss'
import App from './App'
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'
import { CreateArticlePage } from './pages/CreateArticlePage/CreateArticlePage'

const CMS = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/create" element={<CreateArticlePage />} />
    </Routes>
  )
}

export default CMS