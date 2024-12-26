import {Route, Routes} from "react-router";
import HomePage from "./pages/HomePage.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import {Login} from "./layouts/Auth/Login.tsx";
import {Signup} from "./layouts/Auth/Signup.tsx";
import Layout from "./layouts/Layout.tsx";

export const Router = ()=> {
    return (
        <Routes>
            <Route path="/" element={
                <Layout>
                    <HomePage/>
                </Layout>} />
            <Route element={<AuthPage />}>
                <Route path='login' element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Route>
        </Routes>
    )
}
