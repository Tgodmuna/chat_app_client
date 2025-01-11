import React from "react";
import SideBar from "./SideBar.tsx";
import ChatBG from "./ChatBackground.tsx";

const Layout = () => {
  return (
    <div className={`flex w-full max-w-full h-[100vw]`}>
      <SideBar />

      <ChatBG />
    </div>
  );
};
export default Layout;
