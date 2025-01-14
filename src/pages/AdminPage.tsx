import { Outlet } from "react-router";

const AdminPage = () => {
  return (
    <div className="grid grid-cols-4 mt-14 relative gap-6 py-10 w-full ml-[240px] pl-4">
      <Outlet />
    </div>
  );
};

export default AdminPage;
