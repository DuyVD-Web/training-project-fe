import {Link} from "react-router";

function SideBar() {
    return (
        <nav
            className="bg-white shadow-lg h-screen fixed top-0 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto mt-16">
            <ul>
                <li>
                    <Link to={"/user/info"}
                          className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all">
                        Account Information
                    </Link>
                </li>
                <li>
                    <Link to={"/user/history"}
                          className="text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all">
                        Activity History
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default SideBar;