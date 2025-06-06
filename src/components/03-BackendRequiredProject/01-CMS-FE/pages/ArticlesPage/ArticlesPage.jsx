import React, { useEffect, useState } from "react";
import { deleteArticle, fetchArticles } from "../../api/articles";
import { Article } from "@mui/icons-material";

const ArticlesPage = () => {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        const result = await fetchArticles();
        console.log('Fetched articles:', result.data);
        setArticleData(result.data);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    };
    getArticles();
  }, []);

  const handleDeleteArticle = async (id) => {
    try {
      const result = await deleteArticle(id);
      getArticles(); // Refresh the article list after deletion 
    } catch (error) {
      console.error('Failed to delete article:', error);
    }
  };
  return (
    <div className="articles-list">
      {articleData.length === 0 ? (
        <div className="no-articles">
          <Article className="no-articles-icon" />
          <div className="no-articles-text">No articles yet</div>
          <div className="no-articles-subtext">Create your first article to get started</div>
        </div>
      ) : (
        articleData.map((article) => (
          <div key={article._id} className="article-item">
            <div className="article-header">
              <h3 className="article-title">{article.title}</h3>
              <div className="article-actions">
                <button type="button" className="btn-edit">
                  Edit
                </button>
                <button type="button" className="btn-delete" onClick={() => handleDeleteArticle(article._id)}>
                  Delete
                </button>
              </div>
            </div>
            <div className="article-content">
              {article.content}
            </div>
            <div className="article-meta">
              <div className="meta-item">
                <span>By {article.author || 'Anonymous'}</span>
              </div>
              <div className="meta-item">
                <span>Status: {article.status || 'Published'}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ArticlesPage;
