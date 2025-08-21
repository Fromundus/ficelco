import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'

const PdfPreview = ({ file }) => {
  return (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <span className='cursor-pointer text-blue-500 underline'>{file.filename}</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{file.filename}</DialogTitle>
                </DialogHeader>
                <div className="">
                    <iframe
                        src={file.url}
                        className="w-full h-[80vh] rounded-md"
                        title={file.filename}
                    />
                </div>
            </DialogContent>
        </Dialog>
    </>
  )
}

export default PdfPreview
