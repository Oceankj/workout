import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './app';
import { ErrorPage } from '@/pages/error-page';
import { LoginPage } from '@/pages/login-page';

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
