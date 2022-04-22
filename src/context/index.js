import { createContext, useEffect, useState } from "react";
import { client } from "../client";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);

  const saveToken = (token) => {
    localStorage.setItem("token", `Bearer ${token}`);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  const signup = async (username, email, password) => {
    try {
      const response = await client.post("/auth/signup", {
        username,
        email,
        password,
      });
      document.getElementById("tab-1").checked = true;
    } catch (error) {
      setSignupError(error.response.data.message);
    }
  };

  const loginGoogle = async (firstName, lastName, email, image, googleId) => {
    try {
      const response = await client.post("/auth/google/info", {
        username: `${firstName}${lastName}`,
        firstName,
        lastName,
        email,
        image,
        googleId,
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

  /* const tokenGoogle = (token) => {
    // we save the token to local storage
    saveToken(token);
    navigate("/");
  }; */

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
      setLoginError(error.response.data.message);
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
    loginError,
    signupError,
    signup,
    loginGoogle,
    /* tokenGoogle, */
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
