import { loginAction, authState, registerAction, logoutAction, validateUserAction } from "../constant";

interface AuthState {
    user: any;
    loading: boolean;
    error: any;
    serverError: any;
}

const [success, waiting, fail] = authState;
const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
    serverError: null
};
const auth = (state = initialState, action: any) => {
    console.log(action, loginAction + success)
    switch (action.type) {
        case loginAction + success:
            return { user: action.payload, loading: false, error: null, serverError: null }
        case loginAction + fail:
            return { user: null, loading: false, error: action.payload , serverError: null};
        case loginAction + waiting:
            return { user: null, loading: true, error: null, serverError: null };
        case registerAction + success:
            return { user: action.payload, loading: false, error: null, serverError: null }
        case registerAction + fail:
            return { user: null, loading: false, error: action.payload , serverError: null};
        case registerAction + waiting:
            return { user: null, loading: true, error: null , serverError: null};
        case logoutAction + success:
            return { user: null, loading: false, error: null , serverError: null}
        case logoutAction + fail:
            return { user: null, loading: false, error: null, serverError: action.payload };
        case validateUserAction + success:
            return { user: action.payload, loading: false, error: null , serverError: null}
        case validateUserAction + fail:
            return { user: null, loading: false, error: null , serverError: action.payload};
        default:
            return state;
    }
};

export default auth;

export type { AuthState }
