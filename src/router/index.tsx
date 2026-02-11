import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, AboutPage, CellPhonesPage, CellPhonePage, LoginPage, RegisterPage } from "../pages";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'celulares',
                element: <CellPhonesPage />
            },
            {
                path: 'celulares/:slug',
                element: < CellPhonePage />
            },
            {
                path: 'nosotros',
                element: <AboutPage />
            },
            {
                path: 'login',
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
        ]
    },
]
);