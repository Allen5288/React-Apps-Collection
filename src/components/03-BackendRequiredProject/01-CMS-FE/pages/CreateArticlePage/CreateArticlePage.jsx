import React, { useEffect, useState } from "react";
import { createArticle } from "../../api/articles";
import { useNavigate } from "react-router";

export const CreateArticlePage = () => {
  const [articleData, setArticleData] = useState([]);
  const navigate = useNavigate();

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setArticleData({ ...articleData, ...{ [name]: value } });
  };

  const onClick = async () => {
    await createArticle(articleData);
    // navigate("/cms");
  };
  return (
    <form className="create-form">
      <div className="form-group">
        <label htmlFor="title">Article Title</label>
        <input
          id="title"
          type="text"
          value={articleData.title || ''}
          name="title"
          placeholder="Enter article title..."
          onChange={onChangeData}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="content">Article Content</label>
        <textarea
          id="content"
          value={articleData.content || ''}
          name="content"
          placeholder="Write your article content..."
          onChange={onChangeData}
        />
      </div>
      
      <div className="form-actions">
        <button onClick={onClick} type="button" className="btn-primary">
          Publish Article
        </button>
        <button type="button" className="btn-secondary">
          Save Draft
        </button>
      </div>
    </form>
  );
};
