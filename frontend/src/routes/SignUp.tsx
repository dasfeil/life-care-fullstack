import * as Yup from "yup";
import { Form } from "react-router-dom";
import { useState } from "react";
import { Formik, FormikHelpers, FormikValues } from "formik";
import IDForm from "../components/signUpForms/IDForm";
import PasswordForm from "../components/signUpForms/PasswordForm";
import DetailForm from "../components/signUpForms/DetailForm";

const signUpSchema = [
  Yup.object().shape({
    id: Yup.string()
      .matches(/.{4,}/, "ID must be 4 digits or more")
      .matches(/^\d+$/, "ID must be only number")
      .required("ID is required"),
  }),
  Yup.object().shape({
    password: Yup.string()
      .matches(
        /^[a-zA-Z\d!@#$%^&*]*$/,
        "Only English letters, numbers, and special characters (!@#$%^&*) are allowed"
      )
      .test(
        "password-length-2",
        "Password length is invalid",
        function (value) {
          if (value?.match(/^(?=.*[A-Za-z])(?=.*\d).*$/))
            return value.length >= 10 && value.length <= 20;
          else if (value?.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*]).*$/))
            return value.length >= 8 && value.length <= 20;
        }
      )
      .test(
        "consecutive-number",
        "Cannot use consecutive numbers in password",
        function (value) {
          let combs = [
            "012",
            "123",
            "234",
            "345",
            "456",
            "567",
            "678",
            "789",
            "890",
            "987",
            "876",
            "765",
            "654",
            "543",
            "432",
            "321",
            "210",
          ];
          let tempValue = value?.match(/\d{3,}/g);
          let valid = true;
          if (tempValue) {
            tempValue.forEach((element) => {
              combs.forEach((comb) => {
                if (element.toString().includes(comb)) {
                  console.log(comb);
                  valid = false;
                }
              });
            });
          }
          return valid;
        }
      )
      .required("Password is required"),
    rPassword: Yup.string().test(
      "passwords-match",
      "Passwords must match",
      function (value) {
        return this.parent.password === value;
      }
    ),
  }),
  Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Name should only contain English letters")
      .required("Name is required"),
    phoneNo: Yup.string()
      .matches(/^[\d]*$/, "Number can only contain digits (0-9)")
      .required("Phone number is required"),
    email: Yup.string()
      .matches(/^[\w.!@#$%^&*]+$/, "Email is not valid")
      .required("Email is required"),
    emailDomain: Yup.string()
      .matches(/^([\w-]+\.)+[\w-]{2,4}$/, "Invalid domain")
      .required("Email domain is required"),
  }),
];

const initialValues = {
  id: "",
  name: "",
  password: "",
  rPassword: "",
  email: "",
  emailDomain: "",
  phoneNo: "",
};

function renderFormStep(step: number, handleBack: Function) {
  switch (step) {
    case 0:
      return <IDForm />;
    case 1:
      return <PasswordForm handleBack={handleBack} />;
    case 2:
      return <DetailForm handleBack={handleBack} />;
    default:
      return <div>Not Found</div>;
  }
}

const steps = 2;

export default function SignUp() {
  const [step, setStep] = useState(0);
  const currentSchema = signUpSchema[step];
  const lastStep = step === steps;

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<typeof initialValues>
  ) => {
    if (lastStep) {
      console.log(values);
    } else {
      setStep((state) => state + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  const handleBack = () => {
    setStep((state) => (state = state - 1));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={currentSchema}
      onSubmit={async (values, helpers) => {
        helpers.validateForm().then(() => {
          handleSubmit(values, helpers);
        });
      }}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {() => (
        <Form className="mt-24 min-h-screen flex flex-col items-center">
          {renderFormStep(step, handleBack)}
        </Form>
      )}
    </Formik>
  );
}
