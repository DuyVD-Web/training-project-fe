import { Link, useNavigate } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupFormInput } from "../../libs/types/types.ts";
import { useToast } from "../AppProvider.tsx";
import { emailRegex } from "../../libs/constants/regex.ts";
import baseRequest from "../../libs/axios.ts";
import { useState } from "react";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<SignupFormInput>();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string>("");

  const onSubmit: SubmitHandler<SignupFormInput> = async (data) => {
    setApiError("");
    const response = await baseRequest("post", "/register", data);
    if (response.status === true) {
      showToast("Register successful!");
      navigate("/login");
    } else if (response.code === 422) {
      const errors = response.errors;
      Object.keys(errors).forEach((field) => {
        if (field === "password" && errors[field][0].includes("confirmation")) {
          setError("password_confirmation", {
            message: errors[field][0],
          });
        } else {
          setError(field as keyof SignupFormInput, {
            message: errors[field][0],
          });
        }
      });
    } else {
      setApiError("An unexpected error occurred");
    }
  };

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Signup for a new account
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {apiError && (
            <div className="text-center">
              <p className="text-red-500 text-xl">{apiError}</p>
            </div>
          )}
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
            })}
            id="name"
            className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                  dark:placeholder-gray-400 dark:text-white 
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                                  ${
                                    errors.name
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
            placeholder="Enter your name..."
          />
          {errors.name && (
            <p className="text-red-500 pt-2">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Enter a valid email address",
              },
            })}
            id="email"
            className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                  dark:placeholder-gray-400 dark:text-white 
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                                  ${
                                    errors.email
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
            placeholder="name@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 pt-2">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password should at least have 6 characters",
              },
            })}
            id="password"
            className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                  dark:placeholder-gray-400 dark:text-white 
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                                  ${
                                    errors.password ||
                                    errors.password_confirmation
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
            required
          />
          {errors.password && (
            <p className="text-red-500 pt-2">{errors.password.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="passwordConfirmaiton"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password Confirmation
          </label>
          <input
            type="password"
            {...register("password_confirmation", {
              validate: (value) => {
                if (watch("password") != value) {
                  return "Passwords do not match";
                }
              },
            })}
            id="passwordConfirmaiton"
            className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                  dark:placeholder-gray-400 dark:text-white 
                                  dark:focus:ring-blue-500 dark:focus:border-blue-500
                                  ${
                                    errors.password_confirmation
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
          />
        </div>
        <input
          value={"Signup"}
          type={"submit"}
          className="w-full bg-blue-600 text-whi  te hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  "
        />

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?
          <Link
            to={"/login"}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );
};
