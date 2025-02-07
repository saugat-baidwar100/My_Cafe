import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './Pages/home';
import { LoginPage } from './Pages/loginPage';
import { RegisterPage } from './Pages/registerPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);

export function Approuter() {
  return <RouterProvider router={router} />;
}
