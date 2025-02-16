import React from "react";
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
  return (
    <header className="flex justify-between items-center p-4 border-b">
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
        <CgMoreVertical className="cursor-pointer" />
      </div>
    </header>
  );
};

export default MessageHeader;
