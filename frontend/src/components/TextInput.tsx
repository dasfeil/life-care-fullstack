import { FieldProps } from "formik";
import { useId, ComponentProps, useState } from "react";
import PasswordHide from "./svgs/PasswordHideSVG";
import PasswordShow from "./svgs/PasswordShowSVG";
const TextInput = ({
  type,
  field,
  form: { touched, errors },
  label,
  ...props
}: Props) => {
  const id = useId();
  const [inputType, setType] = useState(type);
  const pwdIcon = inputType == "password" ? <PasswordHide /> : <PasswordShow />;
  const onclickHandler = () => {
    setType((state) => {
      if (state == "password") return "text";
      else return "password";
    });
  };
  return (
    <label htmlFor={id} className={"flex flex-col w-full " + props.className}>
      <span className="font-semibold">{label}</span>
      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 flex">
        <input
          id={id}
          type={inputType}
          {...field}
          {...props}
          className={"w-full outline-none bg-inherit"}
        />
        {type == "password" ? (
          <i onClick={onclickHandler} className="self-center">
            {pwdIcon}
          </i>
        ) : null}
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className="text-red-500">{errors[field.name]?.toString()}</div>
      )}
    </label>
  );
};

type Props = ComponentProps<"input"> &
  FieldProps & {
    label: string;
  };
export default TextInput;
