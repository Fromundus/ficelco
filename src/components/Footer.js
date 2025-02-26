import React from 'react'
import { FaFacebook } from "react-icons/fa6";
import { FaFacebookMessenger } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { SiGmail } from "react-icons/si";


function Footer() {
    return (
        <div className='bg-light-background dark:bg-dark-accent text-light-foreground dark:text-dark-foreground p-4 flex flex-col items-center justify-center gap-2'>
            <div className='flex items-center text-xl gap-4'>
                <Link>
                    <FaFacebook />
                </Link>
                <Link>
                    <FaFacebookMessenger />
                </Link>
                <Link>
                    <SiGmail />
                </Link>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <span>First Catanduanes Electric Cooperative Inc.</span>
                <span>&copy; 2025</span>
            </div>
        </div>
    )
}

export default Footer