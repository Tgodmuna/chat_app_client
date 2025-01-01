import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string; 
};

const Button: React.FC<Props> = ({ className, children, ...rest }) => {
  return (
    <button
      {...rest}
      className={className}>
      {children}
    </button>
  );
};

export default Button;
