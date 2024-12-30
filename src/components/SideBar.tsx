import { NavLink } from "react-router";
import { NavLinkProps } from "../libs/types/types.ts";

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

const UserNav = () => {
  return (
    <ul>
      <li>
        <StyledNavLink to={"/user/info"} children={"Account Information"} />
      </li>
      <li>
        <StyledNavLink to={"/user/history"} children={"Activity History"} />
      </li>
    </ul>
  );
};

const AdminNav = () => {
  return (
    <ul>
      <li>
        <StyledNavLink to={"/user/info"} children={"Users"} />
      </li>
      <li>
        <StyledNavLink to={"/user/history"} children={"Users Import State"} />
      </li>
      <li>
        <StyledNavLink
          to={"/user/history"}
          children={"Permissions Management"}
        />
      </li>
    </ul>
  );
};

function SideBar({ role }: { role: string }) {
  return (
    <nav className="bg-white shadow-lg h-screen fixed top-0 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto mt-16">
      {role === "user" ? <UserNav /> : <AdminNav />}
    </nav>
  );
}

export default SideBar;
