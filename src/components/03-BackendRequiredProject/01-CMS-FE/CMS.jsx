import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './CMS.scss'
import App from './App'
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'
import { CreateArticlePage } from './pages/CreateArticlePage/CreateArticlePage'
import { ArticlePage } from './pages/ArticlePage/ArticlePage'
import { AuthProvider } from './context/AuthProvider'
import { Menu } from './components/Menu/Menu'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { UserMePage } from './pages/UserMePage/UserMePage'
import { RegisterPage } from './pages/RegisterPage/RegisterPage'
// https://bitbucket.org/010001/jr/src/main/24/Tutorial08-CMS-FE/src/
const CMS = () => {
  return (
    <AuthProvider>
      <div className="cms-app-container">
        <Menu />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/user-me" element={<UserMePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/create-articles" element={<CreateArticlePage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default CMS