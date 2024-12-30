import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import { Login } from "./layouts/Auth/Login.tsx";
import { Signup } from "./layouts/Auth/Signup.tsx";
import Layout from "./layouts/Layout.tsx";
import UserPage from "./pages/UserPage.tsx";
import UserInformation from "./components/user/UserInformation.tsx";
import EmailChange from "./components/user/EmailChange.tsx";

function AdminPage() {
  return null;
}

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
      </Route>
      <Route
        path={"/admin"}
        element={
          <Layout>
            <AdminPage />
          </Layout>
        }
      ></Route>
    </Routes>
  );
};
