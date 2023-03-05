import PropTypes from 'prop-types';
import login_background from "../assets/login_background.jpg";

interface LayoutAuthProps {
    children: React.ReactNode;
  }

const LayoutAuth = ({children} :LayoutAuthProps) => {
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
    {children}
        </div>
      </div>
    </div>
  </section>
  );
};

LayoutAuth.defaultProps = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
      ]).isRequired

}

export default LayoutAuth;
