import type { Message } from "./Messages";

export const displayMessage = (data: any, setMessages) => {
  const message: Message = {
    content: data.content,
    sender: { _id: data.senderID },
    reciever: { _id: data.recieverID },
    createdAt: data.createdAt,
    read: data.read,
    delivered: data.delivered,
    conversationID: data.conversationID,
    ID: data.messageID,
  };
  setMessages((prevMessages) => [...prevMessages, message]);
};

export function markMessageAsDelivered(messageID: string, setMessages) {
  console.log("called markasDelivered");
  setMessages((prevMessages) =>
    prevMessages.map((message) =>
      message.conversationID === messageID ? { ...message, delivered: true } : message
    )
  );
}

export function markMessageAsRead(data, setMessages): void {
  setMessages((prevMessages) =>
    prevMessages.map((message) =>
      message.ID === data.messageID ? [...prevMessages, data.updatedMessage] : [...prevMessages]
    )
  );
  console.log("updated successfully");
  //NOTE: remember to update this  function to make a call to the server to update the message status
}
