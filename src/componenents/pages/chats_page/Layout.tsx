import React, { useState } from "react";
import SideBar from "./SideBar.tsx";
import ChatBG from "./ChatBackground.tsx";
import Chats from "./Chats.tsx";
import type { LayoutContextType } from "../../../types.tsx";

export const LayoutContext = React.createContext<null | LayoutContextType>(null);
const Layout = () => {
  const [showChats, setShowChats] = useState<boolean>(false);

  // layout context
  return (
    <LayoutContext.Provider value={{ showChats, setShowChats }}>
      <div className={`flex w-full overflow max-w-full h-[100vw]`}>
        <SideBar />
        <ChatBG />
        {/* other pages */}
        <Chats />
      </div>
    </LayoutContext.Provider>
  );
};
export default Layout;
