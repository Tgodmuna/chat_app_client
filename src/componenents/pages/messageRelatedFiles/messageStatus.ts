import type { Message } from "./Messages";

export const displayMessage = (data: any, setMessages) => {
  const message: Message = {
    content: data.content,
    sender: { _id: data.sender },
    reciever: { _id: data.receiver },
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

export function markMessageAsRead(response, setMessages): void {
  const { data, messageID,  } = response;

  setMessages((prevMessages) =>
    prevMessages.map((msg) =>
      msg.ID === messageID
        ? { ...msg, read: true, updatedAt: data.updatedAt }
        : msg
    )
  );

  console.log("updated successfully");
}
