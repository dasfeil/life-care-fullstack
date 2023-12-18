import dynamic from "next/dynamic";
import { ReactNode } from "react";
import Image from "next/image";

const PillButton = ({ ...props }: Props) => {
  let text: string;
  let style: string;
  let svgLoc = "";

  switch (props.type) {
    case "none":
      text = props.text !== undefined ? props.text : "";
      style = `bg-[${props.backgroundColor}] text-[${props.textColor}] border border-[${props.borderColor}] `;
      svgLoc = props.svgLoc ? props.svgLoc : "";
      break;
    case "facebook":
      text = "Continue with Facebook";
      style = "bg-[#3B5998] text-white ";
      svgLoc = "/icon_facebook.svg";
      break;
    case "google":
      text = "Continue with Google";
      style = "bg-white border border-[#676767] text-black ";
      svgLoc = "/icon_google.svg";
      break;
  }
  style += "w-[20rem] font-semibold rounded-full p-2 " + props.className;
  return (
    <button className={style}>
      <div className="flex relative h-[32px]">
        {svgLoc && (
          <Image
            src={svgLoc}
            alt="Button Icon"
            width={32}
            height={32}
            priority
            className="absolute left-0"
          ></Image>
        )}
        <span className="m-auto self-center">{text}</span>
      </div>
    </button>
  );
};

interface Props {
  type: "none" | "facebook" | "google";
  text?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  svgLoc?: string;
  className?: string;
}

export default PillButton;
