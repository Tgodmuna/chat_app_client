import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import type { Message } from "../../types.tsx";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";

type MessageProps = {
  conversationId: string;
};

const MessageComponent: React.FC<MessageProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const token = UseFetchToken();
  const socket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/conversations/${conversationId}/messages`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
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

    const messageData = {
      content: newMessage,
      conversationId,
    };

    try {
      const response = await axios.post(
        `/api/conversations/${conversationId}/messages`,
        messageData,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      socket.current?.send(JSON.stringify(response.data));
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
