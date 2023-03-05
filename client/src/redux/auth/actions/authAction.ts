import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../api/axiosConfig';
import { LoginFormType } from '../../../auth/LoginForm';
import { SignUpFormType } from '../../../auth/SignupForm';
import { loginAction, logoutAction, registerAction } from '../../constant';

type AuthError = {
    msg: string;
    status: number;
}

type AuthResponse = {
    message: string;
    status: number;
    user: any;
}
const login = createAsyncThunk < AuthResponse, any, {rejectValue: AuthError} >(loginAction, async (user :LoginFormType, {rejectWithValue}) => {
    try {

        const response :any= await axios.post('/login', user)
        if (response.status === 200) {
            return {
                message: response.data,
                status: response.status,
                user: response.data.user
            }
        }
        return rejectWithValue({
            msg: response.data,
            status: response.status,
        })
    } catch (error: any) {
        if(error.response && error.response.data) {
           return rejectWithValue({
                msg: error.response.data,
                status: error.response.status,
            })
        }

        return rejectWithValue({
            msg: error.message,
            status: 422,
        })
    }
});

const register = createAsyncThunk<AuthResponse, any, { rejectValue: AuthError }>(registerAction, async (user :SignUpFormType, { rejectWithValue }) => {
    try {
        const response :any= await axios.post('/register', user)
        if (response.status === 201) {
            return {
                message: response.data,
                status: response.status,
                user: response.data.user
            }
        }
        return rejectWithValue({
            msg: response.data,
            status: response.status,
        })
    } catch (error: any) {
        if (error.response && error.response.data) {
            return rejectWithValue({
                msg: error.response.data,
                status: error.response.status,
            })
        }

        return rejectWithValue({
            msg: error.message,
            status: 422,
        })
    }
});


const logout = createAsyncThunk<AuthResponse, void, { rejectValue: AuthError }>(logoutAction,  async (_, { rejectWithValue }) => {
    try {
        const response: any = await axios.post('/logout')
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return {
            message: response.data.message,
            status: 200,
            user: null
        }

    } catch (error: any) {
        return rejectWithValue({
            msg: error.message,
            status: 422,
        })
    }
});

export {
    login,
    register,
    logout
}

