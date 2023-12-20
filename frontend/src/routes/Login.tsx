import PillButton from "../components/PillButton";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

export default function Login() {
  
  return (
    <div className="mt-24 min-h-screen flex flex-col items-center">
      <p className="text-center font-bold text-5xl mb-10">Log in</p>
      <PillButton styleType="facebook" className="mb-3 hover:bg-[#2f477a]" />
      <PillButton styleType="google" className="hover:bg-[#dddddd]" />
      <hr className="w-[24rem] mt-10 mb-5" />
      <LoginForm/>
      <hr className="m-5 border-t-gray-300 w-[26rem]" />
      <p>
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="underline underline-offset-2 text-blue-500 transition duration-150 ease-in-out hover:text-blue-800 focus:text-blue-800 active:text-blue-900"
        >
          Create an account
        </Link>
      </p>
    </div>
  );
}
