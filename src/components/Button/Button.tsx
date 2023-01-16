import React, { FC } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
}

export const Button: FC<ButtonProps> = ({ onClick, children, ...props }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className="border-2 bg-black rounded-md px-3 active:scale-110 active:bg-cyan-700 active:text-slate-200 active:border-white  hover:border-cyan-500 hover:text-cyan-500 ease-in duration-200">
        {children}
      </button>
    </div>
  );
};
