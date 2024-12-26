import {NavLink} from "react-router";
import {NavLinkProps} from "../libs/types/types.ts";

const StyledNavLink = ({ to, children }: { to: string; children: string }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }: NavLinkProps) =>
                `text-black hover:text-blue-600 text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all ${
                    isActive
                        ? "text-blue-600 hover:bg-blue-50"
                        : "text-black hover:bg-gray-50"
                }`
            }
        >
            {children}
        </NavLink>
    );
};

function SideBar() {
    return (
        <nav
            className="bg-white shadow-lg h-screen fixed top-0 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto mt-16">
            <ul>
                <li>
                    <StyledNavLink to={"/user/info"} children={"Account Information"} />
                </li>
                <li>
                    <StyledNavLink to={"/user/history"} children={"Activity History"} />
                </li>
            </ul>
        </nav>
    );
}

export default SideBar;