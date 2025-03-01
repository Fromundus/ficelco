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