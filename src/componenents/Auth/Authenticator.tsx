import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFetchToken } from "../hooks/UseFetchToken";

/**
 * Authenticator component that checks if the user is authenticated based on the provided token.
 * If the user is not authenticated, it redirects to the login page.
 *
 * @param {Object} props - The props object.
 * @param {string | null} props.token - The authentication token. If null, the user is not authenticated.
 * @param {React.ReactNode} props.children - The child components to render if the user is authenticated.
 *
 * @returns {JSX.Element} The rendered component.
 */
const Authenticator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = UseFetchToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      navigate("/login", { replace: true });
    } else {
      setIsAuthenticated(true);
    }
  }, [token, navigate]);

  if (!isAuthenticated) {
    return (
      <h1 className="text-red-500 text-center animate-pulse m-auto text-4xl">
        Not Authenticated, Redirecting...
      </h1>
    );
  }

  return <>{children}</>;
};

export default Authenticator;
