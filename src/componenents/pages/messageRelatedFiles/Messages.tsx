import React, { useEffect, useState, useRef, useContext, useCallback } from "react";
import axios from "axios";
import { UseFetchToken } from "../../hooks/UseFetchToken.ts";
import { useLocation } from "react-router-dom";
import { AppContext } from "../../../App.tsx";
import MessageHeader from "./Message.header.tsx";
import MessagesList from "./Message.list.tsx";
import MessageInput from "./Message.inputForm.tsx";
import { displayMessage, markMessageAsDelivered, markMessageAsRead } from "./messageStatus.ts";
import useEnvironmentUrls from "../../hooks/UseEnvironmentUrls.ts";

export type Message = {
  content: string | undefined;
  sender: { _id: string | undefined };
  reciever: { _id: string | undefined };
  createdAt: string | undefined;
  read: boolean | undefined;
  delivered: boolean | undefined;
  conversationID: string | undefined;
  ID?: number | undefined;
};
export interface SendMessageEvent extends React.FormEvent<HTMLFormElement> {}

interface MessagePayload {
  recipientID: string;
  content: string;
  type: string;
  messageID: number;
  event: string;
}

const MessageComponent = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const token = UseFetchToken();
  const socket = useRef<WebSocket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clientInfo = useContext(AppContext);
  const location = useLocation();
  const { recieverInfo, conversationId } = location.state;
  const { serverUrl, websocketUrl } = useEnvironmentUrls();

  function notifyUser(message: string) {
    console.log("message status", message);
    alert(message);
  }

  useEffect(() => console.log(messages), [messages]);

  //fetch old messages on component mount
  useEffect(() => {
    if (!token) return; //if no token, let it terminate the network request since it is an authorization key for the request.
    async function fetchMessages() {
      try {
        const response = await axios.get(
          `${serverUrl}/api/messages/${conversationId}?page=1&limit=15`,
          { headers: { "x-auth-token": token as string } }
        );
        console.log(response.data);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages", error);
      }
    }
    if (location.state?.conversationId) fetchMessages();
  }, [conversationId, location.state?.conversationId, serverUrl, token]);

  //setup websocket connection
  useEffect(() => {
    if (!token) return;

    socket.current = new WebSocket(`${websocketUrl}?token=${token}`);
    if (socket.current) socket.current.onopen = (e) => console.log("connected to websocket");
    //recieveing a message from a user
    socket.current.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("new message entered:", data);

      switch (data.event) {
        case "newMessage":
          displayMessage(data, setMessages);
          break;

        case "messageDelivered":
          markMessageAsDelivered(data.messageID, setMessages);
          break;

        case "messageNotDelivered":
          notifyUser("Message not delivered. Recipient is offline.");
          break;
        case "messageRead":
          console.log("called markMessageAsRead() ");
          markMessageAsRead(data, setMessages);
          break;

        default:
          console.warn("Unknown event received:", data);
      }
    };

    return () => socket.current?.close();
  }, [token, websocketUrl]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //sending message to a user
  const handleSendMessage = useCallback(
    async (e: SendMessageEvent) => {
      e.preventDefault();
      if (!newMessage.trim()) return;

      const message: Message = {
        content: newMessage,
        sender: { _id: clientInfo?._id },
        reciever: { _id: recieverInfo?._id },
        createdAt: new Date().toISOString(),
        read: false,
        delivered: false,
        conversationID: location.state?.conversationId,
        ID: Date.now(),
      };

      const payload: MessagePayload = {
        recipientID: recieverInfo?._id,
        content: newMessage,
        type: "direct",
        messageID: Date.now(),
        event: "newMessage",
      };

      try {
        console.log("data sent to socket:", payload);

        socket.current?.send(JSON.stringify(payload));
        setMessages((prevMessages) => [...prevMessages, message]);
        setNewMessage("");
      } catch (error) {
        console.error("Error sending message", error);
      }
    },
    [clientInfo?._id, location.state?.conversationId, newMessage, recieverInfo._id]
  );

  return (
    <div className="flex flex-col h-screen">
      <MessageHeader recieverInfo={recieverInfo} />
      <MessagesList
        messagesEndRef={messagesEndRef}
        messages={messages && messages}
        socket={socket}
      />

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default React.memo(MessageComponent);
