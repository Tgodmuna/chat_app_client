import React, { createContext, useContext, useEffect, useRef } from "react";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";

interface WebSocketContextType {
  socket: React.MutableRefObject<WebSocket | null>;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketProviderProps {
  children: React.ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({ children }) => {
  const token = UseFetchToken();
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (token) {
      socket.current = new WebSocket(`ws://localhost:7000?token=${token}`);

      socket.current.onopen = () => console.log("connected to websocket");
      socket.current.onclose = () => console.log("disconnected to websocket");
    } else {
      console.log("no token found and can not create a websocket connection");
    }
    return () => {
      socket.current?.close();
    };
  }, [token]);

  return <WebSocketContext.Provider value={{ socket }}>{children}</WebSocketContext.Provider>;
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
