import { ReactNode, useEffect } from "react";
import { NavBar } from "@/components/common/NavBar.tsx";
import SideBar from "@/components/common/SideBar.tsx";
import { getUser } from "@/libs/user/user.ts";
import { useUser } from "@/hooks/useUser";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissons";

function Layout(props: { children: ReactNode }) {
  const { user, setUserInfo } = useUser();
  const { setUserPermssions, permissions } = usePermissions();

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const getUserInfo = async () => {
      if (isLoggedIn) {
        const response = await getUser();
        if ("data" in response) {
          setUserInfo(response.data.user);
          setUserPermssions(
            response.data.permissions.map(
              ({ apiRoute }: { apiRoute: string }) => apiRoute
            )
          );
        }
      }
    };
    getUserInfo();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="flex">
        {user && permissions && (
          <SideBar role={user.role} permissions={permissions} />
        )}
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
