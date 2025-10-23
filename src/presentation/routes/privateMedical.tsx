import { type RouteObject } from "react-router-dom";
import { RoleRoute } from "./guards";
import RootLayout from "../layouts/RootLayout";

import MedicalHistory from "../pages/medicalHistory/pages/previewMedicalHistory";
import { PreviewMedicalHistory } from "../pages/medicalHistory/pages/detailMedicalHistoryPage";
import CreateMedicalHistory from "../pages/medicalHistory/pages/createMedicalHistoryPage";
import EncounterDetailPage from "../pages/encounter/pages/encounterDetailPage";
import EditEncounterPage from "../pages/encounter/pages/editEncounterPage";
import CreateEncounterPage from "../pages/encounter/pages/createEncounterPage";
import EncounterPreviewPage from "../pages/encounter/pages/encounterPreviewPage";

export const medicalRoutes: RouteObject = {
    element: <RoleRoute allow={["admin", "doctor", "nurse"]} />,

    children: [
        {
            element: <RootLayout />,
            children: [
                { path: "encounter", element: <EncounterPreviewPage /> },
                { path: "encounter/new", element: <CreateEncounterPage /> },
                { path: "encounter/edit/:id", element: <EditEncounterPage /> },
                { path: "encounter/:id", element: <EncounterDetailPage /> },
                { path: "medicalHistory", element: <MedicalHistory /> },
                { path: "medicalHistory/view", element: <PreviewMedicalHistory /> },
                { path: "medicalHistory/new", element: <CreateMedicalHistory /> },
            ],
        },
    ],
};
