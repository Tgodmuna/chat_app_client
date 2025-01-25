import React, { useState } from "react";
import SideBar from "./SideBar.tsx";
import ChatBG from "./ChatBackground.tsx";
import Chats from "./Chats.tsx";
import type { LayoutContextType } from "../../../types.tsx";
import FriendList from "../../user/FriendList.tsx";

export const LayoutContext = React.createContext<null | LayoutContextType>(null);
const Layout = () => {
  const [showChats, setShowChats] = useState<boolean>(false);
  const [showFriends, setShowFriends] = useState<boolean>(false);

  return (
    <LayoutContext.Provider value={{ showChats, setShowChats, showFriends, setShowFriends }}>
      <div className={`flex w-full overflow max-w-full h-[100vw]`}>
        <SideBar />
        <ChatBG />

        {/* other pages */}
        <Chats />
        <FriendList />
      </div>
    </LayoutContext.Provider>
  );
};
export default Layout;
