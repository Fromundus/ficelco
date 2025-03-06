import axios from "axios";
import React, { useContext } from "react";
import { createContext } from "react";
import axiosClient from "../axios-client";
import { useNavigate } from "react-router-dom";

const StateContext = createContext({});

export function ContextProvider({children}){
    const [name, setName] = React.useState();
    const [role, _setRole] = React.useState(localStorage.getItem("role")); // role
    const [id, _setId] = React.useState(localStorage.getItem("id")); // id
    const [email, setEmail] = React.useState(); // email
    const [profilePic, setProfilePic] = React.useState(); // profile pic

    React.useEffect( () => {
        const fetchUser = async () => {
            try {
                const res = await axiosClient.get('/api/user')
                console.log(res);
                if(res.status === 200){
                    setName(res.data.name);
                    setRole(res.data.role);
                    setId(res.data.id);
                    setEmail(res.data.email);
                    setProfilePic(res.data.profile_pic);
                }
            } catch (err) {
                console.log(err);

                if(err.response.status === 401){
                    localStorage.removeItem("role"); // remove role
                    localStorage.removeItem("id"); // remove id
                }
            }
        }

        fetchUser();
    }, []);

    function setRole(role){
        _setRole(role)

        if(role){
            localStorage.setItem("role", role);
        } else {
            localStorage.removeItem("role");
        }
    }

    function setId(id){
        _setId(id)

        if(id){
            localStorage.setItem("id", id);
        } else {
            localStorage.removeItem("id");
        }
    }

    return (
        <StateContext.Provider value={{
            name,
            setName,
            role,
            setRole,
            id,
            setId,
            email,
            setEmail,
            profilePic,
            setProfilePic
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);