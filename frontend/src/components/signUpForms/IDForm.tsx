import PillButton from "../PillButton";
import { Link } from "react-router-dom";
import TextInput from "../TextInput";
import { useFormikContext } from "formik";
import FacebookSVG from "../svgs/FacebookSVG";
import GoogleSVG from "../svgs/GoogleSVG";

const IDForm = () => {
  const { submitForm } = useFormikContext();
  return (
    <>
      <TextInput
        type="text"
        name="id"
        label="ID"
        placeholder="id"
        className="w-[20rem]"
      />
      <PillButton
        type="button"
        onClick={submitForm}
        text="Continue"
        className="mt-10 text-[#ffffff] bg-[#363d61] hover:bg-[#4f598d]"
      />
      <h2 className="w-[20rem] text-center border border-b-gray-300 leading-[0.1em] my-10">
        <span className="bg-[#FFF] p-2 text-gray-500">or</span>
      </h2>
      <PillButton
        className="bg-[#3B5998] text-white mb-3 hover:bg-[#2f477a]"
        text="Continue with Facebook"
        icon={<FacebookSVG/>}
        onClick={() => console.log("Doesn't do anything yet")}
      />
      <PillButton
        className="bg-white border border-[#676767] text-black hover:bg-[#dddddd]"
        text="Continue with Google"
        icon={<GoogleSVG/>}
        onClick={() => console.log("Doesn't do anything yet")}
      />
      <hr className="my-5 w-[24rem] border-t-gray-300" />
      <p className="text-center">
        Already have an account?{" "}
        <Link
          to="/login"
          className="underline underline-offset-2 text-blue-500 transition duration-150 ease-in-out hover:text-blue-800 focus:text-blue-800 active:text-blue-900"
        >
          Log in
        </Link>
      </p>
    </>
  );
};

export default IDForm;
