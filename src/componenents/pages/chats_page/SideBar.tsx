import React from "react";
import Navigation from "./Navigation.tsx";

/**
 * SideBar component renders a sidebar with a fixed height and width.
 * It includes the Navigation component.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
const SideBar: React.FC = (): JSX.Element => {
  return (
    <div className={`h-[100vh]  w-[4rem] bg-gray-50`}>
      <Navigation />
    </div>
  );
};
export default SideBar;
