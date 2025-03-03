import React from 'react'
import LineSkeleton from './LineSkeleton'

function NewsCardSkeleton() {
    return (
        <div className='p-2 w-full sm:w-1/2 md:w-1/2 lg:w-1/3 rounded-lg animate-pulse-fast opacity-65'>
            <div className="group relative bg-light-background dark:bg-dark-background h-full rounded-lg border border-light-line dark:border-dark-line">

                <div className="relative p-4 sm:p-6 lg:p-8 flex flex-col gap-4">
                    <LineSkeleton className={"w-1/2 h-2"} speed={"slow"} />
                    <LineSkeleton className={"w-1/2 h-3"} speed={"fast"} />
                    <LineSkeleton className={"w-full h-3"} speed={"slow"} />

                    <div className="mt-32">
                        <div
                            className="flex flex-col gap-4"
                        >
                            <LineSkeleton className={"w-full h-2"} speed={"fast"} />
                            <LineSkeleton className={"w-full h-2"} speed={"slow"} />
                            <LineSkeleton className={"w-full h-2"} speed={"fast"} />
                            <LineSkeleton className={"w-full h-2"} speed={"slow"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsCardSkeleton