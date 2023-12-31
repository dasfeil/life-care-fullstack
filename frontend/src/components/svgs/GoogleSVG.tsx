import { SVGProps } from "react"
const GoogleSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    fill="none"
    viewBox="0 0 23 23"
    {...props}
  >
    <path
      fill="#FFC107"
      d="M22.776 9.248h-.926V9.2H11.5v4.6H18a6.897 6.897 0 0 1-13.4-2.3 6.9 6.9 0 0 1 6.9-6.9c1.759 0 3.36.664 4.578 1.747l3.252-3.252A11.447 11.447 0 0 0 11.5 0C5.15 0 0 5.15 0 11.5S5.15 23 11.5 23 23 17.85 23 11.5c0-.771-.08-1.524-.224-2.252Z"
    />
    <path
      fill="#FF3D00"
      d="m1.326 6.147 3.778 2.771A6.897 6.897 0 0 1 11.5 4.6c1.759 0 3.36.664 4.578 1.747l3.252-3.252A11.447 11.447 0 0 0 11.5 0C7.083 0 3.252 2.494 1.326 6.147Z"
    />
    <path
      fill="#4CAF50"
      d="M11.5 23c2.97 0 5.67-1.137 7.71-2.985l-3.56-3.012A6.849 6.849 0 0 1 11.5 18.4a6.897 6.897 0 0 1-6.488-4.569l-3.75 2.89C3.165 20.444 7.03 23 11.5 23Z"
    />
    <path
      fill="#1976D2"
      d="M22.776 9.248h-.926V9.2H11.5v4.6H18a6.922 6.922 0 0 1-2.35 3.203l3.56 3.011C18.958 20.243 23 17.25 23 11.5c0-.771-.08-1.524-.224-2.252Z"
    />
  </svg>
)
export default GoogleSVG
