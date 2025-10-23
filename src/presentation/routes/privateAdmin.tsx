import type { RouteObject } from "react-router-dom";
import { RoleRoute } from "./guards";
import RootLayout from "../layouts/RootLayout";
import { AdminDashboard } from "../pages/admin/adminDashboard";
import { AdminRegisterCSV } from "../pages/admin/pages/admiRegisterCSV";
import { AdminRegisterUser } from "../pages/admin/pages/admiRegisterUser";

export const adminRoutes: RouteObject = {
    element: <RoleRoute allow={["admin"]} />,
    children: [
        {
            element: <RootLayout />,
            children: [
                { path: "adminPage", element: <AdminDashboard /> },
                { path: "admin/registerUser", element: <AdminRegisterUser /> },
                { path: "admin/registerCSV", element: <AdminRegisterCSV /> },
            ],
        },
    ],
};
