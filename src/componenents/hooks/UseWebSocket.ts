import { useContext } from "react";
import { AppContext } from "../../App.tsx";

export const useWebSocket = () => {
  if (!AppContext) {
    console.error("AppContext is null, socket might not be available");
  }

  return useContext(AppContext);
};
