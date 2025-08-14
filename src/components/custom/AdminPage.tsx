import React from 'react'
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CardTitle } from '../ui/card';

type Props = {
    children: React.ReactNode, 
    className?: string;
    withBackButton?: boolean;
    backbuttonAction?: () => void;
    title?: string;
}

const AdminPage = ({ children, className, withBackButton, backbuttonAction, title }: Props) => {
    const navigate = useNavigate();
    
    return (
        <div className={`${className} text-sm`}>
            {withBackButton && <div className='w-full'>
                <Button variant='ghost' onClick={() => backbuttonAction ? backbuttonAction : navigate(-1)}>
                    <ArrowLeft /> Back
                </Button>
            </div>}
            <CardTitle className='mt-6'>
                {title}
            </CardTitle>
            <div className={`${withBackButton && "mt-6"} flex flex-col gap-4`}>
                {children}
            </div>
        </div>
    )
}

export default AdminPage
