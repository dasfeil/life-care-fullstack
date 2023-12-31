import { SVGProps } from "react";

const ChevronRightArrowSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 48 48"
    {...props}
  >
    <path
      fill="#212121"
      d="M16.116 39.634a1.25 1.25 0 0 1 0-1.768L29.982 24 16.116 10.134a1.25 1.25 0 0 1 1.768-1.768l14.75 14.75a1.25 1.25 0 0 1 0 1.768l-14.75 14.75a1.25 1.25 0 0 1-1.768 0Z"
    />
  </svg>
);
export default ChevronRightArrowSVG;
