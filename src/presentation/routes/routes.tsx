import App from '../../App';
import Form from '../pages/login/loginDashboard';
import NotFoundPage from '../pages/notFoundPage';
import RootLayout from '../layouts/RootLayout';
import { createBrowserRouter } from 'react-router-dom';
import { AdminDashboard } from '../pages/admin/adminDashboard';
import { NurseDashboard } from '../pages/nurse/nurseDashboard';
import { DoctorDashboard } from '../pages/doctor/doctorDashboard';
import { PatientDashboard } from '../pages/patient/patientDashboard';
import { AdminRegisterCSV } from '../pages/admin/pages/admiRegisterCSV';
import { AdminRegisterUser } from '../pages/admin/pages/admiRegisterUser';
import EditEncounterPage from '../pages/encounter/pages/editEncounterPage';
import EncounterDetailPage from '../pages/encounter/pages/encounterDetailPage';
import CreateEncounterPage from '../pages/encounter/pages/createEncounterPage';
import EncounterPreviewPage from '../pages/encounter/pages/encounterPreviewPage';
import CreateMedicalHistory from '../pages/medicalHistory/pages/createMedicalHistoryPage';
import { PreviewMedicalHistory } from '../pages/medicalHistory/pages/detailMedicalHistoryPage';
import MedicalHistory from '../pages/medicalHistory/pages/previewMedicalHistory';
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <App />,
            },
            {
                path: '/doctorPage',
                element: <DoctorDashboard />,
            },
            {
                path: '/nursePage',
                element: <NurseDashboard />,
            },
            {
                path: '/adminPage',
                element: <AdminDashboard />,
            },
            {
                path: '/patientPage',
                element: <PatientDashboard />,
            },
            {
                path: '/login',
                element: <Form />,
            },
            {
                path: '/admin/registerUser',
                element: <AdminRegisterUser />,
            },
            {
                path: '/admin/registerCSV',
                element: <AdminRegisterCSV />,
            },
            {
                path: '*',
                element: <NotFoundPage />,
            },
            {
                path: '/medicalHistory',
                element: <MedicalHistory/>,
            },
            {
                path: '/medicalHistory/view',
                element: <PreviewMedicalHistory />,
            },
            {
                path: '/medicalHistory/new',
                element: <CreateMedicalHistory />,
            }
            ,
            {
                path: '/encounter',
                element: <EncounterPreviewPage />,
            },
            {
                path: '/encounter/new',
                element: <CreateEncounterPage />,
            },
            {
                path: '/encounter/edit/:id',
                element: <EditEncounterPage />,
            },
            {
                path: '/encounter/:id',
                element: <EncounterDetailPage />,
            },
        ]
    }
]);

export default router;


