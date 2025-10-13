import React, { ChangeEvent, useRef, useState } from 'react'
import { Button } from '../ui/button';
import { FileIcon, FileText, FileUp, Trash, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '../ui/dialog';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import File from '@/types/File';
import { Checkbox } from '../ui/checkbox';
import ButtonWithLoading from './ButtonWithLoading';
import Modal from './Modal';
import api, { getCsrf } from '@/api/axios';

type Errors = Record<string, string>;

type Props = {
    oldFiles: File[];
    setOldFiles: React.Dispatch<React.SetStateAction<File[]>>;
    refetch: () => void;
}

const OldFilePreview = ({ oldFiles, setOldFiles, refetch }: Props) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [selected, setSelected] = useState<number[]>([]);

    const toggleSelect = (id: number) => {
        setSelected((prev) =>
        prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selected.length === oldFiles.length) {
        setSelected([]);
        } else {
        setSelected(oldFiles.map((u) => u.id));
        }
    };

    const bulkDelete = async () => {
        if (!selected.length) return;
        setLoading(true);
        
        try {
        await getCsrf();
        await api.delete("/api/files", { data: { ids: selected } });
    
        toast({
            title: "Deleted Successfully",
        });
    
        setSelected([]);

        setDeleteModal(false);
        refetch();
    
        } catch (err) {
        console.log(err);
        toast({
            title: err.response.status,
            description: err.response.data.message,
            variant: "destructive",
        });
        setLoading(false);
        }
    };
    
    return (
        <div className="flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
                <Label>
                    Existing Files
                </Label>
                <div className='flex items-center justify-between'>
                    <Label className='flex items-center gap-2 cursor-pointer'>
                        <Checkbox
                            checked={selected.length === oldFiles.length && oldFiles.length > 0}
                            onCheckedChange={selectAll}
                        />
                        Select All
                    </Label>
                    <Modal disabled={selected.length === 0 || loading} title="Delete Accounts" buttonLabel={<Trash />} buttonClassName="w-10 h-10 bg-destructive text-white hover:bg-destructive/50" open={deleteModal} setOpen={setDeleteModal}>
                        <p>Are you sure you want to delete?</p>
                        <div className="w-full grid grid-cols-2 gap-2">
                        <ButtonWithLoading className="w-full" loading={loading} disabled={loading || selected.length === 0} onClick={bulkDelete}>
                            Yes
                        </ButtonWithLoading>
                        <Button variant="outline" onClick={() => setDeleteModal(false)}>
                            Cancel
                        </Button>
                        </div>
                    </Modal>
                </div>
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
                                        <FileIcon className="w-10 h-10 text-gray-500" />
                                        <p className="mt-2 text-sm">{file.filename}</p>
                                    </div>
                                    )}
                                </div>
                                </DialogContent>
                            </Dialog>

                            {/* Remove button */}
                            {/* <div className="bg-destructive w-fit rounded-full absolute top-2 right-2 p-0.5">
                                <X
                                className="size-5 cursor-pointer"
                                onClick={() => removeFile(idx)}
                                />
                            </div> */}
                            <div className='absolute top-4 left-4 bg-background p-1 flex items-center justify-center rounded bg-opacity-50'>
                                <Checkbox
                                    checked={selected.includes(file.id)}
                                    onCheckedChange={() => toggleSelect(file.id)}
                                />
                            </div>
                            </div>
                        );
                    })}

                </div>
                {/* <Button variant="outline" onClick={clearAllFiles}>
                    <Trash /> Remove All
                </Button> */}
            </div>
            )}
        </div>
    )
}

export default OldFilePreview
