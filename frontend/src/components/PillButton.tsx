import { ComponentProps, Suspense, lazy } from "react";

const FacebookSVG = lazy(() => import("./svgs/FacebookSVG"));
const GoogleSVG = lazy(() => import("./svgs/GoogleSVG"));

const Fallback = () => {
  return (
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>
  );
};

const PillButton = ({ styleType, type, text, className, ...props }: Props) => {
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
      icon = (
        <Suspense fallback={<Fallback />}>
          <FacebookSVG />
        </Suspense>
      );
      break;
    case "google":
      bContent = "Continue with Google";
      style = "bg-white border border-[#676767] text-black ";
      icon = (
        <Suspense fallback={<Fallback />}>
          <GoogleSVG />
        </Suspense>
      );
      break;
  }

  style += "w-[20rem] font-semibold rounded-full p-2 " + className;
  return (
    <button {...props} className={style} type={type}>
      <div className="flex relative h-[32px] ">
        {icon !== undefined ? icon : null}
        <span className="m-auto self-center">{bContent}</span>
      </div>
    </button>
  );
};

type Props = ComponentProps<"button"> & {
  styleType: "none" | "facebook" | "google";
  text?: string;
  className?: string;
};

export default PillButton;
