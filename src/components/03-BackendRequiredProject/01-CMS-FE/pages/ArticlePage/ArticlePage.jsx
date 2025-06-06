import React, { useState, useEffect } from "react";
import { fetchArticle } from "../../api/articles";

export const ArticlePage = () => {
  const [articleData, setArticleData] = useState(null);
  const id = "67adc2e6926b7885f86749b7";
  const getArticle = async () => {
    const result = await fetchArticle(id);
    console.log(result);
    setArticleData(result.data);
  };

  useEffect(() => {
    getArticle();
  }, []);

  if (!articleData) {
    return <>No Data...</>;
  }

  const { title, content } = articleData;

  return (
    <div>
      <h1>{title}</h1>
      <p>{content}</p>
    </div>
  );
};
