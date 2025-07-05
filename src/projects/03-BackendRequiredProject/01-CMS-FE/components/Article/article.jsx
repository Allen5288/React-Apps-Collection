import React from "react";
import "./article.scss";

const Article = (props) => {
  const { title, content, comments, status, author, likedBy } = props.data;

  return (
    <div className="cms-article-component">
      <h1 className="cms-article-title">{title}</h1>
      <p className="cms-article-content">{content}</p>
    </div>
  );
};

export default Article;
