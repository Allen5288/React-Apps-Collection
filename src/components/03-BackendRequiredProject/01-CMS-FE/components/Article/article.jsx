import React from "react";
import "./article.scss";

const Article = (props) => {
  const { title, content, comments, status, author, likedBy } = props.data;

  return (
    <div className="article-component">
      <h1 className="article-title">{title}</h1>
      <p className="article-content">{content}</p>
    </div>
  );
};

export default Article;
