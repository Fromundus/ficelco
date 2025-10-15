import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import Bod from '@/types/Bod'

const BodCard = ({ bod }: { bod: Bod }) => {
    return (
        <Card>
            <CardHeader className='flex p-0'>
                <div className='flex'>
                    <img loading='lazy' className='aspect-square object-cover object-top rounded-t-lg' src={bod.image} alt="" />
                </div>
            </CardHeader>
            <CardContent className='p-4'>
                <div className='flex flex-col justify-center text-center'>
                    <span className='text-lg font-semibold'>{bod.name}</span>
                    <span className=''>{bod.position}</span>
                    <span className='text-muted-foreground'>{bod.district} - {bod.areas}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default BodCard
