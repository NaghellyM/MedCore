import type { RouteObject } from "react-router-dom";
import App from "../../App";
import Form from "../pages/login/loginDashboard";
import NotFoundPage from "../pages/notFoundPage";

export const publicRoutes: RouteObject[] = [
    { index: true, element: <App /> },          
    { path: "login", element: <Form /> },       
    { path: "*", element: <NotFoundPage /> },   
];
