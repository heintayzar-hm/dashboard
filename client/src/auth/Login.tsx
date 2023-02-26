import { Link } from "react-router-dom";
import login_background from "../assets/login_background.jpg";

const Login = () => {
  return (
    <section className="section">
      <img
        src={login_background}
        alt="login_background"
        className="h-screen object-cover w-full"
      ></img>
      <div className=" inset-0 absolute w-screen mt-16 flex justify-center items-center">
        <div className="sm:p-10 rounded-xl p-3 h-[350px] bg-[rgba(115,115,115,0.8)]">
          <div className="w-full h-full">
            <form className="flex flex-col justify-evenly items-center h-full text-white">
              <h1 className="text-lg sm:text-2xl font-bold italic">Please fill this form to login</h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 ">
                <span className="font-semibold sm:py-0 py-3  sm:text-center col-span-1 sm:m-auto">Email:  </span>

                <input required type="email" placeholder="Please Enter your Email" className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3" name="username" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3">
                <span className="font-semibold  sm:py-0 py-3 text-start sm:text-center sm:m-auto col-span-1">Password:  </span>

                <input required type="password" placeholder="Please Enter Password" className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3" name="password"/>
              </div>
                {/* <span>Error</span> */}
                <button type="submit" className="italic font-semibold bg-black px-4 py-1 hover:bg-slate-500 rounded-md">Login</button>
                <Link to="/signup" className="underline italic hover:text-black">Don't have an account?</Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
