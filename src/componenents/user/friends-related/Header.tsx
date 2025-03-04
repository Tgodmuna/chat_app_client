import axios from "axios";
import { useState, useCallback, useEffect, useContext } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdOutlineNotificationAdd } from "react-icons/md";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FriendComponentContext } from "./Friends.tsx";

const Header: React.FC<{
  token: string;
}> = ({ token }) => {
  const [friendRequestCount, SetfriendRequestCount] = useState<number>(0);
  const friendComponentContext = useContext(FriendComponentContext);

  const navigate = useNavigate();

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
          onClick={() => {
            navigate("/dashboard/friends/discover_people");
            friendComponentContext?.toggleOnOutlet((prev) => !prev);
          }}
          title="Discover Friends"
          className="flex items-center gap-1 px-2 py-2 bg-green-400 text-white rounded-lg hover:bg-green-600 transition">
          <FaRegSquarePlus className="text-white" />
          <span className="text-xs hidden sm:inline-block font-medium">Add Friends</span>
        </button>

        {/* Friend Request Notification */}
        <div
          onClick={() => {
            navigate("/dashboard/friends/friendRequest");
            friendComponentContext?.toggleOnOutlet((prev) => !prev);
          }}
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
          onClick={() => navigate("/dashboard/friends")}
          title="Go Back"
          className="flex items-center px-3 py-2 bg-slate-200 rounded-lg hover:bg-gray-300   transition-all duration-300 hover:scale-110">
          <FaArrowAltCircleLeft className="" />
        </button>
      </div>
    </div>
  );
};

export default Header;
