import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import FriendList from "./FriendList.tsx";

export const FriendComponentContext = React.createContext<{
  toggleOnOutlet: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

/**
 * Friends component that manages the display of either the `Outlet` or `FriendList` component
 * based on the `isOutLet` state.
 *
 * @component
 * @example
 * return (
 *   <Friends />
 * )
 *
 * @returns {JSX.Element} The rendered Friends component.
 *
 * @remarks
 * This component uses the `FriendComponentContext.Provider` to provide a context value
 * that includes a function to toggle the `isOutLet` state.
 *
 * @hook
 * - `useState<boolean>`: Manages the `isOutLet` state to determine which component to display.
 *
 * @context
 * - `FriendComponentContext.Provider`: Provides the `toggleOnOutlet` function to child components.
 */
const Friends = () => {
  const [isOutLet, SetisOutLet] = useState<boolean>(false);

  return (
    <FriendComponentContext.Provider value={{ toggleOnOutlet: SetisOutLet }}>
      <div className={`w-full`}>{isOutLet ? <Outlet /> : <FriendList />}</div>
    </FriendComponentContext.Provider>
  );
};
export default React.memo(Friends);
