import {createContext, ReactNode, useContext, useReducer} from 'react';
import {getCookie, setCookie} from "../utils/Cookie";
import Toast from "../components/Toast";


// Types
type ToastType = "success" | "error";

type AuthState = {
    isLoggedIn: boolean;
};

type AuthAction =
    | { type: 'LOGIN'; payload: string }
    | { type: 'LOGOUT' };

type ToastState = {
    visible: boolean;
    message: string;
    type: ToastType;
};

type ToastAction =
    | { type: 'SHOW_TOAST'; payload: { message: string; type: ToastType } }
    | { type: 'HIDE_TOAST' };

type AuthContextType = {
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
};

type ToastContextType = {
    showToast: (message: string, type: ToastType) => void;
    hideToast: () => void;
};

// Reducers
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN':
            setCookie("authToken", action.payload, {path: '/'});
            return {isLoggedIn: true};
        case 'LOGOUT':
            setCookie("authToken", "", {path: '/', expires: new Date(0)});
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
        authDispatch({type: 'LOGIN', payload: token});
    };

    const logout = () => {
        authDispatch({type: 'LOGOUT'});
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

    const authValue = {
        isLoggedIn: authState.isLoggedIn,
        login,
        logout
    };

    const toastValue = {
        showToast,
        hideToast
    };

    return (
        <AuthContext.Provider value={authValue}>
            <ToastContext.Provider value={toastValue}>
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
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}