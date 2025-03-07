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
import BillInquiry from './pages/BillInquiry';
import ConsumerServices from './pages/ConsumerServices';
import About from './pages/About';
import Updates from './pages/Updates';
import CooperativeProfile from './pages/CooperativeProfile';
import History from './pages/History';
import VisionMissionGoal from './pages/VisionMissionGoal';
import BoardOfDirectors from './pages/BoardOfDirectors';
import ManagementTeam from './pages/ManagementTeam';
import Feuc from './pages/Feuc';
import Update from './pages/Update';
import Biddings from './pages/Biddings';
import Awards from './pages/Awards';
import AdminHome from './pages/Admin/AdminHome';
import AdminUpdates from './pages/Admin/AdminUpdates';
import AdminBoardOfDirectors from './pages/Admin/AdminBoardOfDirectors';
import AdminManagementTeam from './pages/Admin/AdminManagementTeam';
import AdminFeuc from './pages/Admin/AdminFeuc';
import AdminBilling from './pages/Admin/AdminBilling';
import AdminDetails from './pages/Admin/AdminDetails';
import AdminSecurity from './pages/Admin/AdminSecurity';
import AdminUpdate from './pages/Admin/AdminUpdate';
import AdminFileManager from './pages/Admin/AdminFileManager';

const roles = {
    superAdmin: "f1",
    admin: "f2",
    user: "f3",
}

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path='/' element={<GuestLayout />}>
            <Route index element={<Landing />} />
            <Route path='login' element={<Login />} />
            <Route path="signup" element={<Signup />} />

            <Route path='news-and-updates' element={<Updates />} />
            <Route path='/news-and-updates/:id' element={<Update />} />
            <Route path='bill-inquiry' element={<BillInquiry />} />
            <Route path='biddings' element={<Biddings />} />
            <Route path='consumer-services' element={<ConsumerServices />} />
            <Route path='about' element={<About />} />
            <Route path='/about/cooperative-profile' element={<CooperativeProfile />} />
            <Route path='/about/history' element={<History />} />
            <Route path='/about/vision-mission-goal' element={<VisionMissionGoal />} />
            <Route path='/about/board-of-directors' element={<BoardOfDirectors />} />
            <Route path='/about/management-team' element={<ManagementTeam />} />
            <Route path='/about/feuc' element={<Feuc />} />
            <Route path='/about/awards' element={<Awards />} />
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.superAdmin} />}>
            <Route path={`${roles.superAdmin}`} element={<SuperAdminLayout />}>
            </Route>
        </Route>

        <Route element={<RequireAuthentication allowedRoles={roles.admin} />}>
            <Route path={`${roles.admin}`} element={<AdminLayout />}>
                <Route index element={<AdminHome />} />
                <Route path='updates' element={<AdminUpdates />} />
                <Route path='updates/:id' element={<AdminUpdate />} />
                <Route path='board-of-directors' element={<AdminBoardOfDirectors />} />
                <Route path='management-team' element={<AdminManagementTeam />} />
                <Route path='feuc' element={<AdminFeuc />} />
                <Route path='billing' element={<AdminBilling />} />
                <Route path='file-manager' element={<AdminFileManager />} />
                <Route path='details' element={<AdminDetails />} />
                <Route path='security' element={<AdminSecurity />} />
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