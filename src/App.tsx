import React, { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { UseSuspence } from "./componenents/hooks/UseSuspence.tsx";
import type { userDataType } from "./types.tsx";
import Authenticator from "./componenents/Auth/Authenticator.tsx";
import { UseFetchToken } from "./componenents/hooks/UseFetchToken.ts";
import Friends from "./componenents/user/friends-related/Friends.tsx";

//lazy imports
const LazyLogin = React.lazy(() => import("./componenents/Auth/Login.tsx"));
const LazyRegister = React.lazy(() => import("./componenents/Auth/Register.tsx"));
const LazyLayout = React.lazy(() => import("./componenents/pages/chats_page/Layout.tsx"));
const LazyDiscoverPeople = React.lazy(
  () => import("./componenents/user/friends-related/DiscoverPeople.tsx")
);
const LazyFriendRequest = React.lazy(
  () => import("./componenents/user/friends-related/FriendRequest.tsx")
);
const LazyChats = React.lazy(() => import("./componenents/pages/chats_page/Chats.tsx"));
const LazyMessage = React.lazy(
  () => import("./componenents/pages/messageRelatedFiles/Messages.tsx")
);

//app Context
export const AppContext = React.createContext<null | (userDataType & {})>(null);

function App() {
  const [UserData, setUserData] = useState<null | userDataType>(null);
  const token = UseFetchToken();

  //fetch for user data on component mount
  useEffect(() => {
    if (!token) return;

    try {
      const data = sessionStorage.getItem("UserData");
      if (!data) throw new Error("could not fetch user data");

      //deserialise user data
      const user = data ? JSON.parse(data) : null;
      setUserData(user);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  return (
    <AppContext.Provider value={UserData && UserData}>
      <div className="App w-fit pb-0 ">
        <Routes>
          {/* dashboard */}
          <Route
            path="/dashboard"
            element={
              <UseSuspence
                component={
                  <Authenticator token={token}>
                    <LazyLayout />
                  </Authenticator>
                }
              />
            }>
            <Route
              path="chats"
              element={<UseSuspence component={<UseSuspence component={<LazyChats />} />} />}
            />

            <Route
              path={"message"}
              element={<UseSuspence component={<LazyMessage />} />}
            />

            {/*  related friends route */}
            <>
              <Route
                path="friends"
                element={<UseSuspence component={<Friends />} />}>
                <Route
                  path={"friendRequest"}
                  element={<UseSuspence component={<LazyFriendRequest token={token ?? ""} />} />}
                />

                <Route
                  path="discover_People"
                  element={<UseSuspence component={<LazyDiscoverPeople token={token ?? ""} />} />}
                />
              </Route>
            </>

            <Route
              path="profile"
              element={<UseSuspence component={<LazyChats />} />}
            />
            <Route
              path="settings"
              element={<UseSuspence component={<LazyChats />} />}
            />
          </Route>

          {/* auth routes */}
          <>
            <Route
              path="/login"
              element={<UseSuspence component={<LazyLogin />} />}
            />
            <Route
              path="/register"
              element={<UseSuspence component={<LazyRegister />} />}
            />
          </>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default React.memo(App);
