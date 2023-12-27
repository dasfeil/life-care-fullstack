import { useState } from "react";
import PillButton from "../PillButton";
import TextInput from "../TextInput";
import { useFormikContext } from "formik";
import BackButtonSVG from "../svgs/BackButtonSVG";

const DetailForm = ({ handleBack }: Props) => {
  const { submitForm, errors, setFieldValue } = useFormikContext<{
    name: String;
    phoneNo: String;
    email: String;
    emailDomain: String;
  }>();

  const options = [
    "naver.com",
    "daum.net",
    "gmail.com",
    "nate.com",
    "hotmail.com",
  ];

  const [dropdown, setDropdown] = useState(false);

  const [domainSelected, setDomainSelected] = useState(false);

  const [currentDomain, setCurrentDomain] = useState("");

  return (
    <div className="w-[20rem]">
      <div className="flex h-12 items-center gap-2">
        <BackButtonSVG width={20} height={32} onClick={() => handleBack()} />
        <p className="">More details</p>
      </div>
      <TextInput
        type="text"
        name="name"
        label="Username"
        placeholder="Username"
        className="w-[20rem]"
      />
      <TextInput
        type="number"
        name="phoneNo"
        label="Phone Number"
        placeholder=""
        className="w-[20rem]"
      />
      <div className="grid md:grid-cols-9 grid-cols-7 items-end gap-1">
        <TextInput
          type="text"
          name="email"
          label="Email"
          placeholder=""
          disableError
          className="col-span-3 md:col-span-4"
        />
        <span className="p-2 text-center col-span-1">@</span>
        <TextInput
          label=""
          type="text"
          name="emailDomain"
          disabled={domainSelected}
          placeholder=""
          disableError
          className="col-span-3"
        />

        <div
          className="flex col-span-1 md:col-start-auto col-start-6 relative justify-center rounded-md bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 w-[2rem] h-[2rem] m-[0.3125rem]"
          onClick={() => {
            setDropdown((state) => (state = !state));
          }}
        >
          <svg
            className="h-5 w-5 text-gray-400 self-center"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
          {dropdown && (
            <div
              className={
                "absolute left-0 top-full mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-[10rem]"
              }
            >
              <div className="py-2 text-sm text-gray-700">
                {options.map((option) => (
                  <div
                    className={`block px-4 py-2 hover:bg-gray-100 ${currentDomain == option ? "bg-gray-200" : ""}`}
                    key={option}
                    onClick={() => {
                      setDomainSelected(true);
                      setCurrentDomain(option);
                      setFieldValue("emailDomain", option);
                    }}
                  >
                    {option}
                  </div>
                ))}
                <div
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setDomainSelected(false);
                    setCurrentDomain("");
                    setFieldValue("emailDomain", "");
                  }}
                >
                  --OTHER--
                </div>
              </div>
            </div>
          )}
        </div>
        {errors.email && (
          <div className="text-red-500 col-span-full">
            {<>{errors.email}</>}
          </div>
        )}
        {errors.emailDomain && (
          <div className="text-red-500 col-span-full">
            {<>{errors.emailDomain}</>}
          </div>
        )}
      </div>
      <PillButton
        type="button"
        onClick={submitForm}
        text="Sign Up"
        className="mt-10 text-[#ffff] bg-[#363d61] hover:bg-[#4f598d]"
      />
    </div>
  );
};

type Props = {
  handleBack: Function;
};

export default DetailForm;
