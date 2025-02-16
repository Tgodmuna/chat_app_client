import React, { useEffect, useState } from "react";
import type { FC } from "react";
import axios from "axios";
import { UseFetchToken } from "../../hooks/UseFetchToken.ts";
import { CgMoreVertical } from "react-icons/cg";
import { friendListType, userDataType, type Participant } from "../../../types.tsx";
import Header from "./Header.tsx";
import Search from "./Search.tsx";
import { Link, useNavigate } from "react-router-dom";

const FriendList: FC = React.memo(() => {
  const [listOfFriends, setList] = useState<friendListType>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = UseFetchToken();

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
      className={`friendList flex flex-col max-w-[100%] px-1
       bg-slate-300  items-center overflow-y-hidden gap-[1rem] pt-[2rem] overflow-scroll h-[100vh]`}>
      {/* Header */}
      {token && <Header token={token} />}

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
        <p className="text-gray-500 [<br/>]">
          goto discover_People to make new friend,
          <Link
            className={"p-2 rounded-mg w-[7rem]"}
            to={"/friends/discover_people"}>
            new friends
          </Link>
        </p>
      )}
    </div>
  );
});

export default FriendList;

// Friend Item Component
const FriendItem: FC<{ friend: userDataType }> = React.memo(({ friend }) => {
  const [showPopOver, setShowPopOver] = useState<boolean>(false);

  const userInfoProp: Participant = {
    _id: friend?._id,
    isOnline: friend?.isOnline,
    lastSeen: friend?.lastSeen,
    profilePicture: friend?.profilePicture,
    username: friend?.username,
    name: friend?.name,
  };

  //handler to initiate a  chat with a friend:
  //this works by navigating a user to message component,where it customise the
  //the component with passed props
  const navigate = useNavigate();

  return (
    //  on each user click, start a new chat or previous one
    <div
      className="flex  group cursor-pointer items-center justify-between w-full p-2 bg-slate-200 rounded-md"
      onClick={() =>
        navigate("/dashboard/message", {
          state: { recieverInfo: userInfoProp, recipientID: friend._id },
        })
      }>
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
  );
});
