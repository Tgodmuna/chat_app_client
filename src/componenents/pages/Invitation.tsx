import React, { useState } from "react";

const AddFriendInvitation: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Please enter an email address.");
      return;
    }
    alert(`Invitation sent to: ${email}\nMessage: ${message}`);
    setEmail("");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2">
        Add Friends
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Friends</h2>
              <button onClick={() => setIsOpen(false)}>X</button>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"></form>
                <input
                  type="email"
                  value={email}
                  placeholder="Email addresses"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded"
                />
                <textarea
                  value={message}
                  placeholder="Invitation message"
                  onChange={(e) => setMessage(e.target.value)}
                  className="border p-2 rounded"
                />
                <button
                  type="submit"
                  className="mt-2 flex gap-2 items-center bg-blue-500 text-white p-2 rounded">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AddFriendInvitation;
