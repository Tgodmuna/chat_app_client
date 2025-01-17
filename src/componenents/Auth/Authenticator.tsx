import React from "react";

const Authenticator: React.FC<{ token: string; children: React.ReactNode }> = function ({
  token,
  children,
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <>
      {isAuthenticated ? children : <h1 className={`text-red-500 text-4xl`}>Not Authenticated</h1>}
    </>
  );
};
export default Authenticator;
