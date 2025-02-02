import { ReactNode } from "react";

type ButtonProps = {
  icon: ReactNode;
  text: string;
  onClick: any;
};

export const Button = ({ icon, text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className=" bg-[#F7F7F8] flex flex-col justify-center items-center w-[365px] h-[256px] rounded-[10px]"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};
