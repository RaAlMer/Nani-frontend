import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Component so that when the app changes route, it scrolls the new page to the top (React Router Dom)
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}