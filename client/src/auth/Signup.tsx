import { Link } from "react-router-dom";
import login_background from "../assets/login_background.jpg";

const SignUp = () => {
    return (
        <section className="section">
        <img
          src={login_background}
          alt="login_background"
          className="h-screen object-cover w-full"
        ></img>
        <div className=" inset-0 absolute w-screen mt-16 flex justify-center items-center">
          <div className="sm:p-10 rounded-xl p-3 h-auto bg-[rgba(115,115,115,0.8)]">
            <div className="w-full h-full">
              <form className="flex sm:gap-5 flex-col justify-evenly items-center h-full text-white">
                            <h1 className="text-lg sm:text-2xl font-bold italic">Let's Get Started</h1>

                            <div className="grid grid-cols-1 sm:grid-cols-3 ">
                  <span className="font-semibold sm:py-0 py-3  sm:text-center col-span-1 sm:m-auto">Username:  </span>

                  <input required type="text" placeholder="Please Enter your Name" className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3" name="username" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 ">
                  <span className="font-semibold sm:py-0 py-3  sm:text-center col-span-1 sm:m-auto">Email:  </span>

                  <input required type="email" placeholder="Please Enter your Email" className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3" name="username" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 mb-2">
                  <span className="font-semibold  sm:py-0 py-3 text-start sm:text-center sm:m-auto col-span-1">Password:  </span>

                  <input required type="password" placeholder="Please Enter Password" className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3" name="password"/>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 mb-2">
                  <span className="font-semibold  sm:py-0 py-3 text-start sm:text-center sm:m-auto col-span-1 text-warp">Confirm <br />Password:  </span>

                  <input required type="password" placeholder="Please Confirm Your Password" className="text-black rounded-md focus:outline-none col-span-2 italic p-2 sm:p-3" name="password"/>
                </div>
                  {/* <span>Error</span> */}
                <button type="submit" className="mt-2 italic font-semibold bg-black px-4 py-1 hover:bg-slate-500 rounded-md">Get Started</button>
                <Link to="/login" className="underline italic hover:text-black">Already have an account?</Link>

                        </form>
            </div>
          </div>
        </div>
      </section>
    )
}

export default SignUp
