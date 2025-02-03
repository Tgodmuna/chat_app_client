import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { Message } from "../../types.tsx";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";

type MessageProps = {
  conversationId?: string;
  recipientID: string;
};

const MessageComponent: React.FC<MessageProps> = ({ conversationId, recipientID }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const token = UseFetchToken();
  const socket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch initial messages on component mount
  //-after fetching, set the message to the message useState.
  //-any time,token or conversationId changes.it refetch the messgage again.
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/messages/message/${conversationId}?page=1&limit=2`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        console.log(response.data);
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
    <div className="message-container">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className="message">
            <p>{message.content}</p>
          </div>
        ))}
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
  );
};

export default MessageComponent;
