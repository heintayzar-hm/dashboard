import { loginAction, authState, registerAction, logoutAction } from "../constant";

interface AuthState {
    user: any;
    loading: boolean;
    error: any;
}

const [success, waiting, fail] = authState;
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};
const auth = (state = initialState, action: any) => {
    console.log(action, loginAction + success)
    switch (action.type) {
        case loginAction + success:
            return { user: action.payload, loading: false, error: null }
        case loginAction + fail:
            return { user: null, loading: false, error: action.payload };
        case loginAction + waiting:
            return { user: null, loading: true, error: null };
        case registerAction + success:
            return { user: action.payload, loading: false, error: null }
        case registerAction + fail:
            return { user: null, loading: false, error: action.payload };
        case registerAction + waiting:
            return { user: null, loading: true, error: null };
        case logoutAction + success:
            return { user: null, loading: false, error: null }
        case logoutAction + fail:
                return {user: null,loading:false, error: null}
        default:
            return state;
    }
};

export default auth;

export type { AuthState }
