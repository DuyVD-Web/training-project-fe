import {NavLink} from "react-router";

const UserInformation = () => {
    return (
        <div className="grid grid-cols-4 mt-6 gap-6 py-10">
            <form action="" className="col-start-2 col-end-4 relative" id="info-form"
                  method="POST">
                <button id="editButton" type="button"
                        className="absolute top-0 right-0 text-gray-500 hover:text-blue-700 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                    </svg>
                </button>
                <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">User Detail</h3>
                <div className="flex w-[75%] gap-4 mb-4 flex-col">
                    <div>
                        <label htmlFor="name"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input readOnly type="text" name="name" id="name"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               value="{{$user['name']}}"/>
                        {/*@error('name')*/}
                        {/*<div className="text-red-400 m-0">{{$message}}</div>*/}
                        {/*@enderror*/}
                    </div>
                    <div>
                        <label htmlFor="email"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input readOnly type="email" id="email"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               value="{{$user['email']}}"/>
                    </div>
                    <div>
                        <label htmlFor="phone_number"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone
                            number</label>
                        <input readOnly type="number" name="phone_number" id="phone_number"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               value="{{$user['phone_number']}}"/>
                        {/*@error('phone_number')*/}
                        {/*<div className="text-red-400 m-0">{{$message}}</div>*/}
                        {/*@enderror*/}
                    </div>
                    <div>
                        <label htmlFor="address"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                        <input readOnly type="text" name="address" id="address"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                               value="{{$user['address']}}"/>
                    </div>


                </div>
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Save
                </button>
                <button id="cancel-button"
                        className="ml-3 text-gray-900 bg-white hover:text-blue-700 hover:border-blue-700 border focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Cancel
                </button>
            </form>
            <div className=" col-start-2 col-end-4 h-[2px] bg-gray-300"></div>
            <div className="col-start-2">
                <NavLink to="#"
                   className="px-3 py-2 rounded bg-blue-700 text-white"> Change email</NavLink>
            </div>

            <div className=" col-start-2 col-end-4 h-[2px] bg-gray-300"></div>
            <form action="" className="col-start-2 col-end-4 " method="post">
                @csrf
                <h3 className="mb-4 text-lg font-medium leading-none text-gray-900 dark:text-white">Change Password</h3>
                <div className="flex w-[75%] gap-4 mb-4 flex-col">

                    <div>
                        <label htmlFor="current_password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current
                            Password</label>
                        <input type="password" name="current_password" id="current_password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="password"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New
                            Password</label>
                        <input type="password" name="password" id="password"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>
                    <div>
                        <label htmlFor="password_confirmation"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm
                            password</label>
                        <input type="password" name="password_confirmation" id="password_confirmation"
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                    </div>

                    {/*@error('password')*/}
                    {/*<div className="text-red-400 mb-4">{{$message}}</div>*/}
                    {/*@enderror*/}
                    {/*@error('current_password')*/}
                    {/*<div className="text-red-400 mb-4">{{$message}}</div>*/}
                    {/*@enderror*/}
                </div>
                <button type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Change password
                </button>
            </form>
        </div>
    );
};

export default UserInformation;