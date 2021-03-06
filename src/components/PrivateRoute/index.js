import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context";

export function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  } else {
    return <Navigate to="/login-signup" />;
  }
}
