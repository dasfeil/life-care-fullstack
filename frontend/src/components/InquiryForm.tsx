import { Form, Formik } from "formik";
import * as Yup from "yup";
import TextInput from "./TextInput";
import Instance from "../axios/instance";
import DateInput from "./DateInput";
import { useEffect, useState } from "react";

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

type data = {
  userNo: number;
  id: number;
  username: string;
  phoneNo: number;
  email: string;
  joinDate: string;
};

const InquiryForm = () => {
  const dateConstructor = new Date();

  const currentDateString = dateConstructor.toISOString().split("T")[0];

  const prevYear = dateConstructor.getFullYear() - 1;

  const baseDate = dateConstructor.setFullYear(prevYear);

  const baseDateString = new Date(baseDate).toISOString().split("T")[0];

  const [data, setData] = useState<data[]>();

  const [page, setPage] = useState(0);

  const pageSize = 5;

  const initialValues = {
    id: "",
    phoneNo: "",
    username: "",
    joinFrom: baseDateString,
    joinTo: currentDateString,
  };
  useEffect(() => {
    Instance.post("/manage/inquiry", {...initialValues});
  }, []);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={inquirySchema}
        onSubmit={(values) => {
          Instance.post("/manage/inquiry", {
            ...values,
            page: page,
            size: pageSize,
          });
        }}
      >
        {() => (
          <Form className="flex flex-row w-full">
            <div className="grid w-full grid-cols-3 font-semibold gap-3 mx-1">
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
                    name="username"
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
              <div className="col-span-2 col-start-2 flex justify-between mx-2">
                <button
                  type="submit"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 me-2 mb-2"
                >
                  Inquiry
                </button>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 me-2 mb-2"
                >
                  Excel
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <div className="w-full border border-1">
        <div className="relative overflow-x-auto shadow-md rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Membership Number
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Join date
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-white even:bg-gray-50 border-b">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  Bruh
                </th>
                <td className="px-6 py-4">Silver</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default InquiryForm;
