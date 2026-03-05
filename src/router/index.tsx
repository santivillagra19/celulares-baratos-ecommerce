import { createBrowserRouter, Navigate } from "react-router-dom";
import { RootLayout } from "../layouts/RootLayout";
import { HomePage, AboutPage, CellPhonesPage, CellPhonePage, LoginPage, RegisterPage, OrdersUserPage, CheckOutPage, ThankYouPage } from "../pages";
import { ClientLayout } from "../layouts/ClientLayout";
import { OrderUserPage } from "../pages/OrderUserPage";

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
            {
                path: 'account',
                element: <ClientLayout />,
                children: [
                    {
                        path: '',
                        element: <Navigate to='/account/pedidos' />
                    },
                    {
                        path: 'pedidos',
                        element: <OrdersUserPage />
                    },
                    {
                        path: 'pedidos/:id',
                        element: <OrderUserPage />
                    },
                ]
            }
        ],
    },
    {
        path: '/checkout',
        element: <CheckOutPage />
    },
    {
        path: '/checkout/:id/thank-you',
        element: <ThankYouPage />
    },

]
);