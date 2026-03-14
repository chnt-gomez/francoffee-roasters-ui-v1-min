import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/landing/LandingPage';
import StorePage from './pages/store/StorePage';
import DefaultLayout from './layouts/DefaultLayout';
import EventsPage from './pages/events/EventsPage';
import IndexLayout from './layouts/IndexLayout';
import CustomSupportPage from './pages/custom/CustomSupportPage';

export const appRouter= createBrowserRouter([
    {
        path:"/index",
        element: <IndexLayout />,
        children: [
            {
                index: true,
                element: <LandingPage />
            }
            
        ]
    },
    {
        path:'/',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                element: <StorePage />
            },
            {
                path:'/eventos',
                element: <EventsPage />
            },
            {
                path: '/atencion',
                element: <CustomSupportPage />
            }
        ],
    }
]);