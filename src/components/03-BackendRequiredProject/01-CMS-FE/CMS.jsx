import React from 'react'
import './CMS.scss'
import { Article, Create } from '@mui/icons-material'
import ArticlesPage from './pages/ArticlesPage/ArticlesPage'
import { CreateArticlePage } from './pages/CreateArticlePage/CreateArticlePage'

const CMS = () => {
  return (
    <div id="cms-id">
      <CreateArticlePage />
      <ArticlesPage />
    </div>
  )
}

export default CMS