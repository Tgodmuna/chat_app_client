import axios from "axios";
import React from "react";
import { useContext, useEffect, useState, type FC } from "react";
import { CgMoreVertical } from "react-icons/cg";
import { FaArrowAltCircleLeft, FaUserPlus } from "react-icons/fa";
import { AppContext } from "../../../App.tsx";
import type { userDataType } from "../../../types.tsx";
import SuccessToast from "../../utils/SuccessToast.tsx";
import { useNavigate } from "react-router-dom";
import { FriendComponentContext } from "./Friends.tsx";

const DiscoverPeople: FC<{
  token: string;
}> = React.memo(({ token }) => {
  const [users, setUsers] = useState<userDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userID = useContext(AppContext)?._id;
  const navigate = useNavigate();
  const friendComponentContext = useContext(FriendComponentContext);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:7000/api/friend/users", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (response.status === 200) {
          setUsers(response.data);
        } else {
          console.error("Failed to fetch users:", response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) {
    return <p className="text-center text-lg text-gray-600 mt-8">Loading users...</p>;
  }

  const filteredUsers = users?.filter((user) => user._id !== userID);

  return (
    <div className="p-6 bg-gray-100 w-full min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-800">Discover People</h2>
        <FaArrowAltCircleLeft
          onClick={() => {
            friendComponentContext?.toggleOnOutlet((prev) => !prev);
            navigate("/dashboard/friends");
          }}
          title="Close"
          className="text-3xl text-gray-400 hover:text-gray-500 hover:bg-white cursor-pointer transition-all hover:scale-110"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <UserCard
              token={token}
              key={user?._id}
              user={user}
            />
          ))
        ) : (
          <p className="text-gray-500">No users found to add as friends.</p>
        )}
      </div>
    </div>
  );
});

const UserCard: FC<{ user: userDataType; token: string }> = React.memo(({ user, token }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const requesterID = useContext(AppContext)?._id;
  const recipientID = user?._id;

  const AddAsFriend = async () => {
    setLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:7000/api/friend/request",
        { requesterID, recipientID },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        setIsSuccess(true);
        setSuccessMessage("Friend request sent!");
      } else {
        setIsError(true);
        setErrorMessage("Failed to send friend request");
      }
    } catch (err: any) {
      setIsError(true);
      setErrorMessage(err?.response?.data || err.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow relative">
      <div className="relative">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={`${user.name}'s avatar`}
            className="w-20 h-20 rounded-full object-cover"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-gray-700">{user.username[0]}</span>
          </div>
        )}
      </div>

      <h3 className="text-xl font-medium text-gray-800">{user.name}</h3>
      <p className="text-sm text-gray-500">@{user.username}</p>
      <p className="text-sm text-gray-600 text-center">{user.bio || "No bio available"}</p>

      <div className="flex items-center gap-4 mt-3">
        <button
          onClick={AddAsFriend}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white transition-colors ${
            loading || isSuccess
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading || isSuccess}>
          {loading ? (
            <div className="animate-spin border-2 border-white rounded-full w-4 h-4 border-t-transparent" />
          ) : (
            <>
              <FaUserPlus />
              {isSuccess ? "Request Sent" : "Add Friend"}
            </>
          )}
        </button>

        <button
          title="More Options"
          type="button"
          className="flex items-center px-3 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <CgMoreVertical />
        </button>
      </div>

      {isSuccess && (
        <SuccessToast
          message={successMessage}
          onClose={() => setIsSuccess(false)}
        />
      )}

      {isError && (
        <SuccessToast
          title="Error"
          message={errorMessage}
          onClose={() => setIsError(false)}
        />
      )}
    </div>
  );
});

export default React.memo(DiscoverPeople);
