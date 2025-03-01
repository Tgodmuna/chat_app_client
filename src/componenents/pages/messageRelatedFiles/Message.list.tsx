import React, { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../../App.tsx";

type Message = {
  content: string | undefined;
  sender: { _id: string | undefined };
  reciever: { _id: string | undefined };
  createdAt: string | undefined;
  read: boolean | undefined;
  delivered: boolean | undefined;
  ID?: number | undefined;
};

type MessagesListProps = {
  messages: Message[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
  socket?: React.MutableRefObject<WebSocket | null>;
};

const MessagesList: React.FC<MessagesListProps> = ({ messages, messagesEndRef, socket }) => {
  const clientInfo = useContext(AppContext);
  const initialHeight = useRef(window.innerHeight);
  const readMessages = useRef(new Set()); // Track read messages

  console.log("passed prop message", messages);

  useEffect(() => {
    const checkReadStatus = () => {
      messages.forEach((message) => {
        if (message.sender?._id !== clientInfo?._id && !message.read) {
          const element = document.getElementById(`msg-${message?.ID}`);

          if (element) {
            const rect = element.getBoundingClientRect();

            // Check if message is in viewport
            if (rect.top >= 0 && rect.bottom <= initialHeight.current) {
              if (!readMessages.current.has(message.ID)) {
                readMessages.current.add(message?.ID);
                console.log("Message in view, marking as read:", message?.ID);

                socket?.current &&
                  socket?.current?.send(
                    JSON.stringify({
                      event: "messageRead",
                      messageID: message?.ID,
                      message: "message is read",
                      time: Date.now(),
                      recipientID: message.sender?._id, //user who gets back the updated message in real-time
                    })
                  );
              }
              return;
            }
          }
        }
      });
    };

    // Run initially and also attach scroll event listener
    messages && checkReadStatus();
    window.addEventListener("scroll", checkReadStatus);

    return () => {
      window.removeEventListener("scroll", checkReadStatus);
    };
  }, [clientInfo?._id, messages, socket]);

return (
  <div className="flex flex-col w-full h-full p-4 overflow-y-auto">
    {messages.length === 0 ? (
      <p className="text-gray-500 text-center">No messages yet</p>
    ) : (
      messages.map((message, index) => (
        <div
          id={`msg-${message.ID}`}
          key={index}
          className={`flex flex-col p-2 my-2 rounded-lg max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] ${
            message.sender?._id === clientInfo?._id
              ? "self-end bg-slate-300 text-neutral-600"
              : "self-start bg-green-200"
          }`}>
          <p className="text-sm break-words">{message.content}</p>
          <div className="flex items-center gap-2 justify-between text-xs text-gray-500">
            <span className="text-neutral-600">
              {new Date(message?.createdAt as string | number).toLocaleTimeString()}
            </span>
            <span className="text-sm">
              {message.sender?._id === clientInfo?._id ? (
                message.read ? (
                  <p className="text-xs text-blue-500">Seen</p>
                ) : message.delivered ? (
                  "✓✓"
                ) : (
                  "✓"
                )
              ) : (
                ""
              )}
            </span>
          </div>
        </div>
      ))
    )}
    <div ref={messagesEndRef} />
  </div>
);
};

export default React.memo(MessagesList);
