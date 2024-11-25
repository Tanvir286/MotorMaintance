import React from 'react';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/login/login';
import Registration from './pages/registration/Registration';
import AdminLogin from './pages/adminlogin/AdminLogin';
import AdminDashBorad from './pages/dashboard/Admin';
import UserDashboard from './pages/userdashborad/UserDashborad';
import Root from './component/layouts/Root';
import UserEdit from './pages/userEdit/UserEdit';





const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route >
        <Route path="/login" element={<Login/>} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/admin" element={<AdminLogin/>} />
        <Route path="/home" element={<Root/>}>         
            <Route path="admin" element={<AdminDashBorad/>} />
            <Route path="user" element={<UserDashboard/>} />
            <Route path="edit" element={<UserEdit/>} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
