import {Link, useNavigate} from "react-router";
import {SubmitHandler, useForm} from "react-hook-form";
import baseRequest from "../../libs/axios.ts";
import {useState} from "react";
import {getCookie} from "../../utils/Cookie.ts";
import {useAuth, useToast} from "../AppProvider.tsx";

type LoginFormInput = {
    email: string;
    password: string;
}

export const Login = () => {
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setError} = useForm<LoginFormInput>();
    const [apiError, setApiError] = useState<string>("");
    const { login } = useAuth();
    const { showToast } = useToast();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const onSubmit: SubmitHandler<LoginFormInput> = async data => {
        setApiError("");
        const response = await baseRequest("post", "/api/login", data);
        if (response.status === true) {
            login(response.data.token);
            console.log(getCookie("authToken"));
            showToast("Login successful!");
            navigate('/');
        } else if (response.code === 403) {
            setError("email", {
                type: "manual",
                message: "Invalid email or password"
            })
        } else if (response.request) {
            setApiError("Unable to connect to the server");
        } else {
            setApiError("An unexpected error occurred");
        }
    };

    return (
        <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {apiError &&
                        <div className="text-center">
                            <p className="text-red-500 text-xl">{apiError}</p>
                        </div>
                    }
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input id="email"
                           {...register("email", {
                               required: "Email is required",
                               pattern: {
                                   value: emailRegex,
                                   message: 'Enter a valid email address'
                               }
                           })}
                           className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                  dark:placeholder-gray-400 dark:text-white 
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                                  ${errors.email ? "border-red-500" : "border-gray-300"}`}
                           placeholder="name@gmail.com"/>
                    {errors.email && <p className="text-red-500 pt-2">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password"
                           {...register("password", {
                               required: "Password is required"
                           })}
                           id="password"
                           className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                  dark:placeholder-gray-400 dark:text-white 
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                                  ${errors.email ? "border-red-500" : "border-gray-300"}`}/>
                    {errors.password && <p className="text-red-500 pt-4">{errors.password.message}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember"
                                   aria-describedby="remember"
                                   type="checkbox"
                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <Link to="/forgot-password"
                          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Forgot password?
                    </Link>
                </div>
                <input
                    type="submit"
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    value={"Login"}/>


                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account yet?{" "}
                    <Link to="/signup"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Sign up
                    </Link>
                </p>
            </form>
        </>
    )
}