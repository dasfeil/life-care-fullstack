import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import { formData as data } from "../types";

const inquirySchema = Yup.object().shape({
  id: Yup.string()
    .matches(/^[\d]+$/, "ID can only contain numbers")
    .min(3, "ID need to be at least 3 characters"),
  username: Yup.string()
    .matches(/^[a-zA-Z]+$/, "Name should only contain English letters")
    .min(2, "Please enter at least 2 characters"),
  phoneNo: Yup.string().matches(
    /^[\d]*$/,
    "Number can only contain digits (0-9)"
  ),
  joinFrom: Yup.date().typeError("Not a valid date"),
  joinTo: Yup.date().typeError("Not a valid date"),
});

type Props = {
  initialValues: data;
  handleSubmit: Function;
  toExcel: Function;
};

const InquiryForm = ({ initialValues, handleSubmit, toExcel }: Props) => {
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={inquirySchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(actions) => (
          <Form className="flex flex-row w-full md:w-[90%]">
            <div className="grid w-full grid-cols-10 md:grid-cols-5 font-semibold gap-3 mx-1">
              <div className="col-span-full md:col-span-5 md:grid-cols-5 grid grid-cols-10 gap-3 gap-y-3">
                <div className="col-span-4 col-start-2 md:col-start-1 md:col-span-2">
                  <TextInput
                    type="text"
                    label="ID:"
                    name="id"
                    className="flex-grow self-end"
                  />
                </div>
                <div className="col-span-4 col-end-10 md:col-end-5 md:col-span-2">
                  <TextInput
                    type="text"
                    label="Name:"
                    name="username"
                    className="flex-grow self-end"
                  />
                </div>
              </div>
              <div className="col-start-2 col-span-8 md:col-span-2 md:col-start-1">
                <TextInput
                  type="number"
                  label="Phone Number:"
                  name="phoneNo"
                  className="flex-grow self-end"
                />
              </div>
              <div className="col-span-8 col-start-2 grid grid-cols-2 gap-3 md:col-span-2">
                <DateInput label="From:" name="joinFrom" />
                <DateInput label="To:" name="joinTo" />
              </div>
              <div className="col-span-full flex justify-center md:col-end-5 md:col-span-2">
                <button
                  onClick={() => actions.submitForm()}
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 me-2 mb-2"
                >
                  Inquiry
                </button>
                <button
                  onClick={() => toExcel()}
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 mb-2"
                >
                  Excel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default InquiryForm;
