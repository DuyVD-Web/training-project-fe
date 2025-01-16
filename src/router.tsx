import { Navigate, Route, Routes } from "react-router";
import HomePage from "@/pages/HomePage.tsx";
import AuthPage from "@/pages/AuthPage.tsx";
import { Login } from "@/layouts/Auth/Login.tsx";
import { Signup } from "@/layouts/Auth/Signup.tsx";
import Layout from "@/layouts/Layout.tsx";
import UserPage from "@/pages/UserPage.tsx";
import UserInformation from "@/components/user/UserInformation.tsx";
import EmailChange from "@/components/user/EmailChange.tsx";
import AccessHistory from "@/components/user/AccessHistory.tsx";
import Users from "@/components/admin/Users.tsx";
import AdminPage from "@/pages/AdminPage.tsx";
import CreateNewUser from "@/components/admin/CreateNewUser.tsx";
import EditUser from "@/components/admin/EditUser.tsx";
import PermissionsManage from "@/components/admin/PermissionsManage.tsx";
import ImportStatus from "@/components/admin/ImportStatus.tsx";
import { useLocation } from "react-router";
import { routes } from "@/libs/constants/auth";
import { usePermissions } from "./hooks/usePermissons";
import NotFoundPage from "./pages/NotFoundPage";
import { getCookie } from "./utils/Cookie";

const ProtectedRoute = ({
  children,
  requiredPermissions,
  userPermissions,
}: {
  children: React.ReactNode;
  requiredPermissions: string[];
  userPermissions: string[];
}) => {
  const location = useLocation();

  if (requiredPermissions.length === 0) {
    return <>{children}</>;
  }

  const hasPermission = requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  );

  return !hasPermission ? (
    getCookie("authToken") ? (
      <NotFoundPage />
    ) : (
      <Navigate to="/login" state={{ from: location }} replace />
    )
  ) : (
    <>{children}</>
  );
};

export const Router = () => {
  const { permissions } = usePermissions();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route element={<AuthPage />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      <Route
        path="/user"
        element={
          <Layout>
            <UserPage />
          </Layout>
        }
      >
        {routes
          .filter((route) => route.path.startsWith("/user/"))
          .map((route) => (
            <Route
              key={route.path}
              path={route.path.replace("/user/", "")}
              element={
                <ProtectedRoute
                  requiredPermissions={route.permission}
                  userPermissions={permissions}
                >
                  {getComponentForPath(route.path)}
                </ProtectedRoute>
              }
            />
          ))}
      </Route>

      <Route
        path="/admin"
        element={
          <Layout>
            <AdminPage />
          </Layout>
        }
      >
        {routes
          .filter((route) => route.path.startsWith("/admin/"))
          .map((route) => (
            <Route
              key={route.path}
              path={route.path.replace("/admin/", "")}
              element={
                <ProtectedRoute
                  requiredPermissions={route.permission}
                  userPermissions={permissions}
                >
                  {getComponentForPath(route.path)}
                </ProtectedRoute>
              }
            />
          ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const getComponentForPath = (path: string) => {
  const componentMap: Record<string, React.ReactNode> = {
    "/user/info": <UserInformation />,
    "/user/email": <EmailChange />,
    "/user/history": <AccessHistory />,
    "/admin/users": <Users />,
    "/admin/user": <CreateNewUser />,
    "/admin/user/:id": <EditUser />,
    "/admin/permissions": <PermissionsManage />,
    "/admin/import": <ImportStatus />,
  };

  return componentMap[path];
};
