import { type RouteObject } from "react-router-dom";
import { RoleRoute } from "./guards";
import RootLayout from "../layouts/RootLayout";
import { PatientDashboard } from "../pages/patient/patientDashboard";

export const patientRoutes: RouteObject = {
    element: <RoleRoute allow={["patient"]} />,
    children: [
        {
            element: <RootLayout />,
            children: [
                { path: "patientPage", element: <PatientDashboard /> },
            ],
        },
    ],
};
