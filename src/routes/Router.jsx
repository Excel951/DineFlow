import {createBrowserRouter} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import FoodMenu from "../pages/FoodMenu";
import SignUpPage from "../pages/SignUpPage.jsx";
import StaffDashboard from "../pages/StaffDashboard.jsx";
import MenuManagement from "../pages/MenuManagement.jsx";

export const router = createBrowserRouter([
    {path: "/", element: <LoginPage/>},
    {path: "/foodmenu", element: <FoodMenu/>},
    {path: "/register", element: <SignUpPage/>},
    {path: "/dashboard", element: <StaffDashboard/>},
    {path: "/menu-management", element: <MenuManagement/>},
]);
