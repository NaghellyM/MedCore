import type { RouteObject } from "react-router-dom";
import App from "../../App";
import Form from "../pages/login/loginDashboard";
import NotFoundPage from "../pages/notFoundPage";
import VerificationPage from "../pages/user/verificationPage";
import ProfilePage from "../pages/user/profilePage";

export const publicRoutes: RouteObject[] = [
    { index: true, element: <App /> },          
    { path: "login", element: <Form /> },   
    { path: "verify", element: <VerificationPage /> }, 
    { path: "*", element: <NotFoundPage /> },   
    { path: "profile", element: <ProfilePage /> }
];
