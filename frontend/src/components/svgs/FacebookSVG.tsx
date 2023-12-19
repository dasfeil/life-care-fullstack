import { SVGProps } from "react"

const FacebookSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M22.667 4.667A.667.667 0 0 0 22 4h-3.333A6.36 6.36 0 0 0 12 10v3.6H8.667a.666.666 0 0 0-.667.667v3.466a.666.666 0 0 0 .667.667H12v8.933a.666.666 0 0 0 .667.667h4a.667.667 0 0 0 .666-.667V18.4h3.494a.667.667 0 0 0 .653-.493l.96-3.467a.667.667 0 0 0-.64-.84h-4.467V10a1.334 1.334 0 0 1 1.334-1.2H22a.667.667 0 0 0 .667-.667V4.667Z"
    />
  </svg>
)
export default FacebookSVG
