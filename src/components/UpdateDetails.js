import React from 'react'
import { format } from 'date-fns'

function UpdateDetails({ post }) {
    console.log(post);

    return (
        <div className='w-full flex flex-col gap-2'>
            <span className='text-lg font-bold py-4'>{post?.title}</span>
            {post && <span className='italic text-xs'>Published: {format(new Date(post.created_at), "MMMM d, y")}</span>}
            <span className='font-semibold'>{post?.header}</span>

            {post && <span className="relative flex justify-center my-4">
                <div
                    className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-transparent bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-75"
                ></div>
                <span className="relative z-10 bg-white dark:bg-dark-background px-6"></span>
            </span>}

            <div dangerouslySetInnerHTML={{ __html: post?.description }} />
        </div>
    )
}

export default UpdateDetails