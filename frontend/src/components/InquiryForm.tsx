import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import Instance from "../axios/instance";
import DateInput from "./DateInput";

const inquirySchema = Yup.object().shape({
  id: Yup.string()
    .matches(/^[\d]+$/, "ID can only contain numbers")
    .min(3, "ID need to be at least 3 characters"),
  name: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Name should only contain English letters")
    .min(2, "Please enter at least 2 characters"),
  phoneNo: Yup.string().matches(
    /^[\d]*$/,
    "Number can only contain digits (0-9)"
  ),
  joinFrom: Yup.date().typeError("Not a valid date"),
  joinTo: Yup.date().typeError("Not a valid date"),
});

const InquiryForm = () => {
  const dateConstructor = new Date();

  const currentDateString = dateConstructor.toISOString().split("T")[0];

  const prevYear = dateConstructor.getFullYear() - 1;

  const baseDate = dateConstructor.setFullYear(prevYear);

  const baseDateString = new Date(baseDate).toISOString().split("T")[0];

  const initialValues = {
    id: "",
    phoneNo: "",
    name: "",
    joinFrom: baseDateString,
    joinTo: currentDateString,
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={inquirySchema}
      onSubmit={(values) => {
        Instance.post("", values);
      }}
    >
      {() => (
        <Form className="flex flex-row w-full">
          <div className="grid w-full font-semibold gap-3 mx-1">
            <div className="col-span-full grid grid-cols-3 gap-3 gap-y-3">
              <div className="col-span-1">
                <span className="self-center">ID:</span>
                <TextInput
                  type="text"
                  label=""
                  name="id"
                  className="flex-grow self-end"
                />
              </div>
              <div className="col-span-2">
                <span className="self-center">Name:</span>
                <TextInput
                  type="text"
                  label=""
                  name="name"
                  className="flex-grow self-end"
                />
              </div>
            </div>
            <div className="col-span-full">
              <TextInput
                type="number"
                label="Phone Number:"
                name="phoneNo"
                className="flex-grow self-end"
              />
            </div>
            <div className="col-span-full grid grid-cols-2 gap-3">
              <DateInput label="From:" name="joinFrom" />
              <DateInput label="To:" name="joinTo" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default InquiryForm;
