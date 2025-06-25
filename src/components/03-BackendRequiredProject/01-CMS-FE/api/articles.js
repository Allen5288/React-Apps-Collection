import api from './axios';

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

// router.get('/articles', articleController.index);
// router.post('/articles', articleController.store);
// router.put('/articles/:id', articleController.update);
// router.get('/articles/:id', articleController.show);
// router.delete('/articles/:id', articleController.destroy);
// router.post("/register", authController.register);
// router.post("/login", authController.login);
// router.get("/user/me", authController.showMe);

// router.post('/upload', imageUploadController.uploadImage);

export const fetchArticles = () => {
    return api.get("/articles")
};

export const fetchArticle = (id) => {
    return api.get(`/articles/${id}`) 
};

export const deleteArticle = (id) => {
    return api.delete(`/articles/${id}`)
};

export const createArticle = (data) => {
    return api.post("/articles", data)
}





