import axios from "axios";
import React, { useContext } from "react";
import { createContext } from "react";
import axiosClient from "../axios-client";

const StateContext = createContext({});

export function ContextProvider({children}){
    // const [role, _setRole] = React.useState(localStorage.getItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr")); // role 
    // const [name, _setName] = React.useState(localStorage.getItem("U2FsdGVkX1+VmU9a5r9pG8f3J0nXZ4LfRr2bJ1Wd0T3i2GtVYZ4n")); // name
    // const [token, _setToken] = React.useState(localStorage.getItem("U2FsdGVkX1+PqlF7w+7eK9z5n2Nbsl6G8Yk+dHb4M5gNl/M1poZt")); // token
    // const [id, _setId] = React.useState(localStorage.getItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli")); // id
    
    // function setToken(token){
    //     _setToken(token)

    //     if(token){
    //         localStorage.setItem("U2FsdGVkX1+PqlF7w+7eK9z5n2Nbsl6G8Yk+dHb4M5gNl/M1poZt", token);
    //     } else {
    //         localStorage.removeItem("U2FsdGVkX1+PqlF7w+7eK9z5n2Nbsl6G8Yk+dHb4M5gNl/M1poZt");
    //     }
    // }

    // function setName(name){
    //     _setName(name)

    //     if(name){
    //         localStorage.setItem("U2FsdGVkX1+VmU9a5r9pG8f3J0nXZ4LfRr2bJ1Wd0T3i2GtVYZ4n", name);
    //     } else {
    //         localStorage.removeItem("U2FsdGVkX1+VmU9a5r9pG8f3J0nXZ4LfRr2bJ1Wd0T3i2GtVYZ4n");
    //     }
    // }

    // function setRole(role){
    //     _setRole(role)

    //     if(role){
    //         localStorage.setItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr", role);
    //     } else {
    //         localStorage.removeItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr");
    //     }
    // }

    // function setId(id){
    //     _setId(id)

    //     if(id){
    //         localStorage.setItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli", id);
    //     } else {
    //         localStorage.removeItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli");
    //     }
    // }

    // return (
    //     <StateContext.Provider value={{
    //         role,
    //         setRole,
    //         name,
    //         setName,
    //         token,
    //         setToken,
    //         id,
    //         setId
    //     }}>
    //         {children}
    //     </StateContext.Provider>
    // )

    const [name, setName] = React.useState();
    // const [role, setRole] = React.useState(); 
    // const [id, setId] = React.useState(); 
    const [role, _setRole] = React.useState(localStorage.getItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr")); // role
    const [id, _setId] = React.useState(localStorage.getItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli")); // id

    React.useEffect( () => {
        const fetchUser = async () => {
            try {
                const res = await axiosClient.get('/api/user')
                console.log(res);
                if(res.status === 200){
                    setName(res.data.firstname);
                    setRole(res.data.role);
                    setId(res.data.user_id);
                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchUser();
    }, []);

    function setRole(role){
        _setRole(role)

        if(role){
            localStorage.setItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr", role);
        } else {
            localStorage.removeItem("U2FsdGVkX1+MzqF7wOa9iVp6K27rLZy8dS8GbTx9Y0Fw/E3Lbr");
        }
    }

    function setId(id){
        _setId(id)

        if(id){
            localStorage.setItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli", id);
        } else {
            localStorage.removeItem("U2FsdGVkX1+8fTn2Tq0g5zXpBv6y6Lo1Nl7ZpA2h9LwYk6M6Wli");
        }
    }

    return (
        <StateContext.Provider value={{
            name,
            setName,
            role,
            setRole,
            id,
            setId
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);