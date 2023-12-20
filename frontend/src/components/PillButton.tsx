import { ComponentProps, lazy } from "react";

const FacebookSVG = lazy(() => import('./svgs/FacebookSVG'))
const GoogleSVG = lazy(() => import('./svgs/GoogleSVG'))

const PillButton = ({styleType, type, text, className, ...props }: Props) => {
  let bContent: string;
  let style = "";
  let icon: any;
  switch (styleType) {
    case "none":
      bContent = text !== undefined ? text : "";
      break;
    case "facebook":
      bContent = "Continue with Facebook";
      style = "bg-[#3B5998] text-white ";
      icon = <FacebookSVG/>
      break;
    case "google":
      bContent = "Continue with Google";
      style = "bg-white border border-[#676767] text-black ";
      icon = <GoogleSVG/>
      break;
  }
  
  style += "w-[20rem] font-semibold rounded-full p-2 " + className;
  return (
    <button {...props} className={style} type={type}>
      <div className="flex relative h-[32px] ">
        {icon !== undefined? icon : null}
        <span className="m-auto self-center">{bContent}</span>
      </div>
    </button>
  );
};

type Props = ComponentProps<"button"> & {
  styleType: "none" | "facebook" | "google";
  text?: string;
  className?: string;
}

export default PillButton;
