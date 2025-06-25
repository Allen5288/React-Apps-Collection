// router.post("/register", authController.register);
// router.post("/login", authController.login);
// router.get("/user/me", authController.showMe);

// router.post('/upload', imageUploadController.uploadImage);

import api from './axios';

export const getUserMe = (userId) => {
  // If userId is provided, use it; otherwise get from localStorage
  if (!userId) {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      userId = userData._id || userData.id;
    }
  }
  
  if (!userId) {
    throw new Error('User ID is required to fetch user information');
  }
  
  return api.get(`/user/me/${userId}`);
}

export const updateUserInfo = (data) => {
  return api.put('/user/me', data);
}
export const register = (data) => {
  return api.post('/register', data);
}
export const loginUser = (data) => {
  return api.post('/login', data);
}

export const logoutUser = () => {
  return api.post('/logout');
}