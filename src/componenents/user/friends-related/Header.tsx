import axios from "axios";
import { useContext, useState, useCallback, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdOutlineNotificationAdd } from "react-icons/md";
import React from "react";
import { LayoutContext } from "../../pages/chats_page/Layout.tsx";

const Header: React.FC<{
  token: string;
  SetshowDiscoverPeople: React.Dispatch<React.SetStateAction<boolean>>;
  setshowFriendRequest: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ SetshowDiscoverPeople, setshowFriendRequest, token }) => {
  const layoutContext = useContext(LayoutContext);
  const [friendRequestCount, SetfriendRequestCount] = useState<number>(0);

  const fetchFriendRequests = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:7000/api/friend/friend-requests", {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data !== undefined) {
        SetfriendRequestCount(response.data.length);
      }
    } catch (error) {
      console.error("Error fetching friend requests:", error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;

    fetchFriendRequests();

    const interval = setInterval(() => {
      fetchFriendRequests();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchFriendRequests, token]);

  return (
    <div className="flex flex-row items-center mt-[-1.5rem] w-full justify-between p-1 bg-gray-50 shadow-sm rounded-md">
      <p className="text-neutral-600 sm:text-2xl font-bold capitalize">Friends</p>

      <div className="flex flex-row items-center gap-3">
        {/* Discover Friends Button */}
        <button
          onClick={() => SetshowDiscoverPeople(true)}
          title="Discover Friends"
          className="flex items-center gap-1 px-3 py-2 bg-green-400 text-white rounded-lg hover:bg-blue-600 transition">
          <FaRegSquarePlus className="text-white" />
          <span className="text-xs hidden sm:inline-block font-medium">Add Friends</span>
        </button>

        {/* Friend Request Notification */}
        <div
          onClick={() => setshowFriendRequest(true)}
          title="Friend Request"
          className="relative hover:scale-95  cursor-pointer">
          <MdOutlineNotificationAdd className="text-3xl text-green-400" />
          {friendRequestCount > 0 && (
            <span className="absolute -top-1 -right-2 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full">
              {friendRequestCount}
            </span>
          )}
        </div>

        {/* Back Button */}
        <button
          onClick={() => layoutContext?.setShowFriends(false)}
          title="Go Back"
          className="flex items-center px-3 py-2 bg-slate-200 rounded-lg hover:bg-gray-300 transition">
          <FaTimes className="text-gray-700" />
        </button>
      </div>
    </div>
  );
};

export default Header;
