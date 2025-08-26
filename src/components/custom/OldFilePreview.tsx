import React, { ChangeEvent, useRef } from 'react'
import { Button } from '../ui/button';
import { FileIcon, FileText, FileUp, Trash, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import File from '@/types/File';

type Errors = Record<string, string>;

type Props = {
    oldFiles: File[];
    setOldFiles: React.Dispatch<React.SetStateAction<File[]>>
}

const OldFilePreview = ({ oldFiles, setOldFiles }: Props) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const removeFile = (index: number) => {
        const updated = oldFiles.filter((_, i) => i !== index);
        setOldFiles(updated);

        // reset input if no files remain
        if (updated.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
        }
    };

    const clearAllFiles = () => {
        setOldFiles([]);
        if (fileInputRef.current) {
        fileInputRef.current.value = "";
        }
    };
    
    return (
        <div className="flex flex-col gap-4">
            <div className='flex flex-col gap-3'>
                <Label>
                    Existing Files
                </Label>
            </div>

            {oldFiles.length > 0 && (
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {oldFiles.map((file, idx) => {
                        const isImage = file.mime_type.startsWith("image/");
                        const isPDF = file.mime_type === "application/pdf";

                        return (
                            <div key={idx} className="relative w-full">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className='flex flex-col gap-2'>
                                        <div className="flex flex-col gap-2 items-center border rounded-md p-2 cursor-pointer w-full">
                                            {isImage ? (
                                            <img
                                                src={file.url}
                                                alt={`Preview ${idx}`}
                                                className="w-full h-52 object-cover rounded-md border"
                                            />
                                            ) : isPDF ? (
                                            <div className="flex flex-col gap-4 items-center justify-center h-52 rounded-md w-full">
                                                <FileText className="w-10 h-10 text-red-500" />
                                                <div className='w-full text-center'>
                                                    <p className="text-xs truncate px-2">{file.filename}</p>
                                                </div>
                                            </div>
                                            ) : (
                                            <div className="flex flex-col gap-4 items-center justify-center h-52 rounded-md w-full">
                                                <FileIcon className="w-10 h-10" />
                                                <div className='w-full text-center'>
                                                    <p className="text-xs truncate px-2">{file.filename}</p>
                                                </div>
                                            </div>
                                            )}

                                        </div>
                                    </div>
                                </DialogTrigger>

                                <DialogContent aria-describedby="">
                                <DialogTitle>
                                    <p className='text-sm truncate'>{file.filename}</p>
                                </DialogTitle>
                                <div className="flex justify-center w-full">
                                    {isImage ? (
                                    // <img
                                    //     src={file.url}
                                    //     alt={`Preview ${idx}`}
                                    //     className="rounded-md border max-h-[80vh]"
                                    // />
                                    <div className='flex flex-col gap-4'>
                                        <TransformWrapper initialScale={1}>
                                        {({ zoomIn, zoomOut, resetTransform }) => (
                                            <>
                                            {/* Image */}
                                            <div className="border rounded-lg w-full flex justify-center items-center cursor-grab">
                                                <TransformComponent wrapperClass="w-full">
                                                    <img
                                                        src={file.url}
                                                        alt={`Preview ${idx}`}
                                                        className="h-[70vh] w-full object-contain"
                                                    />
                                                </TransformComponent>
                                            </div>

                                            {/* Controls */}
                                            <div className="flex gap-2 w-full justify-end">
                                                <Button
                                                onClick={() => resetTransform()}
                                                className=""
                                                variant="outline"
                                                >
                                                Reset Zoom
                                                </Button>
                                                <Button
                                                onClick={() => zoomOut()}
                                                className=""
                                                variant="outline"
                                                >
                                                <ZoomOut />
                                                </Button>
                                                <Button
                                                onClick={() => zoomIn()}
                                                className=""
                                                variant="outline"
                                                >
                                                <ZoomIn />
                                                </Button>
                                            </div>
                                            </>
                                        )}
                                        </TransformWrapper>

                                    </div>
                                    ) : isPDF ? (
                                    <iframe
                                        src={file.url}
                                        className="w-full h-[80vh] rounded-md"
                                        title={file.filename}
                                    />
                                    ) : (
                                    <div className="flex flex-col items-center justify-center w-full h-[40vh] rounded-md">
                                        <FileIcon className="w-12 h-12 text-gray-500" />
                                        <p className="mt-2 text-sm">{file.filename}</p>
                                    </div>
                                    )}
                                </div>
                                </DialogContent>
                            </Dialog>

                            {/* Remove button */}
                            <div className="bg-destructive w-fit rounded-full absolute top-2 right-2 p-0.5">
                                <X
                                className="size-5 cursor-pointer"
                                onClick={() => removeFile(idx)}
                                />
                            </div>
                            </div>
                        );
                    })}

                </div>
                <Button variant="outline" onClick={clearAllFiles}>
                    <Trash /> Remove All
                </Button>
            </div>
            )}
        </div>
    )
}

export default OldFilePreview
