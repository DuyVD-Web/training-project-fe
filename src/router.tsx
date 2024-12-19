import {createBrowserRouter} from "react-router";
import HomePage from "./pages/HomePage.tsx";

export const routers = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />
    }
]);
