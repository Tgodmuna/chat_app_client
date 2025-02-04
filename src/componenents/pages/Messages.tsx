import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { Message } from "../../types.tsx";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";
import { FaVideo } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { CgMoreVertical } from "react-icons/cg";

export type userInfoProp = {
  _id: string | undefined;
  profilePicture: string | null | undefined;
  isOnline: boolean | undefined;
  lastSeen: Date | undefined;
  username: string | undefined;
};
type MessageProps = {
  conversationId?: string;
  recipientID: string;
  userInfo: userInfoProp;
};

const MessageComponent: React.FC<MessageProps> = ({ conversationId, recipientID, userInfo }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const token = UseFetchToken();
  const socket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  console.log(userInfo);

  // Fetch initial messages on component mount
  //-after fetching, set the message to the message useState.
  //-any time token or conversationId changes.it refetch the messgage again.
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (!conversationId) {
          console.info("no conversation id passed, ");
          console.info("it means a new chat,returning......");
          return;
        }

        const response = await axios.get(
          `http://localhost:7000/api/messages/message/${conversationId}?page=1&limit=2`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log("fetched messages", response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [conversationId, token]);

  // Set up WebSocket connection
  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:7000?token=${token}`);

    socket.current.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    socket.current.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socket.current?.close();
    };
  }, [token]);

  // Scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //send message handler
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      socket.current?.send(JSON.stringify({ recipientID, content: newMessage, type: "direct" }));

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={`flex flex-col justify-center items-center w-full`}>
      <header className={`flex   justify-between items-center border-b-2 border-b-slate-400 `}>
        <div className={`flex  items-center justify-center h-full gap-2 w-full`}>
          <img
            className={`rounded-full object-contain size-[3.5rem] p-2 border-2 shadow-sm border-slate-500`}
            src={userInfo?.profilePicture ?? "lklk"}
            alt={userInfo?.username}
          />
          {/* username and  status */}
          <div
            className={`flex border-1 border-t-0 border-x-0 border-yellow-400 flex-col max-w-[15rem] gap-2 items-start justify-center `}>
            <p className={"font-bold text-lg"}>{userInfo.username}</p>
            {/*NOTE: remember to improve status later for realtime update */}
            <p
              className={`italic text-xs ${
                userInfo.isOnline ? "text-green-500" : "text-orange-400"
              }`}>
              {userInfo.isOnline ? "online" : `offline:${userInfo.lastSeen}`}
            </p>
          </div>
        </div>

        <div
          className={`flex justify-between items-center w-[10rem] h-full hover:bg-slate-200 cursor-pointer`}>
          <FaVideo
            title={"video chat"}
            className={`messageIcon`}
          />
          <FaPhone
            title={"call"}
            className={`messageIcon`}
          />
          <CgMoreVertical
            title={"more optons"}
            className={`messageIcon`}
          />
        </div>
      </header>

      {/* message body */}
      <div className="message-container bg-green-200 ">
        <div className="messages">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div
                key={message.id}
                className="message">
                <p>{message.content}</p>
              </div>
            ))
          ) : (
            <p className={`text-neutral-600 text-lg text-center m-auto `}>
              send a message to start conversation
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSendMessage}
          className="message-form">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
          />
          <button
            type="submit"
            className="send-button">
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default MessageComponent;
