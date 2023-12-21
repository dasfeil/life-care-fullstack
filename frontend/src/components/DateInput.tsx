import { FieldHookConfig, useField } from "formik";
import { useId, ComponentProps } from "react";

const DateInput = ({
  disableError,
  label,
  ...props
}: Props) => {
  const id = useId();
  const [field, meta] = useField(props);
  const {touched, error} = meta

  return (
    <label htmlFor={id} className={"group flex flex-col " + props.className}>
      <span className="font-semibold">{label}</span>
      <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 flex has-[:disabled]:bg-gray-300 has-[:disabled]:border-gray-800">
        <input
          id={id}
          type="date"
          {...field}
          {...props}
          autoComplete="off"
          className={"w-full outline-none bg-transparent"}
        />
      </div>
      {touched && !disableError && error && (
        <div className="text-red-500">{error}</div>
      )}
    </label>
  );
};

type Props = ComponentProps<"input"> &
  FieldHookConfig<string> & {
    label: string;
    disableError?: boolean
  };

export default DateInput;
