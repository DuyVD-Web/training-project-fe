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

const UserNav = () => {
  return (
    <ul>
      <li>
        <StyledNavLink to="/user/info">Account Information</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/user/history">Activity History</StyledNavLink>
      </li>
    </ul>
  );
};

const AdminNav = () => {
  return (
    <ul>
      <li>
        <StyledNavLink to="/admin/users">Users</StyledNavLink>
      </li>
      <li>
        <StyledNavLink to="/admin/import" children="Users Import State" />
      </li>
      <li>
        <StyledNavLink
          to="/admin/permissions"
          children="Permissions Management"
        />
      </li>
    </ul>
  );
};

function SideBar({ role }: { role: string }) {
  return (
    <nav className="bg-white shadow-lg h-screen fixed top-0 z-10 left-0 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto mt-16">
      {role === "user" ? <UserNav /> : <AdminNav />}
    </nav>
  );
}

export default SideBar;
