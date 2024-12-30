import { ReactElement, useEffect } from "react";
import { NavBar } from "../components/NavBar.tsx";
import SideBar from "../components/SideBar.tsx";
import { useAuth, useUser } from "./AppProvider.tsx";
import { getUser } from "../libs/user/user.ts";

function Layout(props: { children: ReactElement }) {
  const { user, setUserInfo } = useUser();
  //   const { data, isLoading, error } = useQuery({
  //     queryFn: () => {
  //       return getUser();
  //     },
  //   });

  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const getUserInfo = async () => {
      if (isLoggedIn) {
        const response = await getUser();
        setUserInfo(response);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div>
      <NavBar />
      <div>
        {user && <SideBar role={user.role} />}
        {props.children}
      </div>
    </div>
  );
}

export default Layout;
