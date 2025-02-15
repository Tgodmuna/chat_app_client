import React, { useState } from "react";
import { FaSignOutAlt, FaUserMd } from "react-icons/fa";
import { FaGears, FaRegHeart, FaRegMessage, FaUserPen } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

/**
 * NavigationIcons component renders a vertical navigation bar with icons.
 * Each icon can be clicked to set it as the active icon, which changes its appearance.
 *
 * @component
 * @example
 * return (
 *   <NavigationIcons />
 * )
 *
 * @returns {JSX.Element} A JSX element containing the navigation icons.
 *
 * @remarks
 * The component uses FontAwesome icons and Tailwind CSS for styling.
 * The active icon is highlighted with a green color and a scaling effect.
 *
 * @function
 * @name NavigationIcons
 */
const NavigationIcons: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string>("");

  const handleIconClick = (iconName: string) => {
    setActiveIcon(iconName);
  };
  let navigate = useNavigate();

  return (
    <div className="flex flex-col size-full justify-between text-neutral-700">
      {/* first child */}
      <div
        className={`flex flex-col items-center justify-between p-2 w-full text-2xl gap-3 h-[10rem] bg-green-200 rounded-xl`}>
        <FaRegMessage
          title={"message"}
          className={`hover:text-green-500 transition-colors duration-300 ${
            activeIcon === "message" ? "text-green-500 scale-125 transition-all duration-200" : ""
          }`}
          onClick={() => {
            navigate("/dashboard/chats");
            handleIconClick("message");
          }}
        />
        <FaUserMd
          title={"friends"}
          className={`hover:text-green-500 transition-colors duration-300 ${
            activeIcon === "userMd" ? " text-green-500 scale-125 transition-all duration-200" : ""
          }`}
          onClick={() => {
            navigate("/dashboard/friends");
            handleIconClick("userMd");
          }}
        />
        <FaRegHeart
          title={"favorites"}
          className={`hover:text-green-500 transition-colors duration-300 ${
            activeIcon === "heart" ? " text-green-500 scale-125 transition-all duration-200 " : ""
          }`}
          onClick={() => {
            handleIconClick("heart");
            navigate("/dashboard/favorites");
          }}
        />
      </div>

      {/* second child */}
      <div
        className={`flex items-center w-full text-2xl justify-between flex-col h-[15rem] bg-green-200 p-3 rounded-xl`}>
        <FaUserPen
          title={"edit profile"}
          className={`hover:text-green-500 transition-colors duration-300 ${
            activeIcon === "userPen" ? "text-green-500  scale-125 transition-all duration-200 " : ""
          }`}
          onClick={() => handleIconClick("userPen")}
        />
        <FaGears
          title={"settings"}
          className={`hover:text-green-500 transition-colors duration-300 ${
            activeIcon === "gears" ? "text-green-500  scale-125 transition-all duration-200" : ""
          }`}
          onClick={() => handleIconClick("gears")}
        />
        <FaSignOutAlt
          title={"log out"}
          className={`hover:text-green-500 transition-colors duration-300 ${
            activeIcon === "signOut" ? "text-green-500 scale-125 transition-all duration-200" : ""
          }`}
          onClick={() => handleIconClick("signOut")}
        />
      </div>
    </div>
  );
};

export default NavigationIcons;
