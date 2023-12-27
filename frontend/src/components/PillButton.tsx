import { ComponentProps, ReactNode } from "react";

const PillButton = ({ type, text, className, icon, ...props }: Props) => {
  return (
    <button
      {...props}
      className={"box-sizing w-[20rem] h-[50px] font-semibold rounded-full p-2 " + className}
      type={type}
    >
      <div className="flex relative h-[32px] ">
        {icon}
        <span className="m-auto self-center">{text}</span>
      </div>
    </button>
  );
};

type Props = ComponentProps<"button"> & {
  text?: string;
  className?: string;
  icon?: ReactNode;
};

export default PillButton;
