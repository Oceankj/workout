import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './app';
import { ErrorPage } from '@/pages/errorPage';
import { LoginPage } from '@/pages/loginPage';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path:"*",
        element:<Navigate to="login" replace/>,
      }
    ],

  },
]);
