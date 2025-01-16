import { routes } from "@/libs/constants/auth";
import { NavLink } from "react-router";

const StyledNavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-black text-[15px] block hover:bg-blue-50 rounded px-4 py-2.5 transition-all ${
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

function SideBar({
  role,
  permissions,
}: {
  role: string;
  permissions: string[];
}) {
  const hasAccess = (path: string, role: string): boolean => {
    const segment = path.split("/")[1];
    const accessRules = {
      user: ["user"],
      admin: ["admin"],
      manager: ["admin"],
    };
    if (role === "user" || role === "manager" || role === "admin")
      return accessRules[role]?.includes(segment);
    return false;
  };
  return (
    <nav className="bg-white shadow-lg h-screen fixed top-0 z-10 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto mt-16">
      {routes.map((route, index) => {
        if (
          route.permission.every((element) => permissions.includes(element)) &&
          hasAccess(route.path, role) &&
          route.name
        )
          return (
            <StyledNavLink to={route.path} children={route.name} key={index} />
          );
      })}
    </nav>
  );
}

export default SideBar;
