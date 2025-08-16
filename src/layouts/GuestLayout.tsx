import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/store/auth";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!loading && user && user.role) {
            navigate(`/${user.role}`);
        }

        window.scrollTo(0, 0);
    }, [loading, user, navigate]);

    if(loading){
        return (
            <Loading />
        )
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default GuestLayout;