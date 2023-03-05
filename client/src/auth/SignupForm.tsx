import { AiFillEyeInvisible } from "react-icons/ai";
import {AiFillEye} from "react-icons/ai"
import { SiGnuprivacyguard } from "react-icons/si";
import { Formik } from "formik";

import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/configureStore";
import { logout, register } from "../redux/auth/actions/authAction";
interface SignUpFormType {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
}

export type {
    SignUpFormType,
}

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid Email").required("Email is Required"),
  password: Yup.string()
    .min(8, "Password is Too Short!")
    .max(50, "Password is Too Long!")
    .required("Password is Required"),
  name: Yup.string()
    .min(3, "Name is Too Short!")
    .max(50, "Name is Too Long!")
    .required("Name is Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password confirmation is Required"),
});

const SignupForm = () => {
  const initalValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
    const user = useSelector((state: RootState) => state.rootReducer.authReducer)
    const dispatch = useDispatch<AppDispatch>()
  return (
    <Formik
      initialValues={initalValues}
      onSubmit={async (values, actions) => {
          try {
            await dispatch(register(values))
        } catch (error :any) {
           throw new Error(error)
        }
      }}
      validationSchema={SignUpSchema}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;

        return (
          <form
            className="flex sm:gap-5 flex-col justify-evenly items-center h-full text-white"
            onSubmit={handleSubmit}
          >
            <h1 className="text-lg sm:text-2xl font-bold italic">
              Let's Get Started
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 ">
              <span className="font-semibold sm:py-0 py-3  sm:text-center col-span-1 sm:m-auto">
                Username:{" "}
              </span>

                    <div>
                    <input
                required
                type="text"
                placeholder="Please Enter your Name"
                className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 ">
              <span className="font-semibold sm:py-0 py-3  sm:text-center col-span-1 sm:m-auto">
                Email:{" "}
              </span>

                    <div>
                    <input
                required
                type="email"
                placeholder="Please Enter your Email"
                className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
             </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 mb-2">
              <span className="font-semibold  sm:py-0 py-3 text-start sm:text-center sm:m-auto col-span-1">
                Password:{" "}
              </span>

                    <div className="flex relative">
                    <input
                required
                type={showPassword ? "text" : "password"}
                placeholder="Please Enter Password"
                className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                        />
                        <button type="button" onClick={() => (setShowPassword(!showPassword))} className="text-black right-3 top-3 absolute">
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 mb-2">
              <span className="font-semibold  sm:py-0 py-3 text-start sm:text-center sm:m-auto col-span-1 text-warp">
                Confirm <br />
                Password:{" "}
              </span>

                    <div className="flex relative">
                    <input
                required
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Please Confirm Your Password"
                className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3"
                name="confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                        />
                         <button type="button" onClick={() => (setShowConfirmPassword(!showConfirmPassword))} className="text-black right-3 top-3 absolute">
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
              </div>
            </div>
            {errors.email && touched.email ? (
              <div className="text-red-400 font-bold">{errors.email}</div>
            ) : null}
            {errors.password && touched.password ? (
              <div className="text-red-400 font-bold">{errors.password}</div>
            ) : null}
            {errors.name && touched.name ? (
              <div className="text-red-400 font-bold">{errors.name}</div>
            ) : null}
            {errors.confirmPassword && touched.confirmPassword ? (
              <div className="text-red-400 font-bold">
                {errors.confirmPassword}
              </div>
                ) : null}
            {user.error && <div className="text-red-400 font-bold">{user.error.msg}</div>}
            <button
              type="submit"
              className={(user.loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500") +  " my-2 flex gap-2 justify-center items-center rounded-md p-2 sm:p-3"}
              disabled={isSubmitting}
            >
              Get Started
              <SiGnuprivacyguard />
            </button>
            <Link to="/login" className="underline italic hover:text-black ">
              Already have an account?
            </Link>
          </form>
        );
      }}
    </Formik>
  );
};

export default SignupForm;
