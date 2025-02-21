import React, { useState, useEffect, useRef } from "react";
import { FaVideo, FaPhone } from "react-icons/fa6";
import { CgMoreVertical } from "react-icons/cg";

type HeaderProps = {
  recieverInfo: {
    profilePicture: string;
    username: string;
    isOnline: boolean;
    lastSeen: string;
  };
};

const MessageHeader: React.FC<HeaderProps> = ({ recieverInfo }) => {
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  console.log(recieverInfo);

  const togglePopover = () => {
    setShowPopover(!showPopover);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    if (showPopover) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopover]);

  return (
    <header className="flex justify-between items-center p-4 border-b relative">
      <div className="flex items-center gap-4">
        <img
          src={recieverInfo?.profilePicture || "default.png"}
          alt={recieverInfo?.username}
          className="rounded-full w-10 h-10"
        />
        <div>
          <p className="font-bold text-lg">{recieverInfo.username}</p>
          <p className="text-sm text-gray-400">
            {recieverInfo.isOnline
              ? "Online"
              : `Last seen: ${new Date(recieverInfo.lastSeen).toLocaleString()}`}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <FaVideo className="cursor-pointer" />
        <FaPhone className="cursor-pointer" />
        <CgMoreVertical
          className="cursor-pointer"
          onClick={togglePopover}
        />
        {showPopover && (
          <div
            ref={popoverRef}
            className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
            <ul>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Block</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Delete</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default React.memo(MessageHeader);
