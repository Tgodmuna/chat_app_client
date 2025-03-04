import React, { Suspense } from "react";

export const UseSuspence: React.FC<{ component: React.JSX.Element }> = ({ component }) => {
  return <Suspense fallback={<div>lazy Loading...</div>}>{component}</Suspense>;
};
