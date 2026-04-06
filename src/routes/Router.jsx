import React, {Suspense, lazy} from "react";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

// import ProtectedRoute from "../components/ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const FoodMenu = lazy(() => import("../pages/FoodMenu"));
const SignUpPage = lazy(() => import("../pages/SignUpPage.jsx"));
const StaffDashboard = lazy(() => import("../pages/StaffDashboard.jsx"));
const MenuManagement = lazy(() => import("../pages/MenuManagement.jsx"));
const AdminLayout = lazy(() => import("../components/layout/AdminLayout.jsx"));
const LoadingFallback = lazy(() => import("../components/LoadingFallback.jsx"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Navigate to={"/foodmenu"} replace />,
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<LoadingFallback />}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: "/register",
        element: (
            <Suspense fallback={<LoadingFallback />}>
                <SignUpPage />
            </Suspense>
        ),
    },
    {
        path: "/foodmenu",
        element: (
            <Suspense fallback={<LoadingFallback />}>
                <FoodMenu />
            </Suspense>
        ),
    },
    {
        path: "/staff",
        element: (
            <ProtectedRoute allowedRoles={["karyawan", "admin"]}>
                <AdminLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Navigate to={"dashboard"} replace />,
            },
            {
                path: "dashboard",
                element: (
                    <StaffDashboard />
                ),
            },
            {
                path: "menu-management",
                element: (
                    <MenuManagement />
                )
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
