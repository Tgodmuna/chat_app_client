import React from 'react';

const ToastNotification: React.FC<{ message: string | null; type: "success" | "error" }> = ({
  message,
  type,
}) => {
  if (!message) return null;
  return (
    <div
      className={`p-4 mb-4 text-sm ${
        type === "success" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
      } rounded`}
      role="alert">
      {message}
    </div>
  );
};

export default ToastNotification;
