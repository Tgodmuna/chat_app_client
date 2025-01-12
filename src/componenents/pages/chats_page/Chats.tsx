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
