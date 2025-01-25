import React, { useContext, useEffect, useState } from "react";
import type { FC } from "react";
import axios from "axios";
import { LayoutContext } from "../pages/chats_page/Layout.tsx";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";
import { CgMoreVertical } from "react-icons/cg";
import { FaRegSquarePlus } from "react-icons/fa6";
import type { friendListType, userDataType } from "../../types";
import { FaTimes } from "react-icons/fa";
import Dots from "../utils/Dots.tsx";

const FriendList: FC = React.memo(() => {
  const [list, setList] = useState<friendListType>([]);
  const [loading, setLoading] = useState<boolean>(true);
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

  if (loading) return <p>Loading friends...</p>;

  return (
    <div
      className={`flex flex-col ${
        layoutContext?.showFriends ? "w-full absolute px-1 " : "w-0  absolute"
      }  bg-slate-100 transition-all duration-700 items-center  overflow-y-hidden gap-[1rem] pt-[2rem]  overflow-scroll h-[100vh]`}>
      <Header />
      <Search data={list} />
      {list.length > 0 ? (
        list.map((friend, index) => (
          <FriendItem
            key={index}
            friend={friend}
          />
        ))
      ) : (
        <p className="text-gray-500">No friends found.</p>
      )}
    </div>
  );
});

export default FriendList;

// Header Component
const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext);

  return (
    <div className={`flex flex-row items-center w-full justify-between p-1`}>
      <p className={`text-neutral-700  text-xl font-bold  capitalize`}>friends</p>

      <div className={`flex flex-row items-center justify-center gap-[0.5rem]`}>
        <div
          title={"add friends"}
          className="chatIconStyle  p-1 rounded-md flex w-full items-center justify-between">
          <FaRegSquarePlus className={`text-neutral-700`} />
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
const Search: FC<{ data: friendListType }> = ({ data }) => {
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
};

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
