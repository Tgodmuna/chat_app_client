import React from "react";
import SideBar from "./SideBar.tsx";
import ChatBG from "./ChatBackground.tsx";
import type { LayoutContextType } from "../../../types.tsx";
import { Outlet } from "react-router-dom";

export const LayoutContext = React.createContext<null | LayoutContextType>(null);
const Layout = () => {
  return (
    <LayoutContext.Provider value={{}}>
      <div className={` parent flex w-[100vw] md:w-full `}>
        <SideBar />
        <ChatBG />

        <Outlet />
      </div>
    </LayoutContext.Provider>
  );
};
export default Layout;
