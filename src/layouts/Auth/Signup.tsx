import {Link} from "react-router";

export const Signup = () => {
    return (
        <>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up for a new account
            </h1>
            <form className="space-y-4 md:space-y-6" method="POST">
                <div>
                </div>
                <div>
                    <label htmlFor="email"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                    <input type="email" name="email" id="email"
                           className=" bg-gray-50 border border-gray-300text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           placeholder="name@gmail.com" value=""/>
                </div>
                <div>
                    <label htmlFor="password"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input type="password" name="password" id="password"
                           className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox"
                                   className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember
                                me</label>
                        </div>
                    </div>
                    <a href="#"
                       className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot
                        password?</a>
                </div>
                <button className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">
                    Sign up
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?
                    <Link to={'/login'}
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
                </p>
            </form>
        </>
    )
}