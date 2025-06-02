import React from "react";
import "./article.scss";

const Article = (props) => {
  const { title, content, comments, status, author, likedBy } = props.data;

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};

export default Article;
