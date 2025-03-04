import React from "react";
import NavigationIcons from "./NavigationIcons.tsx";
import { FaRegCommentDots } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

/**
 * Navigation component renders a vertical navigation bar with a header and navigation icons.
 *
 * @returns {JSX.Element} The rendered navigation bar component.
 */
const Navigation: React.FC = () => {
  const navigate = useNavigate();
  return (
    <nav className={`flex bg-inherit h-[100vh] flex-col w-full items-center`}>
      <div className={`w-full bg-green-600 p-5 text-4xl text-white text-center`}>
        <FaRegCommentDots onClick={() => navigate("/dashboard")} />
      </div>

      <NavigationIcons />
    </nav>
  );
};
export default Navigation;
