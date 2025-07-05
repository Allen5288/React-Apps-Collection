import { set } from "lodash";
import { use } from "react";
import { createContext, useContext, useState, useReducer } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (username, role) => {
    setUser({ username, role });
  };
  const logout = () => {
    setUser(null);
  };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);