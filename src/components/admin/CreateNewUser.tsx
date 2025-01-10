import { useForm } from "react-hook-form";
import { CreateNewUserForm } from "../../libs/types/user";
import { useState } from "react";
import { emailRegex, phoneNumberRegex } from "../../libs/constants/regex";
import { createNewUser } from "../../libs/user/user";
import { useToast } from "../../layouts/AppProvider";
import { useNavigate } from "react-router";
import defaultAvatar from "../../assets/default-avatar-icon-of-social-media-user-vector.jpg";

const CreateNewUser = () => {
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    setValue,
  } = useForm<CreateNewUserForm>();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const cancelAvatar = () => {
    setAvatarPreview("");
    setValue("avatar", null);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("avatar", file);
      const previewUrl = URL.createObjectURL(file);
      setAvatarPreview(previewUrl);
    }
  };

  const submitForm = async (data: CreateNewUserForm) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "avatar") {
          if (value instanceof File) {
            formData.append("avatar", value);
          }
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    const response = await createNewUser(formData);

    if ("errors" in response && response.errors) {
      Object.keys(response.errors).forEach((field) => {
        setError(field as keyof CreateNewUserForm, {
          message: response.errors![field][0],
        });
      });
      return;
    }
    if (response.status) {
      showToast("Create user successfully.");
      navigate("/admin/users");
      return;
    }
    showToast("Something went wrong.", "error");
  };

  return (
    <>
      <div className="grid grid-cols-12 text-gray-900 min-h-fit pr-4 col-start-1 col-end-5">
        <div className="col-start-4 col-end-11">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-3xl">New user</h1>
          </div>
          <form
            className="col-start-2 col-end-4 relative"
            onSubmit={handleSubmit(submitForm)}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Current avatar"
                    className="w-[24rem] h-[24rem] rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={defaultAvatar}
                    alt="Current avatar"
                    className="w-[24rem] h-[24rem] rounded-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="text-white text-sm">Change avatar</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleAvatarChange}
                />
              </div>
              {avatarPreview ? (
                <div className="flex justify-end w-full">
                  <button
                    onClick={cancelAvatar}
                    className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Cancel
                  </button>
                </div>
              ) : null}
            </div>

            <div className="h-[2px] bg-gray-300 my-7" />

            <div className="flex gap-3 justify-between">
              <div className="flex w-[45%] gap-4 mb-4 flex-col">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className={`bg-gray-50 border ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  />
                  {errors.name && (
                    <p className="text-red-400 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password *
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      min: {
                        value: 6,
                        message: "Password should have aleast 6 characters",
                      },
                    })}
                    className={`bg-gray-50 border ${
                      errors.password_confirmation || errors.password
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  />
                  {errors.password && (
                    <p className="text-red-400 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password_confirmation"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Password confirmmation *
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
                    className={`bg-gray-50 border ${
                      errors.password_confirmation
                        ? "border-red-500"
                        : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  />
                  {errors.password_confirmation && (
                    <p className="text-red-400 mt-1">
                      {errors.password_confirmation.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex w-[45%] gap-4 mb-4 flex-col">
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
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
                    className={`bg-gray-50 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  />
                  {errors.email && (
                    <p className="text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone_number"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone number
                  </label>
                  <input
                    type="number"
                    {...register("phone_number", {
                      pattern: {
                        value: phoneNumberRegex,
                        message: "Enter a valid phone number",
                      },
                    })}
                    className={`bg-gray-50 border ${
                      errors.phone_number ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
                  />
                  {errors.phone_number && (
                    <p className="text-red-400 mt-1">
                      {errors.phone_number.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="role"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    {...register("role")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                  >
                    <option value="user">User</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && (
                    <p className="text-red-400 mt-1">{errors.role.message}</p>
                  )}
                </div>
              </div>
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
              />
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNewUser;
