import {useEffect, useState} from 'react';
import {ToastType} from "../libs/types/types.ts";
import CheckMarkSuccessIcon from "./icon/CheckMarkSuccessIcon.tsx";
import CrossIconError from "./icon/CrossIconError.tsx";

type ToastProps = {
    message: string,
    duration?: number,
    onClose: () => void;
    type: ToastType;
}

const Toast = ({message, onClose, type = "success"}: ToastProps) => {
    const [isVisible, setIsVisible] = useState(true);

    const duration = 3000;

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setIsVisible(false);
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose?.();
        }, 300);
    };

    if (!isVisible && !message) return null;

    return (
        <div
            className={`
                flex fixed top-[80px] right-14 items-center w-full max-w-xs p-4 mb-4 
                text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 
                dark:bg-gray-800 transition-all duration-300 ease-in-out
                ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}
            `}
            role="alert"
        >
            <div
                className={`inline-flex items-center justify-center flex-shrink-0 w-8 h-8 ${type === 'success' ? "text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200 " : "text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200 "}  rounded-lg `}>
                {type === 'success' ?
                    <CheckMarkSuccessIcon/> : <CrossIconError/>
                }
            </div>
            <div
                className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500  rounded-lg ">

            </div>
            <div className="ms-3 text-sm font-normal">{message}</div>
            <button
                type="button"
                onClick={handleClose}
                className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    );
};

export default Toast;