import { createContext, useEffect, useState } from "react";
import { client } from "../client";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [signupError, setSignupError] = useState(null);
  const [sentMail, setSentMail] = useState(null);

  const saveToken = (token) => {
    localStorage.setItem("token", `Bearer ${token}`);
  };

  const deleteToken = () => {
    localStorage.removeItem("token");
  };

  const getUser = async () => {
    const item = await client.get("/auth/profile");
    const result = item.data;
    setUser(result);
  };

  const sendEmail = async (email, url) => {
    const result = await client.post("/email", {
      email,
      url,
    });
    // Message confirming mail sent
    setSentMail(result.data.msg);
  };

  const signup = async (username, email, password, confirmPassword, url) => {
    try {
      const response = await client.post("/auth/signup", {
        username,
        email,
        password,
        confirmPassword,
      });
      document.getElementById("tab-1").checked = true;
      sendEmail(email, url);
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
      if (response.status === 200) {
        getUser();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* const tokenGoogle = (token) => {
    // we save the token to local storage
    saveToken(token);
    navigate("/");
  }; */

  const login = async (email, password, captchaToken) => {
    try {
      const response = await client.post("/auth/login", {
        email,
        password,
        captchaToken,
      });
      // we save the token to local storage
      saveToken(response.data.token);
      // setting the user
      if (response.status === 200) {
        getUser();
        navigate("/");
      }
    } catch (error) {
      setLoginError(error.response.data.message);
    }
  };

  const resetEmail = async (email, url) => {
    const result = await client.post("/email/reset", {
      email,
      url,
    });
    // Message confirming mail sent
    setSentMail(result.data.msg);
  };

  const resetPass = async (password, confirmPassword, id, token) => {
    const result = await client.post(`/email/${id}/${token}`, {
      password,
      confirmPassword,
    });
    console.log(result)
    if (result.status === 200) {
      // Message confirming password changed
      setSentMail(result.data.msg);
      navigate("/login-signup");
    }
  };

  const verify = async () => {
    try {
      const response = await client.get("/auth/verify");
      if (response.status === 200) {
        getUser();
        navigate("/");
      }
    } catch (error) {
      navigate("/login-signup");
    }
  };

  const verifyEmail = async (id) => {
    try {
      const response = await client.get(`/email/confirm/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
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
    getUser,
    setUser,
    loginError,
    signupError,
    sendEmail,
    sentMail,
    verifyEmail,
    signup,
    loginGoogle,
    /* tokenGoogle, */
    login,
    logout,
    resetEmail,
    resetPass,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
