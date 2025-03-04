import { useEffect, useState } from "react";

export const UseFetchToken = () => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      const storedToken = sessionStorage.getItem("token");

      if (storedToken !== token) setToken(storedToken);
      return;
    };

    // Poll every 2 seconds to detect changes
    const interval = setInterval(checkToken, 2000);

    return () => clearInterval(interval);
  }, [token]);

  return token;
};
