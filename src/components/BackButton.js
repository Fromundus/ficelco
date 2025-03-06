import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function BackButton({ to }) {
    return (
        <Link to={to}>
            <IoMdArrowBack className='text-2xl' />
        </Link>
    )
}

export default BackButton