import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";

function BreadCrumbs({ links }) {
    const renderLinks = links?.map( (item) => {
        return (
            <Link to={item.href} className='flex items-center gap-2' key={item.href}>
                <span><IoIosArrowForward /></span>
                <span>{item.title}</span>
            </Link>
        )
    });

    return (
        <div className='flex items-center w-full p-4 gap-2'>
            <Link to={'/'}>
                <span><GoHomeFill className='text-2xl' /></span>
            </Link>
            <div className='flex items-center gap-2'>
                {renderLinks}
            </div>
        </div>
    )
}

export default BreadCrumbs