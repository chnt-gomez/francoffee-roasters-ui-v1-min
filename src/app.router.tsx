import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/landing/LandingPage';
import StorePage from './pages/store/StorePage';
import StoreLayout from './layouts/DefaultLayout';
import EventsPage from './pages/events/EventsPage';

export const appRouter= createBrowserRouter([
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/tienda',
        element: <StoreLayout />,
        children: [
            {
                index: true,
                element: <StorePage />
            },
        ]
    },
    {
        path: '/eventos',
        element: <StoreLayout />,
        children: [
            {
                index: true,
                element: <EventsPage />
            },
        ]
    }
]);