import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import { CreateTripPage } from './pages/create-trip';
import { TripDetailsPage } from './pages/trip-details';
import "react-day-picker/style.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },
  {
    path: '/trips/:tripId',
    element: <TripDetailsPage />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
