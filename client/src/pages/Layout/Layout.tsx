import PropTypes from 'prop-types';
import RequiredAuth from '../../auth/RequiredAuth';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../redux/configureStore';
import { useDispatch } from 'react-redux';
import {  logout } from '../../redux/auth/actions/authAction';
interface LayoutProps {
    children: React.ReactNode;
  }

const Layout = ({ children }: LayoutProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const logoutHandler = () => {
        dispatch(logout())
        const navigate = useNavigate();
        navigate('/login')
    }
  return (
      <main>
          <>
             <button type='button' onClick={logoutHandler}>Logout</button>
          {children}
          </>
   </main>
  );
};

Layout.defaultProps = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
      ]).isRequired

}

export default Layout;
