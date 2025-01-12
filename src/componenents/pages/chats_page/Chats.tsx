import React from "react";

const Chats: React.FC = () => {
  const [chats, setChats] = useState<null | Conversation[]>(null);

  //on component mount, fetch chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        //get auth token
        const token: string | null = localStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        const endpoints: Endpoint[] = [
          {
            url: "chatsURL",
            headers: {
              "x-auth-token": token,
              "content-type": "application/json",
            },
          },
          {
            url: "messageURL",
            headers: {
              "x-auth-token": token,
              "content-type": "application/json",
            },
          },
        ];

        //fetch chats
        const response = await Promise.all(
          endpoints.map((endpoint) => axios.get(endpoint.url, { headers: endpoint.headers }))
        );

        //save the data
        setChats(response[0].data.chats);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div
      className={
        "flex flex-col items-center justify-center overflow-y-hidden gap-[1rem] p-4  overflow-scroll max-h-[100vw] w-full"
      }>
      <Header />
    </div>
  );
};
export default Chats;

//chat header
const Header = () => {
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
          title={"go back"}
          className="chatIconStyle">
          <FaTimes className={`text-neutral-700`} />
        </div>
      </div>
    </div>
  );
};

//search chats
const Search: React.FC<{ chats: Conversation[] | null }> = ({ chats }) => {
  const [SearchData, setSearchData] = useState<null | string>(null);
  const [searchResult, setSearchResult] = useState<Conversation[] | null>(null);
  const [CHATS] = useState<undefined | typeof chats>(chats);

  const handleSearch: (text: string) => void = (text) => {
    if (!CHATS) {
      throw new Error("CHATS data is not available. Please ensure the chats are loaded properly.");
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
  };

  return (
    <div className={`flex flex-col items-center justify-center w-full`}>
      <input
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchData(e.target.value);
          handleSearch(e.target.value);
        }}
        placeholder={"search chat"}
        value={SearchData ?? ""}
        type={"text"}
        name={"search"}
        className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
      />
      <div className="p-4 bg-white rounded-lg shadow-md">
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
};
