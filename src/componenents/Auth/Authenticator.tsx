import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";

const Authenticator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = UseFetchToken();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Token from UseFetchToken:", token);

    // if (token === null) return;

    if (!token) {
      console.log("No token found, redirecting...");
      setIsAuthenticated(false);
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 2000);
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

export default React.memo(Authenticator);
