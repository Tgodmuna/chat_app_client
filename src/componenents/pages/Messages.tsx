import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";
import { FaVideo } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { CgMoreVertical } from "react-icons/cg";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../App.tsx";

const MessageComponent = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const token = UseFetchToken();
  const socket = useRef(null);
  const messagesEndRef = useRef(null);
  const clientInfo = useContext(AppContext);
  const location = useLocation();
  const { conversationId, recieverInfo } = location.state;

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/messages/${conversationId}?page=1&limit=10`,
          { headers: { "x-auth-token": token } }
        );
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    }
    if (conversationId) fetchMessages();
  }, [conversationId, token]);

  useEffect(() => {
    socket.current = new WebSocket(`ws://localhost:7000?token=${token}`);

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => socket.current?.close();
  }, [token]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      content: newMessage,
      sender: { _id: clientInfo?._id },
      reciever: { _id: recieverInfo._id },
      createdAt: new Date().toISOString(),
      read: false,
      delivered: true,
      conversationID: conversationId,
    };

    try {
      socket.current?.send(
        JSON.stringify({ recipientID: recieverInfo._id, content: newMessage, type: "direct" })
      );
      setMessages((prevMessages) => [...prevMessages, message]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          <img src={recieverInfo?.profilePicture || "default.png"} alt={recieverInfo?.username} className="rounded-full w-10 h-10" />
          <div>
            <p className="font-bold text-lg">{recieverInfo.username}</p>
            <p className="text-sm text-gray-400">
              {recieverInfo.isOnline ? "Online" : `Last seen: ${new Date(recieverInfo.lastSeen).toLocaleString()}`}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <FaVideo className="cursor-pointer" />
          <FaPhone className="cursor-pointer" />
          <CgMoreVertical className="cursor-pointer" />
        </div>
      </header>

      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">No messages yet</p>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-xs p-3 my-2 rounded-lg ${
                message.sender._id === clientInfo._id
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

      <form onSubmit={handleSendMessage} className="flex items-center p-4 border-t">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-lg"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </form>
    </div>
  );
};

export default MessageComponent;
