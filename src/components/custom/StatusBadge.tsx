import React from 'react'
import { Badge } from '../ui/badge'

const StatusBadge = ({ title }: { title: string; }) => {
    return (
        <Badge className={`text-xs capitalize
            ${title === "announcement" && "bg-red-500 text-white"}
            ${title === "power-rate" && "bg-yellow-500 text-white"}
            ${title === "job-post" && "bg-blue-500 text-white"}
            ${title === "advisory" && "bg-gray-500 text-white"}
        `} variant='outline'>
            {title}
        </Badge>
    )
}

export default StatusBadge
