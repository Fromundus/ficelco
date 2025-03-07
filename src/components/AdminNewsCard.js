import { format } from 'date-fns'
import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useOutletContext } from 'react-router-dom'
import { BsThreeDots } from "react-icons/bs";
import Modal from './Modal';
import axiosClient from '../axios-client';
import getCookie from '../lib/getCookie';
import ButtonLoader from './ButtonLoader';
import { FaImage } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import { FaGlobeAsia } from "react-icons/fa";
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { FaPaperclip } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa";
import Input from './Input';
import FilePreview from './FilePreview';
import FileInput from './FileInput';
import ActionButton from './ActionButton';

function AdminNewsCard({ link, image, date, title, header, description, hidden, old_images, old_files, setNoScroll, post_id, setPosts }) {
    const { setPostYears } = useOutletContext();
    const [isDelete, setIsDelete] = React.useState(false);
    const [dropdown, setDropdown] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [isImage, setIsImage] = React.useState(false);
    const [isFile, setIsFile] = React.useState(false);
    const [files, setFiles] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [preview, setPreview] = React.useState([]);
    const [data, setData] = React.useState({
        title: title,
        header: header,
    });

    const [newDescription, setNewDescription] = React.useState(description);

    const [errors, setErrors] = React.useState({});

    const dropDownToggle = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setDropdown(prev => !prev);
    };

    const openModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setModal(true);
        setNoScroll(true);
    }

    const closeModal = () => {
        setModal(false);
        setIsImage(false);
        setNoScroll(false);
        setImages([]);
        setPreview([]);
        setErrors({});
    }
    
    const openDeleteModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDelete(true);
        setNoScroll(true);
    }

    const closeDeleteModal = () => {
        setIsDelete(false);
        setNoScroll(false);
    }

    const toggleIsImage = () => {
        setIsImage(prev => !prev);
        setImages([]);
        setPreview([]);
        setErrors({});
    }

    const removeImage = (e) => {
        e.stopPropagation();
        setImages([]);
        setPreview([]);
        setIsImage(false);
        setErrors({});
    }

    const toggleIsFile = () => {
        setIsFile(prev => !prev);
        setFiles([]);
        setErrors({});
    }

    const removeFile = (e) => {
        e.stopPropagation();
        setIsFile(false);
        setFiles([]);
        setErrors({});
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        });

        setErrors( (prev) => {
            return {
                ...prev,
                [name]: ""
            }
        });
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreview(previews);
        setErrors({});
    }

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFiles(files);
        setErrors({});
    }

    // console.log(images);

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        const updatedPreview = [...preview];

        updatedImages.splice(index, 1);
        updatedPreview.splice(index, 1);

        setImages(updatedImages);
        setPreview(updatedPreview);
        setErrors({});
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];

        updatedFiles.splice(index, 1);

        setFiles(updatedFiles);
        setErrors({});
    };

    const handleUpload = async () => {
        setLoading(true);
        setErrors({});

        const formData = new FormData();

        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        files.forEach((file, index) => {
            formData.append(`files[${index}]`, file);
        });

        formData.append('title', data.title);
        formData.append('header', data.header);
        formData.append('description', newDescription);

        // console.log(data);

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.post(`/api/post-update/${post_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setImages([]);
                setFiles([]);
                setPreview([]);
                setLoading(false);
                setPosts(res.data.data);
                setPostYears(res.data.years);
                setModal(false);
                setNoScroll(false);
                setIsImage(false);
                setIsFile(false);
                setDropdown(false);

                toast(res.data.message);
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.message);
            setLoading(false);

            if(err.response.status === 413){
                setErrors((prev) => {
                    return {
                        ...prev,
                        images: "Image and Contents Too Large"
                    }
                });
            }
        }
    };

    const handleDelete = async () => {
        setLoading(true);

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.delete(`/api/post-delete/${post_id}`, {
                headers: {
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setLoading(false);
                setPosts(res.data.data);
                setPostYears(res.data.years);
                setNoScroll(false);
                setIsDelete(false);

                toast(res.data.message);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    const handleHide = async (e, hidden) => {
        e.stopPropagation();
        e.preventDefault();
        setLoading(true);

        const data = {
            hidden: hidden
        }

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.put(`/api/post-hide/${post_id}`, data, {
                headers: {
                    withCredentials: true,
                    'X-XSRF-TOKEN': getCookie(),
                }
            });

            if(res.status === 200){
                console.log(res);
                setLoading(false);
                setPosts(res.data.data);
                setDropdown(false);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    };

    return (
        <>
            <Link to={link} className='p-2 w-full lg:w-1/2 rounded-lg'>
                <div className='relative p-4 rounded-lg bg-light-background dark:bg-dark-accent h-full border border-light-line dark:border-0 flex flex-col'>
                    <div className='w-full text-xl flex justify-end'>
                        <button className='p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded-full' onClick={dropDownToggle}>
                            <BsThreeDots  />
                        </button>
                        <button className='p-2 hover:bg-light-hover dark:hover:bg-dark-hover rounded-full' onClick={openDeleteModal}>
                            <IoClose />
                        </button>
                    </div>
                    <div className='flex flex-col mb-4'>
                        <div className='flex flex-col gap-0'>
                            <span className='font-semibold text-lg truncate'>{title}</span>
                            <span className='font-semibold line-clamp-3'>{header}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-xs italic'>{format(new Date(date), "MMMM d, y")}</span>
                            <span className='text-lg'>&#xb7;</span>
                            <span className='text-xs'>{hidden ? <FaLock /> : <FaGlobeAsia />}</span>
                        </div>
                        <div className='line-clamp-4' dangerouslySetInnerHTML={{ __html: description }} />
                    </div>
                    <div className='mt-auto'>
                        <div className='aspect-square'>
                            <img className='h-full w-full object-cover rounded-lg mt-auto' src={image} alt="" />
                        </div>
                    </div>
                    {dropdown && <div className='absolute top-12 text right-[70px] flex flex-col w-[150px] bg-light-background dark:bg-dark-line rounded-lg py-2 border border-light-line dark:border-0 shadow-lg'>
                        <button
                            className='p-2 hover:bg-light-hover dark:hover:bg-dark-hover'
                            onClick={openModal}
                            disabled={loading}
                        >
                            Edit Post
                        </button>
                        <button
                            className='p-2 hover:bg-light-hover dark:hover:bg-dark-hover flex items-center justify-center gap-2'
                            onClick={(e) => handleHide(e, hidden ? false : true)}
                            disabled={loading}
                        >
                            {loading ? hidden ? "Showing..." : "Hidding..." : hidden ? "Show Post" : "Hide Post"}
                        </button>
                    </div>}
                </div>
            </Link>


            {modal &&
                <Modal onClose={closeModal} title={"Edit Post"} loading={loading}>
                    <div className='flex flex-col gap-4 mb-4'>
                        <Input 
                            type="text"
                            name='title'
                            className=' font-semibold'
                            placeholder='Title'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.title}
                            errors={errors.title}
                        />
                        
                        <Input 
                            type="text"
                            name='header'
                            className='bg-light-background dark:bg-dark-accent focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm rounded-lg h-11 border-light-line dark:border-dark-line'
                            placeholder='Header'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.header}
                            errors={errors.header}
                        />

                        <ReactQuill value={newDescription} onChange={setNewDescription} className="mb-4" />
                        {errors.description && <span className='text-red-500'>{errors.description}</span>}

                    </div>

                    {!isImage && <FilePreview preview={old_images} type={"old_images"} />}

                    <FilePreview preview={preview} handleRemoveFile={handleRemoveImage} errors={errors} type={"image"} />

                    {!isFile && <FilePreview preview={old_files} type={"old_files"} />}

                    <FilePreview preview={files} handleRemoveFile={handleRemoveFile} errors={errors} type={"pdf"} />

                    {isImage && <FileInput
                        id="image"
                        loading={loading}
                        label={"Add Image/s"}
                        accept={"image/*"}
                        multiple={"multiple"}
                        handleFileChange={handleImageChange}
                        removeFile={removeImage}
                        errors={errors.images}
                        type="image"
                    />}

                    {isFile && <FileInput
                        id="file"
                        loading={loading}
                        label={"Add File/s"}
                        accept={"application/pdf"}
                        multiple={"multiple"}
                        handleFileChange={handleFileChange}
                        removeFile={removeFile}
                        errors={errors.files}
                        type="pdf"
                    />}

                    <div className='mt-4 border flex justify-between items-center p-2 rounded-lg border-light-line dark:border-dark-line'>
                        <span>Add to your post.</span>
                        <div className='flex items-center gap-2'>
                            <button className='border border-light-line dark:border-dark-line hover:bg-light-hover dark:hover:bg-dark-hover p-2 rounded-lg flex items-center justify-center' onClick={toggleIsFile} disabled={loading}>
                                <FaPaperclip className='text-xl' />
                            </button>
                            <button className='border border-light-line dark:border-dark-line hover:bg-light-hover dark:hover:bg-dark-hover p-2 rounded-lg flex items-center justify-center' onClick={toggleIsImage} disabled={loading}>
                                <FaImage className='text-xl' />
                            </button>
                        </div>
                    </div>
                    <div className='w-full mt-4 flex gap-4'>
                        <button
                            className='h-[44px] w-full bg-white hover:bg-light-hover text-black p-2 rounded-lg border border-light-line dark:border-0'
                            onClick={closeModal}
                            disabled={loading}
                        >
                            Cancel
                        </button>

                        <ActionButton
                            label={"Save"}
                            processLabel={"Saving"}
                            loading={loading}
                            disabled={!data.title || !data.header || !newDescription || loading}
                            onClick={handleUpload}
                            className={"bg-secondary hover:bg-secondary-darker text-white"}
                        />
                    </div>
                </Modal>
            }

            {isDelete && 
                <Modal onClose={closeDeleteModal} title={"Delete this post?"} loading={loading}>
                    <div className='flex flex-col gap-4 mb-4'>
                        <input
                            type="text"
                            name='title'
                            className='bg-light-background dark:bg-dark-accent focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm rounded-lg h-11 border-light-line dark:border-dark-line font-semibold'
                            placeholder='Title'
                            onChange={handleChange}
                            disabled={true}
                            value={data.title}
                        />

                        <input
                            type="text"
                            name='header'
                            className='bg-light-background dark:bg-dark-accent focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm rounded-lg h-11 border-light-line dark:border-dark-line'
                            placeholder='Header'
                            onChange={handleChange}
                            disabled={true}
                            value={data.header}
                        />

                        <div className='p-4' dangerouslySetInnerHTML={{ __html: description }} />
                    </div>

                    <FilePreview preview={old_images} type={"old_images"} />

                    <FilePreview preview={old_files} type={"old_files"} />

                    <div className='flex w-full gap-4 mt-4'>
                        <button
                            className='h-[44px] w-full bg-white hover:bg-light-hover text-black p-2 rounded-lg border border-light-line dark:border-0'
                            onClick={closeDeleteModal}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <ActionButton
                            label={"Delete"}
                            processLabel={"Deleting"}
                            loading={loading}
                            disabled={loading}
                            onClick={handleDelete}
                            className={"bg-red-500 hover:bg-red-700 text-white"}
                        />
                    </div>
                </Modal>
            }
        </>
    )
}

export default AdminNewsCard