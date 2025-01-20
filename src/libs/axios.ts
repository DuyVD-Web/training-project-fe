import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import {
  ErrorResponse,
  RequestMethod,
  SuccessResponse,
} from "@/libs/types/types.ts";
import { getCookie } from "@/utils/Cookie.ts";

const instance = axios.create({
  timeout: import.meta.env.VITE_TIME_OUT_REQUEST,
  baseURL: import.meta.env.VITE_BASE_URL_API,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getCookie("authToken");
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
    return Promise.reject(error);
  }
);

const baseRequest = async (
  method: RequestMethod,
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  try {
    if (!config) {
      config = {};
    }
    const response = await instance({
      ...config,
      method: method,
      url: url,
      data: data,
    });

    return response.data;
  } catch (e) {
    const error = e as AxiosError<ErrorResponse>;
    const requestError: ErrorResponse = { status: false };

    if (error.response) {
      // Server responded with an error
      const errorData = error.response.data;
      requestError.status = errorData.status;
      requestError.message = errorData.message;
      requestError.errors = errorData.errors || {};
      requestError.code = errorData.code || error.response.status;
    } else {
      requestError.status = false;
      requestError.message = error.message || "Network error occurred";
      requestError.code = error.code || 500;
    }
    return requestError;
  }
};

export const apiRequest = async <T>(
  method: RequestMethod,
  url: string,
  data?: object,
  config?: AxiosRequestConfig
) => {
  const response = await baseRequest(method, url, data, config);
  return response.status
    ? (response as SuccessResponse<T>)
    : (response as ErrorResponse);
};

export default baseRequest;
