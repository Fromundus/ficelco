import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

const PdfPreview = ({ file }) => {
  return (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <Badge className={`w-fit cursor-pointer h-8 px-4`}>
                    {file.filename}
                </Badge>
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
