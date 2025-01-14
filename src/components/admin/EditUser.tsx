import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUserById, updateUserById } from "../../libs/user/user";
import { EditUserForm } from "../../libs/types/user";
import { SubmitHandler, useForm } from "react-hook-form";
import Avatar from "../user/Avatar";
import { useToast } from "../../layouts/AppProvider";

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const [currenForm, setCurrenForm] = useState<EditUserForm | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<EditUserForm>({
    defaultValues: {
      name: "",
      email: "",
      role: "",
      phone_number: "",
      address: "",
      verified: null,
    },
  });
  const { showToast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      if (id) {
        const result = await getUserById(id);
        if ("errors" in result) {
          showToast(result.message || "Something went wrong!");
          return;
        }

        setCurrenForm((prev) => {
          const userInfo = {
            ...prev,
            name: result.data.user.name,
            email: result.data.user.email,
            role: result.data.user.role,
            phone_number: result.data.user.phoneNumber,
            avatar: result.data.user.avatar,
            address: result.data.user.address,
            verified: result.data.user.verifiedAt,
          };
          return userInfo;
        });
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const setUserInfo = () => {
      if (currenForm) {
        setValue("name", currenForm.name);
        setValue("email", currenForm.email);
        setValue("phone_number", currenForm.phone_number);
        setValue("address", currenForm.address);
        setValue("role", currenForm.role);
      }
    };
    setUserInfo();
  }, [currenForm]);

  function handleAvatarSave(newAvatarUrl: string): void {
    if (currenForm) {
      setCurrenForm({
        ...currenForm,
        avatar: newAvatarUrl,
      });
    }
  }

  const onSubmit: SubmitHandler<EditUserForm> = async (data) => {
    if (id) {
      const response = await updateUserById(id, data);
      if ("errors" in response && response.errors) {
        Object.keys(response.errors).forEach((field) => {
          setError(field as keyof EditUserForm, {
            message: response.errors![field][0],
          });
        });
        return;
      }

      if (response.status) {
        showToast("Update successfully.");
        setCurrenForm((prev) => {
          const userInfo = {
            ...prev,
            name: response.data.user.name,
            email: response.data.user.email,
            role: response.data.user.role,
            phone_number: response.data.user.phoneNumber,
            avatar: response.data.user.avatar,
            address: response.data.user.address,
            verified: response.data.user.verifiedAt,
          };
          return userInfo;
        });
        return;
      }
    }

    showToast("Something went wrong.");
  };

  return (
    <div className="col-start-1 col-end-4 relative">
      <h2 className="mb-7 text-lg font-medium text-gray-900">Edit user</h2>
      {currenForm && currenForm.avatar ? (
        <Avatar currentAvatar={currenForm.avatar} onSave={handleAvatarSave} />
      ) : (
        ""
      )}
      <div className="h-[2px] bg-gray-300 my-7 " />
      <div>
        <form
          action=""
          className="grid-cols-2 gap-4 grid"
          onSubmit={handleSubmit(onSubmit)}
        >
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
            />
            {errors.name && (
              <p className="text-red-400 mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
              {currenForm?.verified ? (
                <span className="text-green-400"> (Email verified)</span>
              ) : (
                <span className="text-red-300"> (Email not verified)</span>
              )}
            </label>
            <input
              {...register("email")}
              type="text"
              readOnly={true}
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
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
              {...register("phone_number")}
              type="number"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
            />
            {errors.phone_number && (
              <p className="text-red-400 mt-1">{errors.phone_number.message}</p>
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
              <option value="admin">Admin</option>
              <option value="user">User</option>
              <option value="manager">Manager</option>
            </select>
            {errors.role && (
              <p className="text-red-400 mt-1">{errors.role.message}</p>
            )}
          </div>
          <div className="col-span-2">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Address
            </label>
            <input
              {...register("address")}
              type="text"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5`}
            />
            {errors.address && (
              <p className="text-red-400 mt-1">{errors.address.message}</p>
            )}
          </div>
          <div className="flex justify-end col-span-2 mt-5">
            <input
              type="submit"
              value={"Update"}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
