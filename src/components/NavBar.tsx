import {Link, useNavigate} from "react-router";
import {getCookie} from "../utils/Cookie.ts";
import NavButton from "./NavButton.tsx";
import baseRequest from "../libs/axios.ts";
import {useEffect, useState} from "react";


export const NavBar = () => {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getCookie('authToken');
        setLoggedIn(!!token);
    }, []);

    async function handleLogout() {
        const response = await baseRequest("post", "/api/logout");
        if (response.status === true) {
            navigate('/');
        } else if (response.code === 500) {
            console.log(response.message);
        } else if (response.request) {
            console.log(response.message);
        } else {
            console.log(response.message);
        }
    }

    return (
        <header
            className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide fixed z-50 w-full top-0'>
            <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                <Link to="/">Logo</Link>
                <div className='flex max-lg:ml-auto space-x-3'>
                    { isLoggedIn ?
                        <NavButton value={'Logout'} onClick={handleLogout}/>
                        :
                        <>
                            <NavButton value={'Login'} href={'/login'}/>
                            <NavButton value={'Signup'} href={'/signup'}/>
                        </>
                    }
                </div>
            </div>
        </header>
    )
}