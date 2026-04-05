import React, {Suspense, lazy} from "react";
import {createBrowserRouter, Navigate} from "react-router-dom";

// import ProtectedRoute from "../components/ProtectedRoute";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

const LoginPage = lazy(() => import("../pages/LoginPage"));
const FoodMenu = lazy(() => import("../pages/FoodMenu"));
const SignUpPage = lazy(() => import("../pages/SignUpPage.jsx"));
const StaffDashboard = lazy(() => import("../pages/StaffDashboard.jsx"));
const MenuManagement = lazy(() => import("../pages/MenuManagement.jsx"));

const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
    </div>
);

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
        children: [
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute allowedRoles={["karyawan", "admin"]}>
                        <Suspense fallback={<LoadingFallback />}>
                            <StaffDashboard />
                        </Suspense>
                    </ProtectedRoute>
                ),
            },
            {
                path: "menu-management",
                element: (
                    <ProtectedRoute allowedRoles={["karyawan", "admin"]}>
                        <Suspense fallback={<LoadingFallback/>}>
                            <MenuManagement/>
                        </Suspense>
                    </ProtectedRoute>
                )
            },
        ]
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
]);
