import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FriendList from "../FriendList.tsx";

export const FriendComponentContext = React.createContext<{
  toggleOnOutlet: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const Friends = () => {
  const [isOutLet, SetisOutLet] = useState<boolean>(false);

  return (
    <FriendComponentContext.Provider value={{ toggleOnOutlet: SetisOutLet }}>
      <div className={`w-full`}>{isOutLet ? <Outlet /> : <FriendList />}</div>
    </FriendComponentContext.Provider>
  );
};
export default React.memo(Friends);
