import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import AdminBreadCrumbs from '../../components/AdminBreadCrumbs'
import { Link } from 'react-router-dom'
import logo from "../../assets/ficelco-logo.png";
import { FaFileCirclePlus, FaFolderPlus } from "react-icons/fa6";
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import ActionButton from '../../components/ActionButton';
import getCookie from '../../lib/getCookie';
import axiosClient from '../../axios-client';
import { toast } from 'react-toastify';
import AdminFileManagerActions from '../../components/AdminFileManagerActions';
import FileDisplay from '../../components/FileDisplay';

function AdminFileManager() {
    const [folders, setFolders] = React.useState();

    const [addFolder, setAddFolder] = React.useState(false);
    const [addFile, setAddFile] = React.useState(false);

    const [loading, setLoading] = React.useState(false);

    const [data, setData] = React.useState({
        name: "",
    });

    const [errors, setErrors] = React.useState({
        name: "",
    });

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

    const openAddFolderModal = () => {
        setAddFolder(true);
        setData({
            name: ""
        })
    }

    const closeAddFolderModal = () => {
        setAddFolder(false);
        setData({
            name: ""
        })
    }

    const openAddFileModal = () => {
        setAddFile(true);
    }

    const closeAddFileModal = () => {
        setAddFile(false);
    }

    React.useEffect( () => {
        const fetchFolders = async () => {
            try {
                const res = await axiosClient.get('/api/folders');
                setFolders(res.data.data);
                console.log(res);
            } catch (err) {
                console.log(err);
                setFolders([]);
            }
        }

        fetchFolders();
    }, []);

    const handleAddFolder = async () => {
        setLoading(true);
        setErrors({});

        const formData = new FormData();

        formData.append('name', data.name);

        console.log(formData);

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.post(`/api/folder`, formData, {
                headers: {
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setLoading(false);
                setAddFolder(false);
                setFolders(res.data.data);

                toast(`${res.data.message}`);
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.message);
            setLoading(false);
        }
    };

    const renderFolders = folders?.map( (item) => {
        return (
            <FileDisplay key={item.id} item={item} />
        )
    });

    return (
        <AdminPage title={"File Manager"}>
            <div className='w-full relative'> 
                <div className='relative'>
                    <div className="fixed left-0 top-0 overflow-y-auto custom-scrollbar h-screen flex-col justify-between border-e border-light-line dark:border-dark-line bg-light-background dark:bg-dark-accent text-light-foreground dark:text-dark-foreground md:w-56 lg:w-64 hidden md:flex lg:flex">
                        <div className="px-4 py-6">
                            <span className="grid h-10 place-content-center rounded-lg text-xs cursor-pointer">
                                <img className='w-[50px]' src={logo} alt="" />
                            </span>

                            <ul className="mt-6 space-y-1">
                                <li>
                                    <Link to={'/f2'}
                                        className={`w-full text-start rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover flex items-center`}
                                    >
                                        Back To Dashboard
                                    </Link>
                                </li>

                                <li className='pt-4'>
                                    <button 
                                        className={`w-full text-start rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover flex items-center gap-2`}
                                        onClick={openAddFolderModal}
                                    >
                                        <FaFolderPlus className='text-lg' /> New Folder
                                    </button>
                                </li>

                                {/* <li>
                                    <button 
                                        className={`w-full text-start rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover flex items-center gap-2`}
                                        onClick={openAddFileModal}
                                    >
                                        <FaFileCirclePlus className='text-lg' /> New File
                                    </button>
                                </li> */}

                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            
            <div className='fixed bg-light-background dark:bg-dark-accent left-0 md:left-56 lg:left-64 right-0'>
                <AdminFileManagerActions />
                <AdminBreadCrumbs />
            </div>

            <div className='flex flex-col pt-[88px]'>
                {renderFolders}
            </div>

            {addFolder && <Modal title={"Create New Folder"} onClose={closeAddFolderModal}>
                <form className='flex flex-col gap-4 mb-4'>
                    <Input 
                        type="text"
                        name='name'
                        className=' font-semibold'
                        placeholder='Name'
                        onChange={handleChange}
                        disabled={loading}
                        value={data.name}
                        errors={errors.name}
                    />

                    <div className='w-full mt-4'>
                        <ActionButton
                            label={"Create"}
                            processLabel={"Creating"}
                            loading={loading}
                            disabled={loading || !data.name}
                            onClick={handleAddFolder}
                            className={"bg-secondary hover:bg-secondary-darker text-white"}
                        />
                    </div>
                </form>
            </Modal>}

            {addFile && <Modal title={"Add New File"} onClose={closeAddFileModal}>

            </Modal>}
        </AdminPage>
    )
}

export default AdminFileManager