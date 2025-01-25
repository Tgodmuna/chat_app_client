import { useEffect, useState } from "react";

export const UseFetchToken = () => {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    try {
      const Token = sessionStorage.getItem("token");

      if (!Token) {
        throw new Error("FROM: UseFetchToken - no Token found");
      }

      setToken(Token);
    } catch (exc) {
      console.log(exc);
    }
  }, []); 

  return token;
};
