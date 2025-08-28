import React, { ChangeEvent, useRef } from 'react'
import { Button } from '../ui/button';
import { FileIcon, FileText, FileUp, Trash, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

type Errors = Record<string, string>;

type Props = {
    files: File[];
    setFiles: React.Dispatch<React.SetStateAction<File[]>>;
    multiple?: boolean;
    accept?: string;
    errors?: Errors;
    setErrors?: React.Dispatch<React.SetStateAction<Errors>>;
}

const FileUpload = ({ errors, setErrors, files, setFiles, multiple = true, accept = "*/*" }: Props) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setErrors(null);
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);

            // validate: keep only image files
            if(accept !== "*/*"){
                const validFiles = selectedFiles.filter(file =>
                    file.type.startsWith(accept)
                );
    
                if (validFiles.length !== selectedFiles.length) {
                    toast({
                        title: `Only ${accept} are allowed!`,
                    });
                }

                setFiles((prev) => [...prev, ...validFiles]);
            } else {
                setFiles((prev) => [...prev, ...selectedFiles]);
            }
        }
    };


    const removeFile = (index: number) => {
        setErrors(null);
        const updated = files.filter((_, i) => i !== index);
        setFiles(updated);

        // reset input if no files remain
        if (updated.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
        }
    };

    const clearAllFiles = () => {
        setFiles([]);
        setErrors(null);
        if (fileInputRef.current) {
        fileInputRef.current.value = "";
        }
    };
    
    return (
        <div className="flex flex-col gap-4">
            <div className='flex flex-col gap-3'>
                <Label>
                    Upload Files
                </Label>
                <Label className="cursor-pointer" htmlFor="photos">
                    <Card className="bg-background">
                        <CardContent className="p-6">
                        <div className="w-full flex flex-col gap-4 items-center">
                            <FileUp />
                            <span>Click to upload files.</span>
                        </div>
                        </CardContent>
                    </Card>
                </Label>
            </div>

            <Input
                ref={fileInputRef}
                id="photos"
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleFileChange}
                className="hidden"
            />

            {files.length > 0 && (
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {files.map((file, idx) => {
                        const isImage = file.type.startsWith("image/");
                        const isPDF = file.type === "application/pdf";

                        return (
                            <div key={idx} className="relative w-full">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div className='flex flex-col gap-2'>
                                        <div className="flex flex-col gap-2 items-center border rounded-md p-2 cursor-pointer w-full">
                                            {isImage ? (
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Preview ${idx}`}
                                                className="w-full aspect-square object-cover rounded-md border"
                                            />
                                            ) : isPDF ? (
                                            <div className="flex flex-col gap-4 items-center justify-center aspect-square rounded-md w-full">
                                                <FileText className="w-14 h-14 text-red-500" />
                                                <div className='w-full text-center'>
                                                    <p className="text-xs truncate px-2">{file.name}</p>
                                                </div>
                                            </div>
                                            ) : (
                                            <div className="flex flex-col gap-4 items-center justify-center aspect-square rounded-md w-full">
                                                <FileIcon className="w-14 h-14" />
                                                <div className='w-full text-center'>
                                                    <p className="text-xs truncate px-2">{file.name}</p>
                                                </div>
                                            </div>
                                            )}

                                        </div>
                                        {errors?.[`files.${idx}`] && (
                                            <span className="text-destructive text-xs">
                                                {errors[`files.${idx}`]}
                                            </span>
                                        )}
                                    </div>
                                </DialogTrigger>

                                <DialogContent aria-describedby="">
                                <DialogTitle>
                                    <p className='text-sm truncate'>{file.name}</p>
                                </DialogTitle>
                                <div className="flex justify-center w-full">
                                    {isImage ? (
                                    // <img
                                    //     src={URL.createObjectURL(file)}
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
                                                        src={URL.createObjectURL(file)}
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
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-[80vh] rounded-md"
                                        title={file.name}
                                    />
                                    ) : (
                                    <div className="flex flex-col items-center justify-center w-full h-[40vh] rounded-md">
                                        <FileIcon className="w-12 h-12 text-gray-500" />
                                        <p className="mt-2 text-sm">{file.name}</p>
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

export default FileUpload
