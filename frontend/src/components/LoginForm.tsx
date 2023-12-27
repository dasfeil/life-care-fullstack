import { Field, Form, Formik } from "formik";
import PillButton from "./PillButton";
import * as Yup from "yup";
import TextInput from "./TextInput";
import { handleLogin } from "../axios/instance";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const loginSchema = Yup.object().shape({
  cred: Yup.string()
    .min(4, "Email or ID has to be 4 or more letters")
    .required("Email or ID is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  cred: "",
  password: "",
  persist: false,
};

const LoginForm = () => {
  const { setAuth } = useAuth();
  const [error, setError] = useState<string[]>();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          await handleLogin(values)
            .then((res) => {
              toast("Login Succeed");
              setAuth({ ...res.data });
              navigate(from, { replace: true });
            })
            .catch((error) => {
              if (typeof error == "string") setError([error]);
              else setError(error);
            });
        }}
      >
        {() => (
          <Form>
            <TextInput
              name="cred"
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
                <Field
                  type="checkbox"
                  name="persist"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ms-3 text-gray-900">Remember me</span>
              </label>
            </div>
            {error &&
              error.map((e) => (
                <p className="text-red-500 text-center" key={e}>
                  {e}
                </p>
              ))}
            <PillButton
              type="submit"
              text="Log In"
              className="mt-10 text-[#ffff] bg-[#363d61] hover:bg-[#4f598d]"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
