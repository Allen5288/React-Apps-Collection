import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchArticle } from "../../api/articles";
import { ErrorMessage, LoadingSpinner } from "../../components/Feedback/ErrorMessage";
import "./ArticlePage.scss";

export const ArticlePage = () => {
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams(); // Get the article ID from URL parameters
  const navigate = useNavigate();

  const getArticle = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await fetchArticle(id);
      console.log(result);
      setArticleData(result.data);
    } catch (error) {
      console.error('Failed to fetch article:', error);
      setError(error.response?.data?.message || "Failed to fetch article, please try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="cms-single-article-page-container">
        <LoadingSpinner message="Loading article..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="cms-single-article-page-container">
        <button className="cms-back-button" onClick={() => navigate('/cms/articles')}>
          ← Back to Articles
        </button>
        <ErrorMessage 
          error={error} 
          onClose={() => setError("")} 
        />
        <div className="cms-retry-container">
          <button 
            className="cms-btn-primary" 
            onClick={getArticle}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!articleData) {
    return (
      <div className="cms-single-article-page-container">
        <button className="cms-back-button" onClick={() => navigate('/cms/articles')}>
          ← Back to Articles
        </button>
        <div className="cms-no-data-state">
          <h3>Article Not Found</h3>
          <p>This article may have been deleted or does not exist</p>
          <button 
            className="cms-btn-primary" 
            onClick={() => navigate('/cms/articles')}
          >
            Back to Articles List
          </button>
        </div>
      </div>
    );
  }

  const { title, content, author, status } = articleData;

  return (
    <div className="cms-single-article-page-container">
      <button className="cms-back-button" onClick={() => navigate('/cms/articles')}>
        ← Back to Articles
      </button>
      
      <div className="cms-article-detail-card">
        <h1 className="cms-article-title">{title}</h1>
        
        <div className="cms-article-meta">
          <div className="cms-meta-item">
            Author: <span>{author || 'Anonymous'}</span>
          </div>
          <div className="cms-meta-item">
            Status: <span>{status || 'Published'}</span>
          </div>
        </div>
        
        <div className="cms-article-content">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
};
