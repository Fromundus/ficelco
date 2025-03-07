import React from 'react'
import LineSkeleton from './LineSkeleton'

function NewsCardSkeleton() {
    return (
        <div className='p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/2 rounded-lg animate-pulse-fast opacity-65'>
            <div className="group relative bg-light-background dark:bg-dark-background h-full rounded-lg border border-light-line dark:border-dark-line">

                <div className="relative p-4 flex flex-col gap-4">
                    <LineSkeleton className={"w-1/2 h-2"} speed={"slow"} />
                    <LineSkeleton className={"w-1/2 h-3"} speed={"fast"} />
                    <LineSkeleton className={"w-full h-2"} speed={"slow"} />
                    <LineSkeleton className={"w-full h-2"} speed={"fast"} />
                    <LineSkeleton className={"w-full h-2"} speed={"slow"} />
                </div>
                <div className='h-96 p-4'>
                    <div className='bg-light-accent dark:bg-dark-accent w-full h-full rounded-lg'>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsCardSkeleton