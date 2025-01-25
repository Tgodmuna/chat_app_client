import React from "react";

const Dots: React.FC<{ isOnline: boolean; className: string }> = ({ isOnline, className }) => {
  return <div className={`${isOnline ? "bg-green-500" : "bg-orange-600"}className`}></div>;
};
export default Dots;
