import React from 'react'
import { GoHomeFill } from 'react-icons/go'
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom'

function AdminBreadCrumbs({ links }) {
    const renderLinks = links?.map( (item) => {
        return (
            <Link key={item.id} to={`/f2/file-manager/${item.id}`} className='flex items-center gap-2'>
                {item.name !== "root.ninjadentist24" && <span><IoIosArrowForward className='text-lg' /></span>}
                <span className='hover:bg-light-hover dark:hover:bg-dark-hover p-1 rounded-lg'>{item.name === "root.ninjadentist24" ? <GoHomeFill className='text-2xl hover:bg-light-hover dark:hover:bg-dark-hover rounded-lg' /> : item.name}</span>
            </Link>
        )
    });

    return (
        <div className='flex items-center w-full border-b border-light-line dark:border-dark-line p-2 shadow h-11'>
            {/* <Link to={'/f2/file-manager'}>
                <span></span>
            </Link> */}
            <div className='ms-2 flex items-center gap-2'>
                {renderLinks}
            </div>
        </div>
    )
}

export default AdminBreadCrumbs