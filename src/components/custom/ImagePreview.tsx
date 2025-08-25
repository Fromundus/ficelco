import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

const ImagePreview = ({ image }) => {
  return (
    <>
        <Dialog>
            <DialogTrigger asChild>
                {/* <span className='cursor-pointer text-blue-500 underline'>{image.filename}</span> */}
                <div className='h-52'>
                    <img className='rounded-lg w-full h-full border object object-cover' loading='lazy' src={image?.url} alt="" />
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{image.filename}</DialogTitle>
                </DialogHeader>
                {/* <div className="flex justify-center w-full">
                    <img src={image.url} className='h-[80vh] object-contain object' alt="" />
                </div> */}
            </DialogContent>
        </Dialog>
    </>
  )
}

export default ImagePreview
