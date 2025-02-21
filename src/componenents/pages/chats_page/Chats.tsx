import axios from "axios";
import React, { useState, useEffect, type ChangeEvent, useContext } from "react";
import type { Conversation, Endpoint, Participant } from "../../../types";
import { FaRegMessage, FaRegSquarePlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { TfiMore } from "react-icons/tfi";
import { MdPerson3 } from "react-icons/md";
import { UseFetchToken } from "../../hooks/UseFetchToken.ts";
import { AppContext } from "../../../App.tsx";
import { useNavigate } from "react-router-dom";

const Chats: React.FC = () => {
  const [chats, setChats] = useState<null | Conversation[]>(null);
  const token: string | null = UseFetchToken();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        if (!token) {
          throw new Error("No token found");
        }

        const endpoints: Endpoint[] = [
          {
            url: "http://localhost:7000/api/conversations/conversations",
            headers: {
              "x-auth-token": token,
              "content-type": "application/json",
            },
          },
        ];

        const response = await Promise.all(
          endpoints.map((endpoint) => axios.get(endpoint.url, { headers: endpoint.headers }))
        );

        if (!response) throw new Error("No response from server");
        console.log(response);

        setChats(response[0].data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [token]);

  const appContext = useContext(AppContext);

  //conversation list
  //-this will list all the conversations user involved in.
  const conversations = chats?.map((chat) => {
    const lastMessage = chat.lastMessage;

    const recipient = chat.participants.find((participant) => participant._id !== appContext?._id);
    const profilePicturePath = recipient?.profilePicture;
    let recipientDetails: Participant = {
      _id: recipient?._id,
      profilePicture: recipient?.profilePicture,
      username: recipient?.username,
      lastSeen: recipient?.lastSeen,
      isOnline: recipient?.isOnline,
      name: recipient?.name,
    };

    return (
      <div
        key={chat._id}
        onClick={() =>
          navigate("/dashboard/message", {
            state: {
              recieverInfo: recipientDetails,
              recipientID: recipient?._id,
              conversationId: chat?._id,
            },
          })
        }
        className="flex items-center justify-between w-full p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer">
        <div className="flex items-center gap-4">
          {profilePicturePath ? (
            <img
              src={profilePicturePath}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <MdPerson3 className="w-10 h-10 text-gray-500" />
          )}
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-gray-800">{recipient?.name}</span>
            <span className="text-sm text-gray-500">{lastMessage?.content}</span>
          </div>
        </div>
        <TfiMore className="text-gray-400" />
      </div>
    );
  });

  return (
    <div
      className={`flex flex-col w-full  px-1 
      }  bg-slate-100 items-center overflow-y-hidden gap-[1rem] pt-[2rem]  overflow-scroll h-[100vh]`}>
      <Header />
      <Search chats={chats} />
      {conversations}
    </div>
  );
};
export default Chats;

//Header component
const Header: React.FC = () => {
  return (
    <div className={`flex flex-row items-center w-full justify-between p-1 `}>
      <p className={`text-neutral-700  text-xl font-bold  capitalize `}>Chats</p>

      <div className={`flex flex-row items-center justify-center gap-[0.5rem]`}>
        <div
          title={"new group"}
          className="chatIconStyle">
          <FaRegSquarePlus className={`text-neutral-700`} />
        </div>
        <div
          title={"new message"}
          className="chatIconStyle">
          <FaRegMessage className={`text-neutral-700`} />
        </div>
        <div
          onClick={() => {}}
          title={"go back"}
          className="chatIconStyle">
          <FaTimes className={`text-neutral-700`} />
        </div>
      </div>
    </div>
  );
};

//search component
const Search: React.FC<{ chats: Conversation[] | null }> = React.memo(({ chats }) => {
  const [SearchData, setSearchData] = useState<null | string>(null);
  const [searchResult, setSearchResult] = useState<Conversation[] | null>(null);
  const [CHATS] = useState<undefined | typeof chats>(chats);
  const [showSearchData, setshowSearchData] = useState<boolean>(false);
  const appConetxt = useContext(AppContext);
  const turnOnSearchData = React.useCallback(
    (value: boolean) => {
      if (searchResult && searchResult.length > 0) {
        setshowSearchData(value);
      }
    },
    [searchResult]
  );

  const handleSearch = React.useCallback(
    (text: string) => {
      try {
        if (!CHATS) {
          throw new Error(
            "CHATS data is not available. Please ensure the chats are loaded properly."
          );
        }

        const result = CHATS.filter((CHAT) => {
          return CHAT.participants.some((participant) => {
            if (participant._id !== appConetxt?._id) {
              return participant.name?.includes(text) ?? false;
            }

            return false;
          });
        });

        setSearchResult(result);
        turnOnSearchData(true);
      } catch (exception) {
        console.error(exception);
      }
    },
    [CHATS, appConetxt?._id, turnOnSearchData]
  );

  useEffect(() => {
    if (SearchData) {
      handleSearch(SearchData);
    }
  }, [SearchData, handleSearch]);

  return (
    <div className={`flex flex-col items-center justify-center w-full`}>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchData(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder={`search`}
        value={SearchData ?? ""}
        type={"text"}
        name={"search"}
        className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <div
        className={`p-4 ${
          showSearchData ? "block" : "hidden"
        } bg-white w-full relative rounded-lg shadow-md`}>
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((chat, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-300 hover:bg-gray-100 transition duration-200">
              {chat.participants.map((participant) => (
                <span
                  key={participant._id}
                  className="text-gray-800 font-medium">
                  {participant.name}
                </span>
              ))}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center p-4">No results found</div>
        )}
      </div>
    </div>
  );
});
