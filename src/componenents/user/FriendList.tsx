import React, { useContext, useEffect, useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import type { FC } from "react";
import axios from "axios";
import { LayoutContext } from "../pages/chats_page/Layout.tsx";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";
import { CgMoreVertical } from "react-icons/cg";
import { FaRegSquarePlus } from "react-icons/fa6";
import type { friendListType, userDataType } from "../../types";
import { FaTimes } from "react-icons/fa";
import Dots from "../utils/Dots.tsx";
import { AppContext } from "../../App.tsx";

const FriendList: FC = React.memo(() => {
  const [listOfFriends, setList] = useState<friendListType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDiscoverPeople, SetshowDiscoverPeople] = useState<boolean>(false);
  const token = UseFetchToken();
  const layoutContext = useContext(LayoutContext);

  // Fetch friends list
  useEffect(() => {
    const fetchFriendsList = async () => {
      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:7000/api/user/friends_list`, {
          headers: {
            "x-auth-token": token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(response);
          setList(response.data.data);
        } else {
          console.error("Failed to fetch friends list:", response);
        }
      } catch (error) {
        console.error("Error fetching friends list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendsList();
  }, [token]);

  if (loading) return <p className={`text-center text-xl text-neutral-600`}>Loading friends...</p>;

  return (
    <div
      className={`flex flex-col ${
        layoutContext?.showFriends ? "w-full absolute px-1 " : "w-0  absolute"
      }  bg-slate-100 transition-all duration-700 items-center  overflow-y-hidden gap-[1rem] pt-[2rem]  overflow-scroll h-[100vh]`}>
      <Header SetshowDiscoverPeople={SetshowDiscoverPeople} />
      <Search data={listOfFriends} />

      {/* list all user friends */}
      {listOfFriends.length > 0 ? (
        listOfFriends.map((friend, index) => (
          <FriendItem
            key={index}
            friend={friend}
          />
        ))
      ) : (
        <p className="text-gray-500">No friends found.</p>
      )}
      {/* discover people */}
      {token && showDiscoverPeople && (
        <DiscoverPeople
          SetshowDiscoverPeople={SetshowDiscoverPeople}
          token={token}
        />
      )}
    </div>
  );
});

export default FriendList;

// Header Component
const Header: React.FC<{
  SetshowDiscoverPeople: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ SetshowDiscoverPeople }) => {
  const layoutContext = useContext(LayoutContext);

  return (
    <div className={`flex flex-row items-center w-full justify-between p-1`}>
      <p className={`text-neutral-700  text-xl font-bold  capitalize`}>friends</p>

      <div className={`flex flex-row items-center justify-center gap-[0.5rem]`}>
        <div
          onClick={() => SetshowDiscoverPeople(true)}
          title={"discover friends"}
          className="chatIconStyle  p-1 rounded-md flex w-full items-baseline justify-between">
          <FaRegSquarePlus className={`text-neutral-700 h-[1cap] `} />
          <p className={`text-neutral-500 text-[11px] font-bold m-1 text-center  capitalize `}>
            add friends
          </p>
        </div>

        <div
          onClick={() => layoutContext?.setShowFriends(false)}
          title={"go back"}
          className="chatIconStyle">
          <FaTimes className={`text-neutral-700`} />
        </div>
      </div>
    </div>
  );
};

// Search Component
const Search: FC<{ data: friendListType }> = React.memo(({ data }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<userDataType[]>([]);

  useEffect(() => {
    try {
      if (!data || data === undefined) throw new Error("no data is passed");

      const filtered = data.filter(
        (friend) =>
          friend.name.toLowerCase().includes(query.toLowerCase()) ||
          friend.username.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } catch (exc) {
      console.log(exc);
    }
  }, [query, data]);

  return (
    <div className="w-full px-4">
      <input
        type="text"
        placeholder="Search friends..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
      {results.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {results.map((friend, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded-md">
              {friend.name} ({friend.username})
            </li>
          ))}
        </ul>
      ) : (
        query && <p className="text-gray-500 mt-2">No results found.</p>
      )}
    </div>
  );
});

// Friend Item Component
const FriendItem: FC<{ friend: userDataType }> = ({ friend }) => {
  return (
    <div className="flex items-center justify-between w-full p-2 bg-gray-200 rounded-md">
      <div className="flex items-center gap-3">
        {friend.profilePicture ? (
          <img
            src={friend.profilePicture}
            alt={`${friend.name}'s avatar`}
            className="w-10 h-10 rounded-full"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
            AV
          </div>
        )}
        <div>
          <p className="text-lg font-bold text-gray-700">
            {friend.username} <span className="text-sm text-gray-500">({friend.name})</span>
          </p>
          <Dots
            className={`size-1 rounded-full p-[1px] absolute`}
            isOnline={friend.isOnline}
          />
        </div>
      </div>
      <CgMoreVertical className="text-xl text-gray-500" />
    </div>
  );
};

//discover People
const DiscoverPeople: FC<{
  token: string;
  SetshowDiscoverPeople: React.Dispatch<React.SetStateAction<boolean>>;
}> = React.memo(({ token, SetshowDiscoverPeople }) => {
  const [users, setUsers] = useState<userDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const userID = useContext(AppContext)?._id;

  //fetch users on component mount
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
          console.log("data fetched:", response);
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
    return <p className="text-center text-xl text-neutral-600">Loading users...</p>;
  }

  //filtered array.
  const filteredUsers = users?.filter((user) => user._id !== userID);

  return (
    <div className="p-4 bg-gray-50 w-full overflow-scroll overflow-x-hidden  min-h-screen">
      <div className="flex w-full items-center  justify-between  p-2 m-auto">
        <h2 className="text-2xl font-bold text-gray-700 ">Discover People</h2>
        <FaTimes
          onClick={() => SetshowDiscoverPeople(false)}
          title={"close"}
          className={`text-3xl text-red-300 hover:text-red-600`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

const UserCard: FC<{ user: userDataType; token: string }> = ({ user, token }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const requesterID = useContext(AppContext)?._id;
  const recipientID = user?._id;

  // handler for adding user as friend
  const AddAsFriend = async () => {
    setLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://localhost:7000/api/friend/request",
        {
          requesterID,
          recipientID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        console.log(response);
        setIsSuccess(true);
        setSuccessMessage("Friend request sent!");
      } else {
        setIsError(true);
        setErrorMessage("Failed to send friend request");
      }
    } catch (err: any) {
      console.log("error adding user:", err);
      setIsError(true);
      setErrorMessage(err?.response?.data || err.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center relative">
      {/* User Avatar */}
      <div className="relative">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt={`${user.name}'s avatar`}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-gray-700">{user.username}</span>
          </div>
        )}
      </div>

      {/* User Info */}
      <h3 className="text-lg font-bold text-gray-700 mt-3">{user.name}</h3>
      <p className="text-sm text-gray-500">@{user.username}</p>
      <p className="text-sm text-gray-600 text-center mt-2">{user.bio || "No bio available"}</p>

      {/* Friend Request Actions */}
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={AddAsFriend}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={loading}>
          {loading ? (
            <div className="animate-spin border-2 border-white rounded-full w-4 h-4 border-t-transparent" />
          ) : (
            <>
              <FaUserPlus />
              Add Friend
            </>
          )}
        </button>

        <button
          title={"more options"}
          type={"button"}
          className="flex items-center px-2 py-2 bg-gray-200 rounded-full hover:bg-gray-300">
          <CgMoreVertical />
        </button>
      </div>

      {/* Success Message */}
      {isSuccess && <p className="text-sm text-green-600 mt-2">{successMessage}</p>}

      {/* Error Message */}
      {isError && <p className="text-sm text-red-600 mt-2">{errorMessage}</p>}
    </div>
  );
};
