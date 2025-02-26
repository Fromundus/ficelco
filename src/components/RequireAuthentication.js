import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function RequireAuthentication({ allowedRoles }){
    // const role = localStorage.getItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr");
    const { role } = useStateContext();

    return (
        !role ? <Navigate to="/" />
        : role === `${allowedRoles}`
            ? <Outlet />
            : <Navigate to="/unauthorized" />
    )
}