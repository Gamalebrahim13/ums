import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './components/AuthLayout/AuthLayout';
import Login from './components/Login/Login';
import MasterLayout from './components/Notfound/MasterLayout/MasterLayout';
import Home from './components/Login/Home/Home';
import Profile from './components/Profile/Profile';
import Usersdata from './components/Userdata/Userdata';
import Userslist from './components/Login/Userslist/Userslist';
import Notfound from './components/Notfound/Notfound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const routes = createBrowserRouter([
    {
      path: '',
      element: <AuthLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Login /> },
        { path: 'login', element: <Login /> },
      ],
    },
    {
      path: 'dashboard',
      element: <MasterLayout />,
      errorElement: <Notfound />,
      children: [
        { index: true, element: <Home /> },
        { path: 'home', element: <Home /> },
        { path: 'users', element: <Userslist /> },
        { path: 'userdata', element: <Usersdata /> },
        { path: "userdata/:id", element: <Usersdata /> },

        { path: 'profile', element: <Profile /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
