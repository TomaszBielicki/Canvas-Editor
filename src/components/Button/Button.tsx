import { ButtonProps } from "../../types";

export const Button = ({ icon, text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className=" bg-[#F7F7F8] flex flex-col justify-evenly items-center w-full sm:w-full  xl:w-[365px] h-[256px] rounded-[10px] pb-[12px] pt-[10px]"
    >
      {icon}
      <span>{text}</span>
    </button>
  );
};
