import { RiLoginBoxFill } from "react-icons/ri";
import { AiFillEyeInvisible } from "react-icons/ai";
import {AiFillEye} from "react-icons/ai"
import { Formik } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/actions/authAction";
import type { AppDispatch, RootState } from "../redux/configureStore";
const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').max(50, 'Too Long!').required('Required')
});
interface LoginFormType {
    email: string;
    password: string;
}

export type {
    LoginFormType,
}

const LoginForm = () => {
    const initialValues: LoginFormType = { email: "", password: "" };
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const handleEye = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        setShowPassword(!showPassword)
    }
    const user = useSelector((state: RootState) => state.rootReducer.authReducer)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
            try {
                await dispatch(login(values))
            } catch (error) {
                console.log(error)
            }
          }}
        validationSchema={LoginSchema}
    >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit
                } = props;
                return (
                    <form className="flex gap-5 flex-col justify-evenly items-center h-full text-white" onSubmit={handleSubmit}>
                        <h1 className="text-lg sm:text-2xl font-bold italic">Please fill this form to login</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-3 ">
                            <span className="font-semibold sm:py-0 py-3  sm:text-center col-span-1 sm:m-auto">Email: </span>

                            <input
                                id="email"
                                required
                                type="email"
                                placeholder="Please Enter your Email"
                                className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="email" />

                        </div>
                        {errors.email && touched.email ? <div className="text-red-400 font-bold">{errors.email}</div> : null}

                        <div className="grid grid-cols-1 sm:grid-cols-3">
                            <span className="font-semibold  sm:py-0 py-3 text-start sm:text-center sm:m-auto col-span-1">Password:  </span>

                            <div className="flex relative">
                            <input
                                id="password"
                                    required
                                type={showPassword ? "text" : "password"}
                                placeholder="Please Enter Password"
                                className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <button type="button" onClick={handleEye} className="text-black right-3 top-3 absolute">
                                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                            </button>
                            </div>
                        </div>
                        {errors.password && touched.password ? <div className="text-red-400 font-bold">{errors.password}</div> : null}
                        {user && user.error ? <div className="text-red-400 font-bold">{user.error.msg}</div> : null}
                        <button type="submit"
                            className={(user.loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-400 hover:bg-blue-500") +  " flex gap-2 justify-center items-center rounded-md p-2 sm:p-3"}
                            disabled={isSubmitting}>
                            Login
                            <RiLoginBoxFill />
                        </button>
                        <Link to="/signup" className="underline italic hover:text-black">Don't have an account?</Link>
                    </form>
                )
            }}
    </Formik>
    )
};

export default LoginForm;
