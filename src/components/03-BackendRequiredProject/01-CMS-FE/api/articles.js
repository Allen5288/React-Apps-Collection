import axios from 'axios';

/**
 * Article Schema
const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    index: true,
  },
  content: {
    type: String,
  },
  comments: [
    {
      type: String,
    },
  ],
  status: { type: String },
  author: { type: String },
  likeBy: [{ type: String }],
}
 */

export const fetchArticles = () => {
    return axios.get("http://localhost:5000/api/v1/articles")
};

export const deleteArticle = (id) => {
    return axios.delete(`http://localhost:5000/api/v1/articles/${id}`)
};

export const createArticle = (data) => {
    return axios.post("http://localhost:5000/api/v1/articles", data)
}

