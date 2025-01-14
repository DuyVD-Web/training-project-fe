import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import { Login } from "./layouts/Auth/Login.tsx";
import { Signup } from "./layouts/Auth/Signup.tsx";
import Layout from "./layouts/Layout.tsx";
import UserPage from "./pages/UserPage.tsx";
import UserInformation from "./components/user/UserInformation.tsx";
import EmailChange from "./components/user/EmailChange.tsx";
import AccessHistory from "./components/user/AccessHistory.tsx";
import Users from "./components/admin/Users.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import CreateNewUser from "./components/admin/CreateNewUser.tsx";
import EditUser from "./components/admin/EditUser.tsx";
import PermissionsManage from "./components/admin/PermissionsManage.tsx";
import ImportStatus from "./components/admin/ImportStatus.tsx";

export const Router = () => {
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
        path={"/user"}
        element={
          <Layout>
            <UserPage />
          </Layout>
        }
      >
        <Route path={"info"} element={<UserInformation />} />
        <Route path={"email"} element={<EmailChange />} />
        <Route path={"history"} element={<AccessHistory />} />
      </Route>
      <Route
        path="/admin"
        element={
          <Layout>
            <AdminPage />
          </Layout>
        }
      >
        <Route path={"users"} element={<Users />} />
        <Route path={"user"} element={<CreateNewUser />} />
        <Route path={"user/:id"} element={<EditUser />} />
        <Route path={"permissions"} element={<PermissionsManage />} />

        <Route path={"import"} element={<ImportStatus />} />
      </Route>
    </Routes>
  );
};
