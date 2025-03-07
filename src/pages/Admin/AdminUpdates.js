import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import Modal from '../../components/Modal'
import { FaImage } from "react-icons/fa6";
import { IoClose } from 'react-icons/io5';
import axiosClient from '../../axios-client';
import getCookie from '../../lib/getCookie';
import ButtonLoader from '../../components/ButtonLoader';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import NewsCardSkeleton from '../../components/NewsCardSkeleton';
import AdminNewsCard from '../../components/AdminNewsCard';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { FaPaperclip } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa";
import Input from '../../components/Input';
import FilePreview from '../../components/FilePreview';
import ActionButton from '../../components/ActionButton';
import FileInput from '../../components/FileInput';

function AdminUpdates() {
    const { posts, setPosts, postLoading, postYears, setPostYears} = useOutletContext();

    const [noScroll, setNoScroll] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [modal, setModal] = React.useState(false);

    const [isImage, setIsImage] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const [preview, setPreview] = React.useState([]);

    const [isFile, setIsFile] = React.useState(false);
    const [files, setFiles] = React.useState([]);

    const [data, setData] = React.useState({
        title: "",
        header: "",
    });
    const [description, setDescription] = React.useState("");

    const [errors, setErrors] = React.useState({});

    const [searchParams, setSearchParams] = useSearchParams();
    const year = searchParams.get('year');

    const handleSearchParams = (year) => {
        setSearchParams({ year: year })
    }
    
    const openModal = () => {
        setModal(true);
        setNoScroll(true);
    }

    const closeModal = () => {
        setModal(false);
        setIsImage(false);
        setIsFile(false);
        setNoScroll(false);
        setData({
            title: "",
            header: "",
        });
        setDescription("");
        setImages([]);
        setFiles([]);
        setPreview([]);
        setErrors({});
    }

    //IMAGE FUNCTIONS 

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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreview(previews);
        setErrors({});
    }

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        const updatedPreview = [...preview];

        updatedImages.splice(index, 1);
        updatedPreview.splice(index, 1);

        setImages(updatedImages);
        setPreview(updatedPreview);
        setErrors({});
    };

    //PDF FUNCTIONS

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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setFiles(files);
        setErrors({});
    }

    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];

        updatedFiles.splice(index, 1);

        setFiles(updatedFiles);
        setErrors({});
    };

    // INPUT FUNCTION

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
        formData.append('description', description);

        console.log(data);

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.post('/api/post', formData, {
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
                setData({
                    title: "",
                    header: "",
                    description: "",
                });
                setLoading(false);
                setPosts(res.data.data);
                setPostYears(res.data.years);
                setModal(false);
                setNoScroll(false);
                setIsImage(false);
                setIsFile(false);

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

    // FILTERED UPDATES

    const filteredPosts = posts?.filter((item) => {
        const searchYear = year ? parseInt(year) : null;
        const postYear = new Date(item.created_at).getFullYear();
    
        if (searchYear) {
            // Filter by year if a year is selected
            return postYear === searchYear;
        } else {
            // Return all posts when no year is selected
            return true;
        }
    });

    //RENDER COMPONENTS

    const renderPosts = filteredPosts?.map( (item) => {
        return (
            <AdminNewsCard
                key={item.id}
                link={`${item.id}`}
                date={item.created_at}
                title={item.title}
                header={item.header}
                image={`http://localhost:8000/storage/${item.images[0]?.path ? item.images[0]?.path : ""}`}
                description={item.description}
                hidden={item.hidden}
                old_images={item.images}
                old_files={item.files}
                setNoScroll={setNoScroll}
                post_id={item.id}
                setPosts={setPosts}
            />
        )
    });

    const renderFilterYears = postYears?.map( (item) => {
        return (
            <button 
                key={item}
                onClick={() => handleSearchParams(`${item}`)} 
                className={`w-full text-start rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover hover:dark:bg-dark-hover ${year === `${item}` && "bg-light-hover dark:bg-dark-hover"}`}
            >
                {item}
            </button>
        )
    });

    return (
        <AdminPage title={"Updates"} className={`${noScroll && "no-scroll"}`}>
            
            <div className='w-full relative bg-light-background dark:bg-dark-background'>
                <div className='absolute left-0 md:right-56 lg:right-64 bg-light-background dark:bg-dark-background'>
                    <div className='px-4 w-full'>
                        <button className='p-2 bg-secondary hover:bg-secondary-darker rounded-lg text-white w-full h-11' onClick={openModal}>Create New Post</button>
                    </div>

                    {!postLoading ? 
                    <div className='flex flex-wrap mt-4 bg-light-background dark:bg-dark-background px-2'>
                        {renderPosts}
                    </div>
                    :
                    <div className='flex flex-wrap mt-4 bg-light-background dark:bg-dark-background'>
                        <NewsCardSkeleton />
                        <NewsCardSkeleton />
                    </div>
                    }
                </div>
                <div className='relative'>
                    <div className="fixed top-[62px] right-0 overflow-y-auto custom-scrollbar h-screen flex-col justify-between border-s border-light-line dark:border-dark-line bg-light-background dark:bg-dark-accent text-light-foreground dark:text-dark-foreground md:w-56 lg:w-64 hidden md:flex lg:flex p-4">
                        <div className='absolute left-0 right-0 top-0 border-b border-light-line dark:border-dark-line px-4 py-2'>
                            <span className='text-lg'>Filters</span>
                        </div>
                        <div className='mt-12 w-full flex flex-col gap-1'>
                            <button 
                                onClick={() => setSearchParams("")} 
                                className={`w-full text-start rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover hover:dark:bg-dark-hover ${year === null && "bg-light-hover dark:bg-dark-hover"}`}
                            >
                                All
                            </button>

                            {renderFilterYears}
                        </div>
                        
                    </div>
                </div>

            </div>

            {modal && 
                <Modal onClose={closeModal} title={"Create New Post"} loading={loading}>
                    <div className='flex flex-col gap-4 mb-4'>
                        <Input 
                            type="text"
                            name='title'
                            className='font-semibold'
                            placeholder='Title'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.title}
                            errors={errors.title}
                        />

                        <Input 
                            type="text"
                            name='header'
                            placeholder='Header'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.header}
                            errors={errors.header}
                        />

                        <ReactQuill value={description} onChange={setDescription} className="mb-4" />
                        {errors.description && <span className='text-red-500'>{errors.description}</span>}
                    </div>

                    <FilePreview preview={preview} handleRemoveFile={handleRemoveImage} errors={errors} type={"image"} />

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
                    <div className='w-full mt-4'>
                        <ActionButton
                            label={"Post"}
                            processLabel={"Posting"}
                            loading={loading}
                            disabled={!data.title || !data.header || !description || loading}
                            onClick={handleUpload}
                            className={"bg-secondary hover:bg-secondary-darker text-white"}
                        />
                    </div>
                </Modal>
            }
        </AdminPage>
    )
}

export default AdminUpdates