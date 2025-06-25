import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteArticle, fetchArticles } from "../../api/articles";
import { Article } from "@mui/icons-material";
import { ErrorMessage, SuccessMessage, LoadingSpinner } from "../../components/Feedback/ErrorMessage";
import "./ArticlesPage.scss";

const ArticlesPage = () => {
  const [articleData, setArticleData] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState({});

  const getArticles = async () => {
    setLoading(true);
    setError("");
    
    try {
      const result = await fetchArticles();
      console.log('Fetched articles:', result.data);
      setArticleData(result.data || []);
    } catch (err) {
      console.error('Failed to fetch articles:', err);
      
      if (err.response?.status === 401) {
        setError("Login expired, please login again");
      } else if (err.response?.status === 403) {
        setError("No permission to access articles list");
      } else if (err.response?.status >= 500) {
        setError("Server error, unable to load articles list");
      } else if (err.message === 'Network Error') {
        setError("Network connection failed, please check your connection");
      } else {
        setError(err.response?.data?.message || "Failed to load articles list");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article? This action cannot be undone.")) {
      return;
    }

    setDeleteLoading({ ...deleteLoading, [id]: true });
    setError("");
    
    try {
      await deleteArticle(id);
      setSuccess("Article deleted successfully");
      
      // Remove the deleted article from the list
      setArticleData(articleData.filter(article => article._id !== id));
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      console.error('Failed to delete article:', err);
      
      if (err.response?.status === 401) {
        setError("Login expired, please login again");
      } else if (err.response?.status === 403) {
        setError("No permission to delete this article");
      } else if (err.response?.status === 404) {
        setError("Article not found or already deleted");
      } else if (err.response?.status >= 500) {
        setError("Server error, deletion failed");
      } else if (err.message === 'Network Error') {
        setError("Network connection failed, please check your connection");
      } else {
        setError(err.response?.data?.message || "Failed to delete article");
      }
    } finally {
      setDeleteLoading({ ...deleteLoading, [id]: false });
    }
  };

  if (loading) {
    return (
      <div className="cms-articles-page-container">
        <LoadingSpinner message="Loading articles..." />
      </div>
    );
  }

  return (
    <div className="cms-articles-page-container">
      <ErrorMessage error={error} onClose={() => setError("")} />
      <SuccessMessage message={success} onClose={() => setSuccess("")} />
      
      <div className="cms-articles-list">
        {articleData.length === 0 ? (
          <div className="cms-no-articles-state">
            <Article className="cms-no-articles-icon" />
            <div className="cms-no-articles-text">No Articles Yet</div>
            <div className="cms-no-articles-subtext">
              <Link to="/cms/create-articles">Create your first article</Link>
            </div>
          </div>
        ) : (
          articleData.map((article) => (
            <div key={article._id} className="cms-article-card">
              <div className="cms-article-header">
                <Link to={`/cms/articles/${article._id}`} style={{ textDecoration: 'none' }}>
                  <h3 className="cms-article-title">{article.title}</h3>
                </Link>
                <div className="cms-article-actions">
                  <Link to={`/cms/edit-articles/${article._id}`}>
                    <button type="button" className="cms-btn-edit">
                      Edit
                    </button>
                  </Link>
                  <button 
                    type="button" 
                    className="cms-btn-delete" 
                    onClick={() => handleDeleteArticle(article._id)}
                    disabled={deleteLoading[article._id]}
                  >
                    {deleteLoading[article._id] ? "删除中..." : "删除"}
                  </button>
                </div>
              </div>
              <div className="cms-article-content">
                {article.content?.substring(0, 200)}
                {article.content?.length > 200 && "..."}
              </div>
              <div className="cms-article-meta">
                <div className="cms-meta-item">
                  <span>作者: {article.author || '匿名'}</span>
                </div>
                <div className="cms-meta-item">
                  <span>状态: {article.status || '已发布'}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArticlesPage;
