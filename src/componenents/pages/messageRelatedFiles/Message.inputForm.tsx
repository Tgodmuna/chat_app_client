import React from "react";
import type { SendMessageEvent } from "./Messages.tsx";

type SendMessageFormProps = {
  onSendMessage: (e: SendMessageEvent) => Promise<void>;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
};

const MessageInput: React.FC<SendMessageFormProps> = ({
  onSendMessage,
  newMessage,
  setNewMessage,
}) => {
  return (
    <form
      onSubmit={onSendMessage}
      className="flex items-center p-4 border-t">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-grow p-2 border rounded-lg"
        placeholder="Type a message..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Send
      </button>
    </form>
  );
};

export default React.memo(MessageInput);
