import React from "react";
import Navigation from "./Navigation.tsx";

/**
 * SideBar component renders a sidebar with a fixed height and width.
 * It includes the Navigation component.
 *
 * @returns {JSX.Element} The rendered sidebar component.
 */
const SideBar: React.FC = () => {
  return (
    <div className={` max-h-[100vh] h-[100vh] w-[4rem] bg-gray-50`}>
      <Navigation />
    </div>
  );
};
export default SideBar;
