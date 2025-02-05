import React, { useContext, useEffect, useState } from "react";
import type { FC } from "react";
import axios from "axios";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";
import { CgMoreVertical } from "react-icons/cg";
import { friendListType, userDataType } from "../../types.tsx";
import Header from "./friends-related/Header.tsx";
import Search from "./friends-related/Search.tsx";
import DiscoverPeople from "./friends-related/DiscoverPeople.tsx";
import { LayoutContext } from "../pages/chats_page/Layout.tsx";
import FriendRequest from "./friends-related/FriendRequest.tsx";
import MessageComponent, { type userInfoProp } from "../pages/Messages.tsx";
import { AppContext } from "../../App.tsx";

const FriendList: FC = React.memo(() => {
  const [listOfFriends, setList] = useState<friendListType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<string | null>(null);
  const token = UseFetchToken();
  const layoutContext = useContext(LayoutContext);

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

  const handleViewSwitch = (view: string | null) => {
    setActiveView(view);
  };

  return (
    <div
      className={`flex flex-col ${
        layoutContext?.showFriends ? "w-full absolute px-1" : "w-0 absolute"
      } bg-slate-100 transition-all duration-700 items-center overflow-y-hidden gap-[1rem] pt-[2rem] overflow-scroll h-[100vh]`}>
      {/* Show only one active component */}
      {activeView === "discover" && token && (
        <DiscoverPeople
          SetshowDiscoverPeople={() => handleViewSwitch(null)}
          token={token}
        />
      )}

      {activeView === "friendRequest" && token && <FriendRequest token={token} />}

      {!activeView && (
        <>
          {/* Header */}
          {token && (
            <Header
              token={token}
              SetshowDiscoverPeople={() => handleViewSwitch("discover")}
              setshowFriendRequest={() => handleViewSwitch("friendRequest")}
            />
          )}

          {/* Search Component */}
          <Search data={listOfFriends} />

          {/* List Friends */}
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
        </>
      )}
    </div>
  );
});

export default FriendList;

// Friend Item Component
const FriendItem: FC<{ friend: userDataType }> = React.memo(({ friend }) => {
  const [startMessage, SetStartMessage] = useState<boolean>(false);
  const [showPopOver, setShowPopOver] = useState<boolean>(false);
  const appContext = useContext(AppContext);

  const userInfoProp: userInfoProp = {
    _id: appContext?._id,
    isOnline: appContext?.isOnline,
    lastSeen: appContext?.lastSeen,
    profilePicture: appContext?.profilePicture,
    username: appContext?.username,
  };

  //handler to initiate a chat with a friend
  const InitiateChat = () => SetStartMessage((prev) => !prev);

  return (
    //  on each user start, start a new chat or previous one
    startMessage ? (
      <MessageComponent
        userInfo={userInfoProp}
        recipientID={friend._id}
      />
    ) : (
      <div
        className="flex  group cursor-pointer items-center justify-between w-full p-2 bg-slate-200 rounded-md"
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
              className="size-[3.5rem] rounded-full"
            />
          ) : (
            <div className="flex items-center justify-center size-[3.5rem] bg-gray-300 rounded-full">
              {`${friend.name[0].toUpperCase()}${friend.name[friend.name.length - 1]
                .toString()
                .toUpperCase()}`}
            </div>
          )}

          <div className="relative">
            <p className="text-lg flex flex-col items-start justify-start capitalize font-bold text-gray-700">
              {friend.name}
              <span className="text-sm font-thin italic truncate text-neutral-400 max-w-[15rem]">
                {!friend.bio ? " busy" : friend.bio}
              </span>
            </p>
            {/* <span
              className={`size-[5px] rounded-full  relative right-[10px] p-2 left-0 top-0 ${
                friend.isOnline ? "bg-green-400" : "bg-orange-600"
              }`}></span> */}
          </div>
        </div>

        {/* Popover for more options */}
        <button
          title="More options"
          onClick={(e) => {
            e.stopPropagation();
            setShowPopOver((prev) => !prev);
          }}
          className="focus:outline-none">
          <CgMoreVertical className=" inline cursor-pointer sm:hidden sm:group-hover:inline-block text-xl text-green-400" />
        </button>

        {/* Popover content */}
        <div
          className={`absolute ${
            showPopOver ? "inline-block" : "hidden"
          } right-0 top-[193px] mt-2 w-48 bg-green-400 border border-gray-200 rounded-md shadow-lg z-10`}>
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Profile</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Send Message</li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Remove Friend</li>
          </ul>
        </div>
      </div>
    )
  );
});
