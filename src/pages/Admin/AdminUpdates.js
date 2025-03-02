import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import Modal from '../../components/Modal'
import { FaImage } from "react-icons/fa6";
import { IoClose } from 'react-icons/io5';

function AdminUpdates() {
    const [modal, setModal] = React.useState(false);
    const [isImage, setIsImage] = React.useState(false);

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
        setIsImage(false);
    }

    const toggleIsImage = () => {
        setIsImage(prev => !prev);
    }

    const removeImage = (e) => {
        e.stopPropagation();
        setIsImage(false);
    }

    return (
        <AdminPage title={"Updates"}>
            <div>
                <button className='p-2 bg-secondary hover:bg-secondary-darker rounded-lg text-white' onClick={openModal}>Create Post</button>
            </div>
            {modal && 
                <Modal onClose={closeModal} title={"Create Post"}>
                    <div className='flex flex-col gap-4 mb-4'>
                        <input
                            type="text"
                            name='header'
                            className='bg-light-background dark:bg-dark-accent border-0 focus:ring-0'
                            placeholder='Header'
                        />
                        <textarea 
                            className='bg-light-background dark:bg-dark-accent border-0 resize-none focus:ring-0' 
                            rows={4}  
                            name="caption" 
                            id=""
                            placeholder='Caption...'
                        >

                        </textarea>
                    </div>
                    {isImage && <div className='p-2 border border-light-line dark:border-dark-line rounded-lg'>
                        <label htmlFor='image' className='rounded-lg h-[200px] flex items-center justify-center bg-light-line dark:bg-dark-line flex-col gap-2 relative'>
                            <button className='absolute top-2 right-2 p-2 text-xl' onClick={removeImage}><IoClose /></button>
                            <FaImage className='text-2xl' />
                            <span className='font-semibold'>Add Photo</span>
                        </label>
                        <input className='hidden' id='image' type="file" />
                    </div>}
                    <div className='mt-4 border flex justify-between items-center p-2 rounded-lg border-light-line dark:border-dark-line'>
                        <span>Add to your post</span>
                        <button className='border border-light-line dark:border-dark-line hover:bg-light-hover dark:hover:bg-dark-hover p-2 rounded-lg flex items-center justify-center' onClick={toggleIsImage}>
                            <FaImage className='text-xl' />
                        </button>
                    </div>
                    <div className='w-full mt-4'>
                        <button className='h-[44px] p-2 rounded-lg bg-secondary w-full'>Post</button>
                    </div>
                </Modal>
            }
        </AdminPage>
    )
}

export default AdminUpdates