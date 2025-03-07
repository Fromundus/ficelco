import React from 'react'
import { IoClose } from 'react-icons/io5';
import { FaRegFile } from "react-icons/fa";
import { FaFilePdf } from 'react-icons/fa6';

function FilePreview({ preview, handleRemoveFile, errors, type }) {
    return (
        <>
            {type === "image" && 
            <div className="flex flex-wrap">
                {preview.map((src, index) => (
                    <div key={index} className='w-full md:w-1/2 lg:w-1/2 p-1'>
                        <div className='rounded-lg relative border border-light-line dark:border-dark-line'>
                            <img src={src} alt="Preview" className="rounded-lg" />
                            <button className='absolute top-2 right-2 p-2 rounded-full bg-light-hover dark:bg-dark-hover' onClick={() => handleRemoveFile(index)}><IoClose /></button>
                        </div>
                        {errors[`images.${index}`] && (
                            <div className="text-red-500 mt-2">
                                {errors[`images.${index}`].map((msg, i) => (
                                    <p key={i}>{msg}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            }

            {type === "pdf" && <div className="flex flex-wrap">
                {preview.map((src, index) => (
                    <div key={index} className='w-full md:w-1/2 lg:w-1/2 p-1'>
                        <div className='p-2 rounded-lg relative border border-light-line dark:border-dark-line flex items-center justify-center flex-col gap-2 h-full'>
                            <FaFilePdf className='text-5xl' />
                            <span className='text-xs line-clamp-3 text-center'>{src.name}</span>
                            <button className='absolute -top-2 -right-2 p-2 rounded-full bg-light-hover dark:bg-dark-hover' onClick={() => handleRemoveFile(index)}><IoClose /></button>
                        </div>
                        {errors[`files.${index}`] && (
                            <div className="text-red-500 mt-2">
                                {errors[`files.${index}`].map((msg, i) => (
                                    <p key={i}>{msg}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>}

            {type === "old_images" && <div className="flex flex-wrap">
                {preview?.map((item, index) => (
                    <div key={index} className='w-full md:w-1/2 lg:w-1/2 p-1'>
                        <div className='rounded-lg border border-light-line dark:border-dark-line'>
                            <img src={`http://localhost:8000/storage/${item.path}`} alt="Preview" className="rounded-lg" />
                        </div>
                    </div>
                ))}
            </div>}

            {type === "old_files" && <div className="flex flex-wrap">
                {preview?.map((item, index) => (
                    <div key={index} className='w-full p-1'>
                        <div className='p-2 rounded-lg relative border border-light-line dark:border-dark-line flex items-center justify-center flex-col gap-2 h-full'>
                            <iframe
                                src={`http://localhost:8000/storage/${item.path}`}
                                title={`pdf-preview-${index}`}
                                className="w-full h-96"
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>}
        </>
    )
}

export default FilePreview