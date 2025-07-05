import React, { useState } from "react";
import { createArticle } from "../../api/articles";
import { useNavigate } from "react-router";
import { ErrorMessage, SuccessMessage, LoadingSpinner } from "../../components/Feedback/ErrorMessage";
import "./CreateArticlePage.scss";

export const CreateArticlePage = () => {
  const [articleData, setArticleData] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, [name]: value });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!articleData.title || !articleData.title.trim()) {
      setError("Article title cannot be empty");
      return false;
    }
    if (!articleData.content || !articleData.content.trim()) {
      setError("Article content cannot be empty");
      return false;
    }
    if (articleData.title.trim().length < 3) {
      setError("Article title must be at least 3 characters long");
      return false;
    }
    if (articleData.content.trim().length < 10) {
      setError("Article content must be at least 10 characters long");
      return false;
    }
    return true;
  };

  const onClick = async () => {
    setError("");
    setSuccess("");
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await createArticle({
        title: articleData.title.trim(),
        content: articleData.content.trim()
      });
      setSuccess("Article created successfully! Redirecting to articles list...");
      setArticleData({}); // Reset the form data after submission
      
      // Navigate after a short delay to show success message
      setTimeout(() => {
        navigate("/cms/articles");
      }, 2000);
    } catch (error) {
      console.error('Failed to create article:', error);
      setError(error.response?.data?.message || "Failed to create article, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cms-create-article-page-container">
      <ErrorMessage error={error} onClose={() => setError("")} />
      <SuccessMessage message={success} onClose={() => setSuccess("")} />
      
      {loading && <LoadingSpinner message="Creating article..." />}
      
      <form className="cms-create-article-form">
        <h2 className="cms-form-title">Create New Article</h2>
        
        <div className="cms-form-group">
          <label htmlFor="title">Article Title</label>
          <input
            id="title"
            type="text"
            value={articleData.title || ''}
            name="title"
            placeholder="Enter article title..."
            onChange={onChangeData}
            disabled={loading}
          />
        </div>
        
        <div className="cms-form-group">
          <label htmlFor="content">Article Content</label>
          <textarea
            id="content"
            value={articleData.content || ''}
            name="content"
            placeholder="Write your article content..."
            onChange={onChangeData}
            disabled={loading}
          />
        </div>
        
        <div className="cms-form-actions">
          <button 
            onClick={onClick} 
            type="button" 
            className="cms-btn-primary"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Article"}
          </button>
          <button 
            type="button" 
            className="cms-btn-secondary"
            onClick={() => navigate("/cms/articles")}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
