import React from "react";

const Authenticator: React.FC<{ token: string | null; children: React.ReactNode }> = function ({
  token,
  children,
}) {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    setIsAuthenticated(true);
  }, [token]);

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <h1 className={`text-red-500 text-center animate-pulse m-auto text-4xl`}>
          Not Authenticated, Login or register
        </h1>
      )}
    </>
  );
};
export default Authenticator;
