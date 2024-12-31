import { SubmitHandler, useForm } from "react-hook-form";
import { ChangeEmailFormInput } from "../../libs/types/user";
import { emailRegex } from "../../libs/constants/regex";
import { changeEmail } from "../../libs/user/user";
import { useToast } from "../../layouts/AppProvider";

const EmailChange = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<ChangeEmailFormInput>();
  const { showToast } = useToast();

  const onSubmit: SubmitHandler<ChangeEmailFormInput> = async (data) => {
    const response = await changeEmail(data);
    if ("errors" in response && response.errors) {
      Object.keys(response.errors).forEach((field) => {
        setError(field as keyof ChangeEmailFormInput, {
          message: response.errors![field][0],
        });
      });
    }
    if (response.status === true) {
      showToast("Change email link sended.");
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="col-start-2 col-end-4 relative"
      id="info-form"
      method="POST"
    >
      <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
        Change email
      </h3>
      <div className="flex w-[75%] gap-4 mb-4 flex-col">
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            New email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "New email is required.",
              pattern: {
                value: emailRegex,
                message: "Enter a valid email address",
              },
            })}
            className={`bg-gray-50 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
          {errors.email && (
            <p className="text-red-400 mt-1">{errors.email.message}</p>
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
            {...register("password", { required: "Password is required." })}
            id="password"
            className={`bg-gray-50 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
          />
          {errors.password && (
            <p className="text-red-400 mt-1">{errors.password.message}</p>
          )}
        </div>
      </div>
      <input
        value={"Send change email link"}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      />
    </form>
  );
};

export default EmailChange;
