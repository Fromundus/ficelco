import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdOutlineShoppingCart } from "react-icons/md";
import logo from "../../assets/shoppayo_logo.svg";

function Header({cartLength}) {
    const location = useLocation();

    return (
        <nav className={`fixed w-full p-2 flex items-center h-[60px] ${location.pathname === "/U2FsdGVkX1+Rv7W03=" ? "bg-primary" : "bg-white border-b"} justify-between`} style={{zIndex: 500}}>
            <Link className="" to="/U2FsdGVkX1+Rv7W03=">
                {location.pathname !== "/U2FsdGVkX1+Rv7W03=" ?
                    <img className='p-1 w-[45px]' src={logo} alt="" />
                    :
                    <div className='text-lg font-bold'>
                        <span className='text-black'>Shop</span>
                        <span className='text-white'>Payo</span>
                    </div>
                }
            </Link>
            <Link to="cart" className="relative me-4">
                <MdOutlineShoppingCart className={`text-3xl mt-2 ${location.pathname === "/U2FsdGVkX1+Rv7W03=" ? "text-white" : "text-black"}`} />
                {cartLength > 0 && <span className={`absolute px-2 py-0.5 rounded-full font-bold bg-primary text-white`} style={{fontSize: "7pt", top: 0, left: "10px"}}>{cartLength}</span>}
            </Link>
        </nav>
    )
}

export default Header