import React, { createContext, useContext, useState, useMemo } from "react";
import { loginUser, logoutUser, updateUserInfo } from "../api/user";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  //login/authenticate
  const authenticate = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      
      const result = await loginUser(data);
      if (!result.data) {
        throw new Error("Login failed, please check your username and password");
      }

      setUserInfo(result.data);
      localStorage.setItem("access_token", result.data.token);
      localStorage.setItem("user_info", JSON.stringify(result.data));
      return result.data;
    } catch (error) {
      console.error('Authentication failed:', error);
      const errorMessage = error.response?.data?.message || "Login failed, please try again";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  //logout
  const logout = async () => {
    try {
      setError("");
      await logoutUser();
      setUserInfo(null);
      localStorage.clear();
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout API fails, we should still clear local state
      setUserInfo(null);
      localStorage.clear();
    }
  };

  //updateUser
  const updateUser = async (user) => {
    try {
      setError("");
      await updateUserInfo(user);
      setUserInfo(user);
      localStorage.setItem("user_info", JSON.stringify(user));
    } catch (error) {
      console.error('Update user failed:', error);
      const errorMessage = error.response?.data?.message || "Failed to update user information";
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const authContextValue = useMemo(() => {
    return {
      userInfo,
      authenticate,
      logout,
      updateUser,
      isAuthLoading: isLoading,
      authError: error,
      clearAuthError: () => setError(""),
    };
  }, [userInfo, isLoading, error]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
