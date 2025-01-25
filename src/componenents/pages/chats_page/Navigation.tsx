import React from "react";
import NavigationIcons from "./NavigationIcons.tsx";
import { FaRegCommentDots } from "react-icons/fa6";

/**
 * Navigation component renders a vertical navigation bar with a header and navigation icons.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Navigation: React.FC = () => {
  return (
    <nav className={`flex bg-inherit h-[100vh] flex-col w-full items-center`}>
      <div className={`w-full bg-green-600 p-5 text-4xl text-white text-center`}>
        <FaRegCommentDots />
      </div>

      <NavigationIcons />
    </nav>
  );
};
export default Navigation;
