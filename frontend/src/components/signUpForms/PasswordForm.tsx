import PillButton from "../PillButton";
import TextInput from "../TextInput";
import { useFormikContext } from "formik";

const PasswordForm = () => {
    const {submitForm} = useFormikContext();
  return (
    <>
      <TextInput
        type="password"
        name="password"
        label="Password"
        placeholder="Password"
        className="w-[20rem]"
      />
      <TextInput
        type="password"
        name="rPassword"
        label="Re-type Password"
        placeholder="Password"
        className="w-[20rem]"
      />
      <PillButton
        styleType="none"
        onClick={submitForm}
        text="Continue"
        className="mt-10 text-[#ffff] bg-[#363d61] hover:bg-[#4f598d]"
      />
    </>
  );
};

export default PasswordForm;
