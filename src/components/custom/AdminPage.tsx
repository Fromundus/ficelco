import React from 'react'
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Props = {
    children: React.ReactNode, 
    className?: string;
    withBackButton?: boolean;
    backbuttonAction?: () => void;
}

const AdminPage = ({ children, className, withBackButton, backbuttonAction }: Props) => {
    const navigate = useNavigate();
    
    return (
        <div className={`${className}`}>
            {withBackButton && <div className='w-full'>
                <Button variant='ghost' onClick={() => backbuttonAction ? backbuttonAction : navigate(-1)}>
                    <ArrowLeft /> Back
                </Button>
            </div>}
            <div className={`${withBackButton && "mt-4"}`}>
                {children}
            </div>
        </div>
    )
}

export default AdminPage
