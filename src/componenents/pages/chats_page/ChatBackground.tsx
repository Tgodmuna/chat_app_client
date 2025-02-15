import React from "react";
import { FaRegComments } from "react-icons/fa6";

/**
 * ChatBG component renders a background for the chat application.
 * It displays a centered message prompting the user to select a chat to read messages.
 *
 * @component
 * @example
 * return (
 *   <ChatBG />
 * )
 *
 * @returns {JSX.Element} A div containing a centered icon and message.
 */
const ChatBG: React.FC = (): JSX.Element => {
  return (
    <div className="flex absolute -z-50 items-center justify-center h-[100vh] w-full bg-gray-200">
      <div className="text-center flex flex-col items-center justify-center text-wrap">
        <FaRegComments
          size={100}
          className=" text-gray-400 mb-4"
        />
        <p className="text-gray-500 italic">Select a chat to read messages</p>
      </div>
    </div>
  );
};

export default ChatBG;
