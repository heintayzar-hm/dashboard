import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { getUser } from "../redux/auth/actions/authAction";

import { AppDispatch, RootState } from "../redux/configureStore"

const RequiredAuth = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.rootReducer.authReducer)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    useEffect(() => {
      if (user.error == null && user.user == null && !user.loading) {
        dispatch(getUser())
      }
        if(user.error != null && user.user == null && !user.loading) {
            navigate('/login')
        }
    }, [user])
    return (
        <>{children}</>
    )
}

export default RequiredAuth
