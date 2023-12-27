import PillButton from "../PillButton";
import TextInput from "../TextInput";
import { useFormikContext } from "formik";
import BackButtonSVG from "../svgs/BackButtonSVG";

const PasswordForm = ({ handleBack }: Props) => {
  const { submitForm } = useFormikContext();
  return (
    <div>
      <div className="flex h-12 items-center gap-2">
        <BackButtonSVG width={20} height={32} onClick={() => handleBack()} />
        <p className="">Create a password</p>
      </div>
      <TextInput
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        className="w-[20rem]"
      />
      <p className="w-[20rem] text-[0.7rem] text-gray-400 my-1">
        English case/uppercase/special/numeric
        <br />
        2 combinations (10-20 characters)
        <br />
        3 combinations (8-20 characters)
        <br />
        Consecutive number not allowed
      </p>
      <TextInput
        type="password"
        name="rPassword"
        label="Re-type Password"
        placeholder="Password"
        className="w-[20rem]"
      />
      <PillButton
        type="button"
        onClick={submitForm}
        text="Continue"
        className="mt-10 text-[#ffff] bg-[#363d61] hover:bg-[#4f598d]"
      />
    </div>
  );
};

type Props = {
  handleBack: Function;
};

export default PasswordForm;
