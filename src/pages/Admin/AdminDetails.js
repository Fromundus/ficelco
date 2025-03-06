import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import { useStateContext } from '../../context/ContextProvider';
import { FaCamera, FaImage } from "react-icons/fa";
import Modal from '../../components/Modal';
import { IoClose } from 'react-icons/io5';
import ButtonLoader from '../../components/ButtonLoader';
import axiosClient from '../../axios-client';
import getCookie from '../../lib/getCookie';
import LineSkeleton from '../../components/LineSkeleton';
import { toast } from 'react-toastify';

function AdminDetails() {
    const { name, email, role, id, profilePic, setRole, setName, setId, setEmail, setProfilePic } = useStateContext();
    const [modal, setModal] = React.useState(false);
    const [noScroll, setNoScroll] = React.useState(false);
    const [image, setImage] = React.useState([]);
    const [preview, setPreview] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [errors, setErrors] = React.useState({});
    const [editModal, setEditModal] = React.useState(false);

    const [data, setData] = React.useState({
        name: name,
        email: email
    });

    const firstLetter = name?.slice(0, 1).toUpperCase();

    const openModal = () => {
        setModal(true);
        setNoScroll(true);
        setImage([]);
        setPreview([]);
    }

    const closeModal = () => {
        setModal(false);
        setNoScroll(false);
        setImage([]);
        setPreview([]);
    }

    const openEditModal = () => {
        setEditModal(true);
        setNoScroll(true);
    }

    const closeEditModal = () => {
        setEditModal(false);
        setNoScroll(false);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the first file
        if (file) {
            setImage([file]); // Store it as an array with one item
            setPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    };

    const removeImage = () => {
        setImage([]);
        setPreview([]);
    };

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

        formData.append('image', image[0]);

        console.log(formData);

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.post(`/api/user-update-profile-pic/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setImage([]);
                setPreview([]);
                setLoading(false);
                setModal(false);
                setNoScroll(false);

                setName(res.data.data.name);
                setRole(res.data.data.role);
                setId(res.data.data.id);
                setEmail(res.data.data.email);
                setProfilePic(res.data.data.profile_pic);

                toast(`${res.data.message}`);
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

    const handleEditProfile = async () => {
        setLoading(true);
        setErrors({});

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.put(`/api/user-update/${id}`, data, {
                headers: {
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setLoading(false);
                setEditModal(false);
                setNoScroll(false);

                setName(res.data.data.name);
                setRole(res.data.data.role);
                setId(res.data.data.id);
                setEmail(res.data.data.email);
                setProfilePic(res.data.data.profile_pic);

                toast(`${res.data.message}`);
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.message);
            setLoading(false);
        }
    };

    return (
        <AdminPage title={"Details"}>
            {name ? 
                <div className='flex justify-center flex-col items-center'>
                    {profilePic ?
                        <div className='relative border border-light-line dark:border-dark-line size-60 flex items-center justify-center rounded-full aspect-square'>
                            <img className='object-cover rounded-full h-full w-full' src={`http://localhost:8000/storage/${profilePic}`} alt="" />
                            <div className='absolute bottom-4 right-4 border border-light-line dark:border-dark-line bg-light-background dark:bg-dark-accent p-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover' onClick={openModal}>
                                <FaCamera className='text-lg cursor-pointer' />
                            </div>
                        </div>
                        :
                        <div className='relative p-4 border bg-light-hover dark:bg-dark-hover border-light-line dark:border-dark-line size-60 flex items-center justify-center rounded-full'>
                            <span className='text-9xl font-semibold'>{firstLetter}</span>
                            <div className='absolute bottom-4 right-4 border border-light-line dark:border-dark-line bg-light-background dark:bg-dark-accent p-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover' onClick={openModal}>
                                <FaCamera className='text-lg cursor-pointer' />
                            </div>
                        </div>
                    }
                    <div className='flex flex-col items-center mt-4'>
                        <span className='font-semibold text-lg flex items-center gap-2'>{name} <span className='text-xs'>({role === "f2" && "Admin"})</span></span>
                        <span>{email}</span>

                        <button className='mt-4 p-2 px-4 bg-secondary hover:bg-secondary-darker text-white rounded-lg h-11' onClick={openEditModal}>Edit Profile</button>
                    </div>
                </div>
                :
                <div className='flex w-full items-center flex-col'>
                    <div className='p-4 border bg-light-hover dark:bg-dark-hover border-light-line dark:border-dark-line size-60 flex items-center justify-center rounded-full animate-pulse'>
                    </div>
                    <div className='flex flex-col gap-2 mt-4 w-full items-center'>
                        <LineSkeleton className={"w-40 h-4"} speed={"fast"} />
                        <LineSkeleton className={"w-40 h-2"} speed={"slow"} />
                    </div>
                </div>
                
            }
            {modal && <Modal title="Update Profile Picture" onClose={closeModal}>
                {preview.length > 0 && 
                    <div className='flex aspect-square relative border-2 rounded-full border-light-line dark:border-dark-line'>
                        <img src={preview} alt="Preview" className="object-cover rounded-full h-full w-full border" />
                        <div className='absolute top-12 right-12 border border-light-line dark:border-dark-line bg-light-background dark:bg-dark-accent p-2 rounded-full hover:bg-light-hover dark:hover:bg-dark-hover' onClick={removeImage}>
                            <IoClose className='text-lg cursor-pointer' />
                        </div>
                    </div>
                }
                {image.length === 0 && <div className='p-2 border border-light-line dark:border-dark-line rounded-lg mt-2'>

                    <label htmlFor='image' className='rounded-lg h-[100px] flex items-center justify-center bg-light-line dark:bg-dark-line flex-col gap-2 relative'>
                        <FaImage className='text-2xl' />
                        <span className='font-semibold'>Add Photo</span>
                    </label>

                    <input 
                        className='hidden' 
                        id='image' 
                        type="file" 
                        accept='image/*'
                        onChange={handleImageChange}
                        disabled={loading}
                    />
                </div>}
                <div className='w-full mt-4'>
                    <button
                        className={`h-[44px] p-2 rounded-lg w-full flex items-center justify-center font-semibold gap-2 ${loading || image.length === 0 ? "bg-light-accent text-dark-line cursor-not-allowed" : "bg-secondary text-white"}`}
                        onClick={handleUpload}
                        disabled={loading || image.length === 0}
                    >
                        {loading ? "Updating" : "Update"}
                        {loading && <ButtonLoader />}
                    </button> 
                </div>
            </Modal>}
            
            {editModal && <Modal title="Edit Profile" onClose={closeEditModal}>
                <form className='flex flex-col gap-4 mb-4'>
                    <input
                        type="text"
                        name='name'
                        className='bg-light-background dark:bg-dark-accent focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm rounded-lg h-11 border-light-line dark:border-dark-line font-semibold'
                        placeholder='Name'
                        onChange={handleChange}
                        disabled={loading}
                        value={data.name}
                    />
                    {errors.name && <span className='text-red-500'>{errors.name}</span>}

                    <input
                        type="text"
                        name='email'
                        className='bg-light-background dark:bg-dark-accent focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm rounded-lg h-11 border-light-line dark:border-dark-line'
                        placeholder='Email'
                        onChange={handleChange}
                        disabled={loading}
                        value={data.email}
                    />
                    {errors.email && <span className='text-red-500'>{errors.email}</span>}

                    <div className='w-full'>
                        <button
                            className={`h-[44px] p-2 rounded-lg w-full flex items-center justify-center font-semibold gap-2 ${!data.name || !data.email || loading ? "bg-light-accent text-dark-line cursor-not-allowed" : "bg-secondary text-white"}`}
                            onClick={handleEditProfile}
                            disabled={!data.name || !data.email || loading }
                        >
                            {loading ? "Saving" : "Save"}
                            {loading && <ButtonLoader />}
                        </button> 
                    </div>
                </form>
            </Modal>}
        </AdminPage>
    )
}

export default AdminDetails