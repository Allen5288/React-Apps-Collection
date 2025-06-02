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
    <form>
      <input
        type="text"
        value={articleData.title}
        name="title"
        onChange={onChangeData}
      />
      <input
        type="text"
        value={articleData.content}
        name="content"
        onChange={onChangeData}
      />
      <button onClick={onClick} type="button">
        Submit
      </button>
    </form>
  );
};
