import type { ChangeEvent, FC } from "react";
import React, { useContext, useEffect, useState } from "react";
import type { friendListType, userDataType } from "../../types";
import axios from "axios";
import { UseFetchToken } from "../hooks/UseFetchToken.ts";
import { CgMoreVertical } from "react-icons/cg";
import Dots from "../utils/Dots.tsx";
import { FaRegSquarePlus } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { LayoutContext } from "../pages/chats_page/Layout.tsx";

const FriendList: FC = () => {
  const [list, setList] = useState<friendListType | null>(null);
  const token = UseFetchToken();

  //fetch friends list on component mount.
  useEffect(() => {
    if (!token) return;

    const fetchFriendsList = async () => {
      try {
        const response = await axios.get("njn", {
          headers: {
            "x-auth-token": token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status !== 200) {
          console.log("response", response);
          return;
        }

        setList(response.data.data);
      } catch (error) {
        console.error("Error fetching friends list:", error);
      }
    };
    fetchFriendsList();
  }, [token]);

  if (list && list?.length < 1) throw new Error("list is empty");

  //loop over the  list
  let Friends = list?.map((eachFriend, index) => {
    return (
      <div
        key={index}
        className={`flex w-full group p-2 justify-center items-center  bg-gray-200 `}>
        {/* first child */}
        <div className={`flex w-full gap-3  `}>
          {/* avater */}
          {eachFriend?.profilePicture ? (
            <>
              {" "}
              <img
                className={`size-4 p-2 rounded-full m-auto`}
                src={eachFriend.profilePicture}
                alt={`${eachFriend?.name} pic`}
              />
              <Dots
                isOnline={eachFriend.isOnline}
                className={`size-1 rounded-full p-[1px] absolute`}
              />
            </>
          ) : (
            <>
              {" "}
              <div className={`rounded-full size-4 p-2 bg-gray-300 text-black`}>{"AV"}</div>
              <Dots
                isOnline={eachFriend.isOnline}
                className={`size-1 rounded-full p-[1px] absolute`}
              />
            </>
          )}

          {/* details  */}
          <div className={`flex flex-col items-center jus`}>
            <p className={`text-3xl text-center text-neutral-600 font-bold capitalize`}>
              {eachFriend.username} <span className={`font-extralight`}>({eachFriend.name})</span>
            </p>

            <p className={`text-xl text-neutral-400 capitalize tetx-center font-light`}></p>
          </div>
        </div>

        {/* second child */}
        <CgMoreVertical
          className={`hidden group-hover:block text-2xl text-green-400 hover:bg-green-600 transition-all place-items-end shadow-md shadow-black p-1`}
        />
      </div>
    );
  });

  return (
    <div
      className={`flex flex-col ${
        true ? "w-full absolute px-1 " : "w-0  absolute"
      }  bg-slate-100 transition-all duration-700 items-center  overflow-y-hidden gap-[1rem] pt-[2rem]  overflow-scroll h-[100vh]`}>
      <Header />
      {<Search data={list} />}

      {list ? Friends : "no friends"}
    </div>
  );
};
export default FriendList;

//header component
const Header: React.FC = () => {
  const layoutContext = useContext(LayoutContext);

  return (
    <div className={`flex flex-row items-center w-full justify-between p-1 `}>
      <p className={`text-neutral-700  text-xl font-bold  capitalize `}>friends</p>

      <div className={`flex flex-row items-center justify-center gap-[0.5rem]`}>
        <div
          title={"add friends"}
          className="chatIconStyle  p-1 rounded-md flex w-full items-center justify-between">
          <FaRegSquarePlus className={`text-neutral-700`} />
          <p className={`text-neutral-500 text-[11px] font-bold m-1 text-center  capitalize `}>
            {" "}
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

//search component
const Search: React.FC<{ data: friendListType|null }> = React.memo(({ data }) => {
  const [SearchingData, setSearchData] = useState<null | string>(null);
  const [searchResult, setSearchResult] = useState<userDataType[] | null>(null);
  const [friends] = useState<undefined | typeof data>(undefined);
  const [showSearchData, setshowSearchData] = useState<boolean>(false);

  //turn on searched result
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
        if (!friends) {
          throw new Error(
            " data is not available. Please ensure the data to search on is loaded properly."
          );
        }

        const result = friends.filter((friend) => friend.name || friend.username === SearchingData);

        setSearchResult(result);
        turnOnSearchData(true);
      } catch (exception) {
        console.error(exception);
      }
    },
    [SearchingData, friends, turnOnSearchData]
  );

  //on component mount, set search ready
  useEffect(() => {
    if (SearchingData) {
      handleSearch(SearchingData);
    }
  }, [SearchingData, handleSearch]);

  return (
    <div className={`flex flex-col items-center justify-center w-full`}>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchData(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder={`search`}
        value={SearchingData ?? ""}
        type={"text"}
        name={"search"}
        className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />

      {/* Display search results */}
      <div
        className={`p-4 ${
          showSearchData ? "block" : "hidden"
        } bg-white w-full relative rounded-lg shadow-md`}>
        {searchResult && searchResult.length > 0 ? (
          searchResult.map((eachResult, index) => (
            <div
              key={index}
              className="p-2 border-b border-gray-300 hover:bg-gray-100 transition duration-200">
              {eachResult.name || eachResult.username}

              {/* reminder: remember to complete to a better UI */}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center p-4">No results found</div>
        )}
      </div>
    </div>
  );
});
