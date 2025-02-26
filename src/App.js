import React from 'react';
import "./App.css";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ContextProvider } from './context/ContextProvider';
import RequireAuthentication from './components/RequireAuthentication';

import GuestLayout from './layouts/GuestLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';

import SuperAdminLayout from './layouts/SuperAdminLayout';

import UserLayout from './layouts/UserLayout';

import AdminLayout from './layouts/AdminLayout';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

const roles = {
    superAdmin: "U2FsdGVkX1+z9Nk1=",
    admin: "U2FsdGVkX1+yX2k2=",
    user: "U2FsdGVkX1+Rv7W03=",
}

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={<GuestLayout />}>
            <Route index element={<Landing />} />
            <Route path='login' element={<Login />} />
            <Route path="signup" element={<Signup />} />
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.superAdmin} />}>
            <Route path={`${roles.superAdmin}`} element={<SuperAdminLayout />}>
            </Route>
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.admin} />}>
            <Route path={`${roles.admin}`} element={<AdminLayout />}>
            </Route>
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.user} />}>
            <Route path={`${roles.user}`} element={<UserLayout />}>
            </Route>
        </Route>

        <Route path='unauthorized' element={<Unauthorized />} />

        <Route path="*" element={<NotFound />} />
    </>
))

function App() {
    return (
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    )
}

export default App