import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, NotFound, Profile, SignupLogin, Search, Anime, SearchFriend, Follow, FriendProfile } from "./pages";
import { AuthContextProvider } from "./context";
import { PrivateRoute } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/login-signup" element={<SignupLogin />} />
            <Route path="/search" element={<Search />} />
            <Route path="/friends" element={<SearchFriend />} />
            <Route path="/Follow/:id" element={<Follow />} />
            <Route path="/friendProfile/:friendId" element={<FriendProfile />} />
            <Route path="/anime/:animeId" element={<Anime />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
