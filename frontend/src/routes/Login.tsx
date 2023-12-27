import PillButton from "../components/PillButton";
import LoginForm from "../components/LoginForm";
import { Link, Navigate } from "react-router-dom";
import FacebookSVG from "../components/svgs/FacebookSVG";
import GoogleSVG from "../components/svgs/GoogleSVG";
import useAuth from "../hooks/useAuth";

export default function Login() {
  const { auth } = useAuth();

  return (
    <>
      {!auth?.username ? (
        <div className="mt-24 min-h-screen flex flex-col items-center">
          <p className="text-center font-bold text-5xl mb-10">Log in</p>
          <PillButton
            className="bg-[#3B5998] text-white mb-3 hover:bg-[#2f477a]"
            text="Continue with Facebook"
            icon={<FacebookSVG />}
            onClick={() => console.log("Doesn't do anything yet")}
          />
          <PillButton
            className="bg-white box-border border border-[#676767] text-black hover:bg-[#dddddd]"
            text="Continue with Google"
            icon={<GoogleSVG />}
            onClick={() => console.log("Doesn't do anything yet")}
          />
          <hr className="w-[24rem] mt-10 mb-5" />
          <LoginForm />
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
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}
