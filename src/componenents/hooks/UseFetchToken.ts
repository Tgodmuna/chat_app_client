import { useEffect, useState } from "react";

export const UseFetchToken = () => {
  const [token, setToken] = useState<null | string>(null);

  useEffect(() => {
    try {
      const Token = sessionStorage.getItem("token");

      if ( !Token ) return;   

      setToken(Token);
    } catch (exc) {
      console.log(exc);
    }
  }, []); 

  return token;
};
