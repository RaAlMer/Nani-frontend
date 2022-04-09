import styles from "./Navbar.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context";

export function Navbar() {
    const {logout, user} = useContext(AuthContext);
    return (
        <nav>
            {user && <Link to="/">Home</Link>}
            {!user && <Link to="/login-signup">Login/Signup</Link>}
            {user && <button onClick={logout}>Logout</button>}
        </nav>
    )
}