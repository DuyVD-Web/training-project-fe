import axios, {AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig} from 'axios'
import {ErrorResponse, RequestMethod} from "./commons.ts";
import Cookies from "universal-cookie";
import {NavigateFunction} from "react-router";


const instance = axios.create({
    timeout: import.meta.env.VITE_TIME_OUT_REQUEST,
    baseURL: import.meta.env.VITE_BASE_URL_API,
})
// TODO: Store in somewhere else
const cookies = new Cookies();

let navigateFunc: NavigateFunction;

instance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const token = cookies.get('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    async (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    async (response) => Promise.resolve(response),
    async (error: AxiosError) => {
        // Handle 401 Unauthorized error
        if (error.response?.status === 401) {

            cookies.remove('authToken');
            navigateFunc('/login');
        }

        return Promise.reject(error);
    }
);


const baseRequest = async (
    method: RequestMethod,
    url: string,
    data?: object,
    config?: AxiosRequestConfig,
) => {
    try {
        const response = await instance({
            ...config,
            method: method,
            url: url,
            data: data
        });

        return response.data;
    } catch (e) {
        const error = e as AxiosError<ErrorResponse>;
        const requestError: ErrorResponse = {};
        if (error.response) {
            // Server responded with an error
            const errorData = error.response.data;
            requestError.status = errorData.status;
            requestError.message = errorData.message;
            requestError.errors = errorData.errors || {};
            requestError.code = errorData.code || error.response.status;

        } else {
            requestError.status = false;
            requestError.message = error.message || 'Network error occurred';
            requestError.code = error.code || 500;
        }
        return Promise.reject(requestError)
    }
};

export default baseRequest;