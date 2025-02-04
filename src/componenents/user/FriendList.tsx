import React, { useContext, useEffect, useState } from "react";
import type { FC } from "react";
import axios from "axios";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";
import { CgMoreVertical } from "react-icons/cg";
import { friendListType, userDataType } from "../../types.tsx";
import Dots from "../utils/Dots.tsx";
import Header from "./friends-related/Header.tsx";
import Search from "./friends-related/Search.tsx";
import DiscoverPeople from "./friends-related/DiscoverPeople.tsx";
import { LayoutContext } from "../pages/chats_page/Layout.tsx";
import FriendRequest from "./friends-related/FriendRequest.tsx";
import MessageComponent from "../pages/Messages.tsx";

const FriendList: FC = React.memo(() => {
  const [listOfFriends, setList] = useState<friendListType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showDiscoverPeople, SetshowDiscoverPeople] = useState<boolean>(false);
  const [showFriendRequest, setshowFriendRequest] = useState<boolean>(false);
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

  if (loading)
    return <p className={`text-center m-auto text-xl text-neutral-600`}>Loading friends...</p>;

  return (
    <div
      className={`flex flex-col ${
        layoutContext?.showFriends ? "w-full absolute px-1 " : "w-0  absolute"
      }  bg-slate-100 transition-all duration-700 items-center  overflow-y-hidden gap-[1rem] pt-[2rem]  overflow-scroll h-[100vh]`}>
      {/* Header Component */}
      {token && (
        <Header
          token={token}
          SetshowDiscoverPeople={SetshowDiscoverPeople}
          setshowFriendRequest={setshowFriendRequest}
        />
      )}
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
      {/* friend request */}
      {token && showFriendRequest && <FriendRequest token={token} />}
    </div>
  );
});

export default FriendList;

// Friend Item Component
const FriendItem: FC<{ friend: userDataType }> = React.memo(({ friend }) => {
  const [startMessage, SetStartMessage] = useState<boolean>(false);
  const [showPopOver, setShowPopOver] = useState<boolean>(false);

  //handler to initiate a chat with a friend
  const InitiateChat = () => SetStartMessage((prev) => !prev);

  return (
    //  on each user start, start a new chat or previous one
    startMessage ? (
      <MessageComponent recipientID={friend._id} />
    ) : (
      <div
        className="flex items-center justify-between w-full p-2 bg-gray-200 rounded-md"
        onClick={() => {
          InitiateChat();
        }}>
        {/* friend info */}
        <div className="flex items-center gap-3">
          {/* user avatar or profile image */}
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

        {/* Popover for more options */}
        <>
          <div className="relative">
            <button
              title="More options"
              onClick={(e) => {
                e.stopPropagation();
                setShowPopOver((prev) => !prev);
              }}
              className="focus:outline-none">
              <CgMoreVertical className="text-xl text-gray-500" />
            </button>

            {/* Popover content */}
            <div
              className={`absolute ${
                showPopOver ? "inline-block" : "hidden"
              } right-0 mt-2 w-48 bg-green-400 border border-gray-200 rounded-md shadow-lg z-10`}>
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Send Message</li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Remove Friend</li>
              </ul>
            </div>
          </div>
        </>
      </div>
    )
  );
});
