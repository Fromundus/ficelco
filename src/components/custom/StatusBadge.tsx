import React from 'react'
import { Badge } from '../ui/badge'

const StatusBadge = ({ title }: { title: string; }) => {
    return (
        <Badge className='text-xs capitalize' variant='outline'>
            {title}
        </Badge>
    )
}

export default StatusBadge
