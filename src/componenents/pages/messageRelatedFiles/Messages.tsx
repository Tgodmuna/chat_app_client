import React, { useEffect, useState, useRef, useContext, useCallback } from "react";
import axios from "axios";
import { UseFetchToken } from "../../hooks/UseFetchToken.ts";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../App.tsx";
import MessageHeader from "./Message.header.tsx";
import MessagesList from "./Message.list.tsx";
import MessageInput from "./Message.inputForm.tsx";

type Message = {
  content: string;
  sender: { _id: string | undefined };
  reciever: { _id: string };
  createdAt: string;
  read: boolean;
  delivered: boolean;
  conversationID: any;
};

export interface SendMessageEvent extends React.FormEvent<HTMLFormElement> {}

interface MessagePayload {
  recipientID: string;
  content: string;
  type: string;
}

const MessageComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const token = UseFetchToken();
  const socket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  const handleSendMessage = useCallback(
    async (e: SendMessageEvent) => {
      e.preventDefault();
      if (!newMessage.trim()) return;

      const message: Message = {
        content: newMessage,
        sender: { _id: clientInfo?._id },
        reciever: { _id: recieverInfo._id },
        createdAt: new Date().toISOString(),
        read: false,
        delivered: true,
        conversationID: conversationId,
      };

      const payload: MessagePayload = {
        recipientID: recieverInfo._id,
        content: newMessage,
        type: "direct",
      };

      try {
        socket.current?.send(JSON.stringify(payload));
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message", error);
      }
    },
    [clientInfo?._id, conversationId, newMessage, recieverInfo._id]
  );

  return (
    <div className="flex flex-col h-screen">
      <MessageHeader recieverInfo={recieverInfo} />
      <MessagesList
        messagesEndRef={messagesEndRef}
        messages={messages}
      />

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default MessageComponent;
