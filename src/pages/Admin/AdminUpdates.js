import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import Modal from '../../components/Modal'
import { FaImage } from "react-icons/fa6";
import { IoClose } from 'react-icons/io5';
import axiosClient from '../../axios-client';
import getCookie from '../../lib/getCookie';
import ButtonLoader from '../../components/ButtonLoader';
import NewsCard from '../../components/NewsCard';
import { useOutletContext } from 'react-router-dom';
import NewsCardSkeleton from '../../components/NewsCardSkeleton';
import AdminNewsCard from '../../components/AdminNewsCard';

function AdminUpdates() {
    const { posts, setPosts, postLoading } = useOutletContext();
    const [noScroll, setNoScroll] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [modal, setModal] = React.useState(false);
    const [isImage, setIsImage] = React.useState(false);
    const [images, setImages] = React.useState([]);
    const [preview, setPreview] = React.useState([]);
    const [data, setData] = React.useState({
        title: "",
        header: "",
        description: "",
    });

    const [errors, setErrors] = React.useState({});
    
    const openModal = () => {
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

    const handleRemoveImage = (index) => {
        const updatedImages = [...images];
        const updatedPreview = [...preview];

        updatedImages.splice(index, 1);
        updatedPreview.splice(index, 1);

        setImages(updatedImages);
        setPreview(updatedPreview);
        setErrors({});
    };

    // console.log(errors);

    const handleUpload = async () => {
        setLoading(true);
        setErrors({});

        const formData = new FormData();

        images.forEach((image, index) => {
            formData.append(`images[${index}]`, image);
        });

        formData.append('title', data.title);
        formData.append('header', data.header);
        formData.append('description', data.description);

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
                setPreview([]);
                setData({
                    title: "",
                    header: "",
                    description: "",
                });
                setLoading(false);
                setPosts(res.data.data);
                setModal(false);
                setNoScroll(false);
                setIsImage(false)
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

    const renderPosts = posts?.map( (item) => {
        return (
            // <NewsCard
            //     key={item.id}
            //     link={`${item.id}`}
            //     date={item.created_at}
            //     title={item.title}
            //     header={item.header}
            //     image={`http://localhost:8000/storage/${item.images[0]?.path ? item.images[0]?.path : ""}`}
            //     description={item.description}
            // />

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
                setNoScroll={setNoScroll}
                post_id={item.id}
                setPosts={setPosts}
            />
        )
    });

    return (
        <AdminPage title={"Updates"} className={`${noScroll && "no-scroll"}`}>
            <div className='w-full'>
                <button className='p-2 bg-secondary hover:bg-secondary-darker rounded-lg text-white w-full' onClick={openModal}>Create New Post</button>
            </div>
            {!postLoading ? 
            <div className='flex flex-wrap mt-4'>
                {renderPosts}
            </div>
            :
            <div className='flex flex-wrap mt-4'>
                <NewsCardSkeleton />
                <NewsCardSkeleton />
                <NewsCardSkeleton />
            </div>
            }
            {modal && 
                <Modal onClose={closeModal} title={"Create New Post"} loading={loading}>
                    <div className='flex flex-col gap-4 mb-4'>
                        <input
                            type="text"
                            name='title'
                            className='bg-light-background dark:bg-dark-accent border-0 focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm font-semibold'
                            placeholder='Title'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.title}
                        />
                        {errors.title && <span className='text-red-500'>{errors.title}</span>}

                        <input
                            type="text"
                            name='header'
                            className='bg-light-background dark:bg-dark-accent border-0 focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm'
                            placeholder='Header'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.header}
                        />
                        {errors.header && <span className='text-red-500'>{errors.header}</span>}

                        <textarea 
                            className='bg-light-background dark:bg-dark-accent border-0 resize-none focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm' 
                            rows={4}  
                            name="description" 
                            id=""
                            placeholder='Description...'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.description}
                        >

                        </textarea>
                        {errors.description && <span className='text-red-500'>{errors.description}</span>}

                    </div>
                    <div className="flex flex-wrap">
                        {preview.map((src, index) => (
                            <div key={index} className='w-full md:w-1/2 lg:w-1/2 p-1'>
                                <div className='rounded-lg relative border border-light-line dark:border-dark-line'>
                                    <img src={src} alt="Preview" className="rounded-lg" />
                                    <button className='absolute top-2 right-2 p-2 rounded-full bg-light-hover dark:bg-dark-hover' onClick={() => handleRemoveImage(index)}><IoClose /></button>
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
                    {isImage &&
                        <div className='p-2 border border-light-line dark:border-dark-line rounded-lg mt-2'>

                            <label htmlFor='image' className='rounded-lg h-[100px] flex items-center justify-center bg-light-line dark:bg-dark-line flex-col gap-2 relative'>
                                <button className='absolute top-0 right-0 p-2 text-xl' onClick={removeImage} disabled={loading}><IoClose /></button>
                                <FaImage className='text-2xl' />
                                <span className='font-semibold'>{images.length > 0 ? "Change Photos" : "Add Photos"}</span>
                            </label>

                            <input 
                                className='hidden' 
                                id='image' 
                                type="file" 
                                accept='image/*'
                                multiple 
                                onChange={handleImageChange}
                                disabled={loading}
                            />
                        </div>
                    }
                    {errors.images && <span className='text-red-500'>{errors.images}</span>}

                    <div className='mt-4 border flex justify-between items-center p-2 rounded-lg border-light-line dark:border-dark-line'>
                        <span>Add to your post</span>
                        <button className='border border-light-line dark:border-dark-line hover:bg-light-hover dark:hover:bg-dark-hover p-2 rounded-lg flex items-center justify-center' onClick={toggleIsImage} disabled={loading}>
                            <FaImage className='text-xl' />
                        </button>
                    </div>
                    <div className='w-full mt-4'>
                        <button
                            className={`h-[44px] p-2 rounded-lg w-full flex items-center justify-center font-semibold gap-2 ${!data.title || !data.header || !data.description || loading ? "bg-light-accent text-dark-line cursor-not-allowed" : "bg-secondary text-white"}`}
                            onClick={handleUpload}
                            disabled={!data.title || !data.header || !data.description || loading }
                        >
                            {loading ? "Posting" : "Post"}
                            {loading && <ButtonLoader />}
                        </button> 
                    </div>
                </Modal>
            }
        </AdminPage>
    )
}

export default AdminUpdates