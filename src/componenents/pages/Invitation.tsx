import axios from "axios";
import React, { useState } from "react";
import useEnvironmentUrls from "../hooks/UseEnvironmentUrls";

const AddFriendInvitation: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { serverUrl } = useEnvironmentUrls();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!email.trim()) {
        alert("Please enter an email address.");
        return;
      }
      await axios.post(`${serverUrl}/api/friend/send-invitation`);

      alert(`Invitation sent to: ${email}`);
      setEmail("");
      setIsOpen(false);
    } catch (err) {
      alert(err.message);
    }
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
                <input
                  type="email"
                  value={email}
                  placeholder="Email addresses"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border p-2 rounded"
                />

                <button
                  type="submit"
                  className="mt-2 flex gap-2 items-center bg-blue-500 text-white p-2 rounded">
                  send
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
