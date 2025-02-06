import axios from "axios";
import React, { useState, useEffect, type ChangeEvent, useContext, useRef } from "react";
import type { Conversation, Endpoint } from "../../../types";
import { FaRegMessage, FaRegSquarePlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { TfiMore } from "react-icons/tfi";
import { MdPerson3 } from "react-icons/md";
import { LayoutContext } from "./Layout.tsx";
import { UseFetchToken } from "../../hooks/UseFetchToken.ts";
import Message from "../Messages.tsx";
import { AppContext } from "../../../App.tsx";

const Chats: React.FC = () => {
  const [chats, setChats] = useState<null | Conversation[]>(null);
  const [selectedChat, setSelectedChat] = useState<null | Conversation>(null);
  const token: string | null = UseFetchToken();
  const recipientID = useRef<null | string>(null);

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

        setChats(response[0].data.chats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, [token]);

  const layoutContext = useContext(LayoutContext);
  const appContext = useContext(AppContext);

  //chat selection handler
  const handleChatClick = (chat: Conversation, recipient: string) => {
    setSelectedChat(chat);
    recipientID.current = recipient;
  };

  //conversation list
  //-this will list all the conversations user involved in.
  //-it will also enable selection of a single chat and use its id to fetch related messages
  const conversations = chats?.map((chat) => {
    const lastMessage = chat.lastMessage;

    const profilePicturePath = chat.participants.find(
      (participant) => participant._id !== appContext?._id
    )?.profilePicture;

    //this is the person who sent the message
    const MessageSender = chat.participants.find(
      (participant) => participant._id !== appContext?._id
    );

    return (
      <div
        key={chat._id}
        onClick={() => MessageSender && handleChatClick(chat, MessageSender._id)}
        className={`flex flex-row items-center justify-between w-full p-1 rounded-xl bg-white shadow-md cursor-pointer`}>
        <div
          className={`flex justify-between items-center w-full bg-slate-300  p-4 border border-b-0 border-gray-600 `}>
          <div className="flex items-center justify-center gap-2">
            {profilePicturePath ? (
              <img
                src={profilePicturePath}
                alt="profile"
                className="rounded-full size-[1rem] m-auto"
              />
            ) : (
              <MdPerson3 className={`w-full text-2xl text-gray-500 m-auto`} />
            )}

            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className={`text-black`}> {MessageSender?.name}</h1>
              <p className={`text-sm italic text-neutral-400 m-auto`}>{lastMessage?.content}</p>
            </div>
          </div>

          <div className="flex flex-col w-[3rem] items-center justify-center gap-2">
            <div className={`p-4 size-8 bg-green-700 text-white text-start italic`}>{3}</div>
            <TfiMore className="text-green-400 text-[5px]" />
          </div>
        </div>
      </div>
    );
  });

  return (
    <div
      className={`flex flex-col ${
        layoutContext?.showChats ? "w-full absolute px-1 " : "w-0  absolute"
      }  bg-slate-100 transition-all duration-700 items-center  overflow-y-hidden gap-[1rem] pt-[2rem]  overflow-scroll h-[100vh]`}>
      <Header />
      <Search chats={chats} />
      {selectedChat ? (
        <div className="selected-chat-container">
          <Message
            recipientID={recipientID.current ?? ""}
            conversationId={selectedChat._id}
          />
        </div>
      ) : (
        conversations
      )}
    </div>
  );
};
export default Chats;

//Header component
const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext);

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
          onClick={() => layoutContext?.setShowChats(false)}
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
            if (participant._id !== "id") {
              return participant.name.includes(text);
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
    [CHATS, turnOnSearchData]
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
