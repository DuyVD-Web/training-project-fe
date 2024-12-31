import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import {
  changePassword,
  getUser,
  updateUserInfo,
} from "../../libs/user/user.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { phoneNumberRegex } from "../../libs/constants/regex.ts";
import {
  ChangePasswordFormInput,
  EditInfoFormInput,
  InformationForm,
} from "../../libs/types/user.ts";
import { useToast } from "../../layouts/AppProvider.tsx";
import Avatar from "./Avatar.tsx";

const UserInformation = () => {
  const [isEditing, setEditing] = useState(false);
  const [currenForm, setCurrenForm] = useState<InformationForm | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<EditInfoFormInput>({
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      address: "",
    },
  });

  const { showToast } = useToast();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    watch,
    setError: setErrorPasswordForm,
    reset,
  } = useForm<ChangePasswordFormInput>({
    defaultValues: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit: SubmitHandler<EditInfoFormInput> = async (data) => {
    const response = await updateUserInfo(data);
    if (!("status" in response)) {
      showToast("Information update successful!");
      if (currenForm) {
        setCurrenForm({
          ...currenForm,
          email: response.email,
          name: response.name,
          phoneNumber: response.phoneNumber?.toString(),
          address: response.address,
          avatar: currenForm.avatar ? currenForm.avatar : null,
        });
      }
    } else if (response.code === 422) {
      if (response.errors) {
        Object.keys(response.errors).forEach((field) => {
          setError(field as keyof EditInfoFormInput, {
            message: response.errors![field][0],
          });
        });
      }
    } else {
      showToast("Something unexpected occured", "error");
    }
    setEditing(false);
  };

  const onChangePassword: SubmitHandler<ChangePasswordFormInput> = async (
    data
  ) => {
    const response = await changePassword(data);
    if (response.status === true) {
      showToast("Change password successfully!");
      reset();
    } else {
      if ("errors" in response && response.errors) {
        Object.keys(response.errors).forEach((field) => {
          setErrorPasswordForm(field as keyof ChangePasswordFormInput, {
            message: response.errors![field][0],
          });
        });
      }
    }
  };

  const handleCancel = () => {
    setEditing(false);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await getUser();
      setCurrenForm({
        ...currenForm,
        email: response.email,
        name: response.name,
        phoneNumber: response.phoneNumber?.toString(),
        address: response.address,
        avatar: response.avatar,
      });
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const setUserInfo = () => {
      if (currenForm) {
        setValue("name", currenForm.name);
        setValue("email", currenForm.email);
        setValue("phone_number", currenForm.phoneNumber);
        setValue("address", currenForm.address);
      }
    };
    setUserInfo();
  }, [isEditing, currenForm]);

  function handleAvatarSave(newAvatarUrl: string): void {
    if (currenForm) {
      setCurrenForm({
        ...currenForm,
        email: currenForm.email,
        name: currenForm.name,
        phoneNumber: currenForm.phoneNumber?.toString(),
        address: currenForm.address,
        avatar: newAvatarUrl,
      });
    }
  }

  return (
    <>
      <div className="col-start-2 col-end-4 relative">
        {currenForm && currenForm.avatar ? (
          <Avatar currentAvatar={currenForm.avatar} onSave={handleAvatarSave} />
        ) : (
          ""
        )}
      </div>

      <div className="col-start-2 col-end-4 h-[2px] bg-gray-300" />

      <form
        className="col-start-2 col-end-4 relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <button
          type="button"
          onClick={() => setEditing(true)}
          className="absolute top-0 right-0 text-gray-500 hover:text-blue-700 focus:outline-none"
          disabled={isEditing}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>

        <h3 className="mb-4 text-lg font-medium text-gray-900">User Detail</h3>

        <div className="flex w-[75%] gap-4 mb-4 flex-col">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className={`bg-gray-50 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
              readOnly={!isEditing}
            />
            {errors.name && (
              <p className="text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              readOnly
            />
          </div>

          <div>
            <label
              htmlFor="phone_number"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone number
            </label>
            <input
              type="tel"
              {...register("phone_number", {
                pattern: {
                  value: phoneNumberRegex,
                  message: "Please enter a valid phone number",
                },
              })}
              className={`bg-gray-50 border ${
                errors.phone_number ? "border-red-500" : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
              readOnly={!isEditing}
            />
            {errors.phone_number && (
              <p className="text-red-400 mt-1">{errors.phone_number.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Address
            </label>
            <input
              type="text"
              {...register("address")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              readOnly={!isEditing}
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex gap-3">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-900 bg-white border border-gray-300 hover:text-blue-700 hover:border-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
      <div className=" col-start-2 col-end-4 h-[2px] bg-gray-300"></div>
      <div className="col-start-2">
        <NavLink
          to={"/user/email"}
          className="px-3 py-2 rounded bg-blue-700 text-white"
        >
          {" "}
          Change email
        </NavLink>
      </div>

      <div className=" col-start-2 col-end-4 h-[2px] bg-gray-300"></div>
      <form
        className="col-start-2 col-end-4 "
        onSubmit={handleSubmitPassword(onChangePassword)}
      >
        <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">
          Change Password
        </h3>
        <div className="flex w-[75%] gap-4 mb-4 flex-col">
          {errorsPassword.password && (
            <p className="text-red-400 mt-1">
              {errorsPassword.password.message}
            </p>
          )}
          <div>
            <label
              htmlFor="current_password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Current Password
            </label>
            <input
              type="password"
              {...registerPassword("current_password", {
                validate: (value) => {
                  if (!value) {
                    return "Please fill all the fields.";
                  }
                },
              })}
              id="current_password"
              className={`bg-gray-50 border ${
                errorsPassword.current_password
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
            />
            {errorsPassword.current_password && (
              <p className="text-red-400 mt-1">
                {errorsPassword.current_password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              New Password
            </label>
            <input
              type="password"
              {...registerPassword("password", {
                required: "Please fill all the fields.",
              })}
              id="password"
              className={`bg-gray-50 border ${
                errorsPassword.password || errorsPassword.password_confirmation
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
            />
            {errorsPassword.password && (
              <p className="text-red-400 mt-1">
                {errorsPassword.password.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="password_confirmation"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              {...registerPassword("password_confirmation", {
                validate: (value) => {
                  if (watch("password") != value) {
                    return "Passwords do not match";
                  }
                  if (!value) {
                    return "Please fill all the fields.";
                  }
                },
              })}
              id="password_confirmation"
              className={`bg-gray-50 border ${
                errorsPassword.password || errorsPassword.password_confirmation
                  ? "border-red-500"
                  : "border-gray-300"
              } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
            />
            {errorsPassword.password_confirmation && (
              <p className="text-red-400 mt-1">
                {errorsPassword.password_confirmation.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Change password
        </button>
      </form>
    </>
  );
};

export default UserInformation;
