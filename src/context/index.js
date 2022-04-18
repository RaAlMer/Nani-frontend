import { createContext, useEffect, useState } from "react";
import { client } from "../client";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const saveToken = (token) => {
    localStorage.setItem("token", `Bearer ${token}`);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  const signup = async (username, email, password) => {
    const response = await client.post("/auth/signup", {
      username,
      email,
      password,
    });
  };

  const loginGoogle = async (firstName, lastName, email, image, googleId) => {
    try {
      const response = await client.post("/auth/google/info", {
        firstName,
        lastName,
        email,
        image,
        googleId,
      });
      // setting the user if it already existed in the database
      if (response.data.user) {
        setUser(response.data.user);
      } else { 
        // setting the user if it did NOT existed in the database
        setUser(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const tokenGoogle = (token) => {
    // we save the token to local storage
    saveToken(token);
    navigate("/");
  };

  const login = async (email, password) => {
    try {
      const response = await client.post("/auth/login", {
        email,
        password,
      });
      // we save the token to local storage
      saveToken(response.data.token);
      // setting the user
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const verify = async () => {
    try {
      const response = await client.get("/auth/verify");
      setUser(response.data.user);
      navigate("/");
    } catch (error) {
      navigate("/login-signup");
    }
  };

  const logout = () => {
    deleteToken();
    setUser(null);
    navigate("/login-signup");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verify();
    }
  }, []);

  const value = {
    user,
    signup,
    loginGoogle,
    tokenGoogle,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
