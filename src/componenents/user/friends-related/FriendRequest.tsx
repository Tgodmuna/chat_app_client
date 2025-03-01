import axios from "axios";
import { type FC, useEffect, useState } from "react";
import type { userDataType } from "../../../types";
import SuccessToast from "../../utils/SuccessToast.tsx";
import React from "react";
import useEnvironmentUrls from "../../hooks/UseEnvironmentUrls.ts";

const FriendRequest: FC<{ token: string }> = React.memo(({ token }) => {
  const [requests, setRequests] = useState<userDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [ errorMessage, setErrorMessage ] = useState<string>( "" );
  const { serverUrl } = useEnvironmentUrls();


  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get(`${serverUrl}/api/friend/friend-requests`, {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        });

        if (response.status === 200) {
          const { friendRequestList = [] } = response.data[0] || {};
          setRequests(friendRequestList);
        } else {
          console.error("Failed to fetch friend requests:", response);
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriendRequests();
  }, [serverUrl, token]);

  const handleResponse = async (url: string, requesterID: string, action: string) => {
    try {
      const response = await axios.put(
        url,
        { requesterID },
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      if (response.status === 200) {
        setRequests((prev) => prev.filter((request) => request._id !== requesterID));
        setIsSuccess(true);
        setSuccessMessage(`${action} request successful!`);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error: any) {
      setIsError(true);
      setErrorMessage(error?.response?.data?.message || error.message || "Internal server error");
    }
  };

  return (
    <div className="p-6 bg-gray-50 w-full min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">Friend Requests</h2>

      {loading ? (
        <div className="text-center text-xl text-gray-600 animate-pulse">
          Loading friend requests...
        </div>
      ) : requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request._id}
              className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center gap-4">
                {request.profilePicture ? (
                  <img
                    src={request.profilePicture}
                    alt={`${request.username}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full text-gray-700 text-lg font-bold"
                    aria-label="Avatar Placeholder">
                    {request.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-lg font-semibold text-gray-800">{request.username}</p>
                  <p className="text-sm text-gray-500">{request.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    handleResponse("http://localhost:7000/api/friend/accept", request._id, "Accept")
                  }
                  className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors duration-150"
                  aria-label="Accept Friend Request">
                  Accept
                </button>
                <button
                  onClick={() =>
                    handleResponse(
                      "http://localhost:7000/api/friend/rejected",
                      request._id,
                      "Decline"
                    )
                  }
                  className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors duration-150"
                  aria-label="Decline Friend Request">
                  Decline
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center mt-6">No friend requests found.</p>
      )}

      {(isSuccess || isError) && (
        <SuccessToast
          title={isSuccess ? "Success" : "Error"}
          message={isSuccess ? successMessage : errorMessage}
          onClose={() => {
            setIsSuccess(false);
            setIsError(false);
          }}
        />
      )}
    </div>
  );
});

export default FriendRequest;
