import {createContext, ReactNode, useContext, useReducer} from 'react';
import {getCookie, removeCookie, setCookie} from "../utils/Cookie";
import Toast from "../components/Toast";
import {AUTH_ACTIONS} from "../libs/constants/auth.ts";
import {
    AuthAction,
    AuthContextType,
    AuthState,
    ToastAction,
    ToastContextType,
    ToastState,
    ToastType
} from "../libs/types/types.ts";


// Reducers
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case AUTH_ACTIONS.LOGIN:
            setCookie("authToken", action.payload, {path: '/'});
            return {isLoggedIn: true};
        case AUTH_ACTIONS.LOGOUT:
            removeCookie("authToken");
            return {isLoggedIn: false};
        default:
            return state;
    }
};

const toastReducer = (state: ToastState, action: ToastAction): ToastState => {
    switch (action.type) {
        case 'SHOW_TOAST':
            return {
                visible: true,
                message: action.payload.message,
                type: action.payload.type
            };
        case 'HIDE_TOAST':
            return {
                visible: false,
                message: '',
                type: 'success'
            };
        default:
            return state;
    }
};

// Context
const AuthContext = createContext<AuthContextType | null>(null);
const ToastContext = createContext<ToastContextType | null>(null);

// Provider Props
interface ProviderProps {
    children: ReactNode;
}

export function AppProvider({children}: ProviderProps) {
    const [authState, authDispatch] = useReducer(authReducer, {
        isLoggedIn: Boolean(getCookie("authToken"))
    });

    const [toastState, toastDispatch] = useReducer(toastReducer, {
        visible: false,
        message: '',
        type: 'success'
    });

    const login = (token: string) => {
        authDispatch({type: AUTH_ACTIONS.LOGIN, payload: token});
    };

    const logout = () => {
        authDispatch({type: AUTH_ACTIONS.LOGOUT});
    };

    const showToast = (message: string, type: ToastType = 'success') => {
        toastDispatch({
            type: 'SHOW_TOAST',
            payload: {message, type}
        });
    };

    const hideToast = () => {
        toastDispatch({type: 'HIDE_TOAST'});
    };

    return (
        <AuthContext.Provider value={{
            isLoggedIn: authState.isLoggedIn,
            login,
            logout
        }}>
            <ToastContext.Provider value={{
                showToast,
                hideToast
            }}>
                {toastState.visible && (
                    <Toast
                        message={toastState.message}
                        type={toastState.type}
                        onClose={hideToast}
                    />
                )}
                {children}
            </ToastContext.Provider>
        </AuthContext.Provider>
    );
}

// Hooks
export function useAuth() : AuthContextType {
    return useContext(AuthContext) as AuthContextType;
}

export function useToast() : ToastContextType {
    return useContext(ToastContext) as ToastContextType;
}