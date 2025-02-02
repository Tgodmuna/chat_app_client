import axios from "axios";
import { type FC, useEffect, useState } from "react";
import type { userDataType } from "../../../types";
import SuccessToast from "../../utils/SuccessToast.tsx";
import React from "react";

const FriendRequest: FC<{
  token: string;
}> = React.memo(({ token }) => {
  const [requests, setRequests] = useState<userDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  //on component mount fetch user friend request list
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/friend/friend-requests", {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (response.status === 200) {
          console.log("response:", response);

          if (!Object.hasOwn(response.data, "list")) {
            const [{ friendRequestList }] = response.data;
            setRequests(friendRequestList);
          } else if (response.status === 200 && response.data.message === "list is empty") {
            setRequests(response.data.list);
          }
        } else {
          console.error("Failed to fetch friend requests:", response);
        }
      } catch (error) {
        console.error("Error  friend requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, [token]);

  if (loading) {
    return <p className="text-center text-xl text-neutral-600">Loading friend requests...</p>;
  }

  //friend request acceptance handler
  const handleAccept = async (requesterID: string) => {
    try {
      const response = await axios.put(
        "http://localhost:7000/api/friend/accept",
        {
          requesterID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      console.log("accept response:", response);

      if (response.status !== 200) {
        // console.log(response);
        setIsError(true);
      } else {
        setIsSuccess(true);
        setSuccessMessage(response.data.message);
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setErrorMessage(error?.response?.data?.message || error.message || "Internal server error");
    }
  };

  //friend request rejection handler
  const handleReject = async (requesterID: string) => {
    try {
      const response = await axios.put(
        "http://localhost:7000/api/friend/rejected",
        {
          requesterID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (response.status !== 200) {
        setIsError(true);
      }

      setIsSuccess(true);
      console.log(response);
      setSuccessMessage(response.data);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setErrorMessage(error?.response?.data || error?.message || "Internal server error");
    }
  };

  return (
    <div className="p-4 bg-gray-50 w-full overflow-scroll overflow-x-hidden min-h-screen">
      <h2 className="text-2xl font-bold text-gray-700">Friend Requests</h2>
      {requests.length > 0 ? (
        <ul className="mt-4 space-y-2">
          {requests.map((request, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded-md flex justify-between items-center">
              <div className="flex items-center gap-3">
                {request.profilePicture ? (
                  <img
                    src={request.profilePicture}
                    alt={`${request.name}'s avatar`}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                    AV
                  </div>
                )}
                <div>
                  <p className="text-lg font-bold text-gray-700">
                    {request.username}
                    <span className="text-sm text-gray-500">({request.name})</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAccept(request._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md">
                  Accept
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md">
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-2">No friend requests found.</p>
      )}
      {isSuccess && (
        <SuccessToast
          message={successMessage}
          onClose={() => setIsSuccess(false)}
        />
      )}
      {isError && (
        <SuccessToast
          title="Error"
          message={errorMessage}
          onClose={() => setIsError(false)}
        />
      )}
    </div>
  );
});

export default FriendRequest