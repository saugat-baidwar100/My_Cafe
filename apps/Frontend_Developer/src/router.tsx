import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home } from './Pages/home';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
  },
]);

export function Approuter() {
  return <RouterProvider router={router} />;
}
