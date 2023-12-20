import { Field, Form, Formik } from "formik";
import PillButton from "./PillButton";
import * as Yup from "yup";
import TextInput from "./TextInput";
import Instance from "../axios/instance";

const LoginSchema = Yup.object().shape({
  id: Yup.string()
    .min(4, "Email or ID has to be 4 or more letters")
    .required("Email or ID is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
    id: "",
    password: "",
    remember: false,
  }

const LoginForm = () => {

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        Instance.post('/login', values).then(console.log)
      }}
    >
      {() => (
        <Form>
          <TextInput
            name="id"
            label="Email or ID"
            placeholder="Email or ID"
            type="text"
          />
          <TextInput
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            className="my-2"
          />
          <div className="my-2">
            <label className="relative inline-flex items-center cursor-pointer">
              <Field type="checkbox" name="remember" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              <span className="ms-3 text-gray-900">Remember me</span>
            </label>
          </div>
          <PillButton
            styleType="none"
            type="submit"
            text="Log In"
            className="mt-10 text-[#ffff] bg-[#363d61] hover:bg-[#4f598d]"
          />
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;