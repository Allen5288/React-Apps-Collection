import React, { useEffect, useState } from "react";
import { deleteArticle, fetchArticles } from "../../api/articles";
import Article from "../../components/Article/article";

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
    <div>
      <h1>Articles</h1>

      {articleData.map((article) => (
        <div key={article._id}>
          <Article data={article} />
          <button type="button" onClick={() => handleDeleteArticle(article._id)}>Delete Article</button>
        </div>
      ))}
    </div>
  );
};

export default ArticlesPage;
