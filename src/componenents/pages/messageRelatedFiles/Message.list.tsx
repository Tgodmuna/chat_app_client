import React, { useContext } from "react";
import { AppContext } from "../../../App.tsx";

type Message = {
  content: string;
  sender: { _id: string | undefined };
  reciever: { _id: string };
  createdAt: string;
  read: boolean;
  delivered: boolean;
  conversationID: any;
};

type MessagesListProps = {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
};

const MessagesList: React.FC<MessagesListProps> = ({ messages, messagesEndRef }) => {
  const clientInfo = useContext(AppContext);

  return (
    <div className="flex flex-col flex-grow p-4 overflow-y-auto">
      {messages.length === 0 ? (
        <p className="text-gray-500 text-center">No messages yet</p>
      ) : (
        messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-xs p-3 my-2 rounded-lg ${
              message.sender?._id === clientInfo?._id
                ? "self-end bg-blue-500 text-white"
                : "self-start bg-gray-300"
            }`}>
            <p className="text-sm">{message.content}</p>
            <div className="flex justify-between text-xs text-gray-500">
              <span>{new Date(message.createdAt).toLocaleString()}</span>
              <span>{message.read ? "✓✓" : message.delivered ? "✓" : ""}</span>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessagesList;
