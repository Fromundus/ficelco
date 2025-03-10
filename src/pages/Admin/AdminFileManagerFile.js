import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import AdminBreadCrumbs from '../../components/AdminBreadCrumbs'
import { Link, useNavigate, useParams } from 'react-router-dom'
import logo from "../../assets/ficelco-logo.png";
import { FaFileCirclePlus, FaFolder, FaFolderPlus } from "react-icons/fa6";
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import ActionButton from '../../components/ActionButton';
import getCookie from '../../lib/getCookie';
import axiosClient from '../../axios-client';
import { toast } from 'react-toastify';
import AdminFileManagerActions from '../../components/AdminFileManagerActions';
import FileDisplay from '../../components/FileDisplay';

function AdminFileManagerFile() {
    const { id } = useParams();

    const [folders, setFolders] = React.useState();
    const [links, setLinks] = React.useState();
    const [selected, setSelected] = React.useState();

    const [addFolder, setAddFolder] = React.useState(false);
    const [renameFolder, setRenameFolder] = React.useState(false);
    const [deleteFolder, setDeleteFolder] = React.useState(false);
    const [moveFolder, setMoveFolder] = React.useState(false);
    const [addFile, setAddFile] = React.useState(false);

    const [currentParentId, setCurrentParentId] = React.useState(1);

    const [loading, setLoading] = React.useState(false);

    const navigate = useNavigate();

    const [data, setData] = React.useState({
        parent_id: id,
        name: "",
    });

    const [oldName, setOldName] = React.useState({
        parent_id: "",
        name: "",
    });

    const [errors, setErrors] = React.useState({
        parent_id: "",
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

    const handleRenameChange = (e) => {
        const { name, value } = e.target;
        setOldName( (prev) => {
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

    //ADD FOLDER

    const openAddFolderModal = () => {
        setAddFolder(true);
        setData({
            name: ""
        });
    }

    const closeAddFolderModal = () => {
        setAddFolder(false);
        setData({
            name: ""
        });
        setErrors({});
    }

    //ADD FILE

    const openAddFileModal = () => {
        setAddFile(true);
    }

    const closeAddFileModal = () => {
        setAddFile(false);
        setErrors({});
    }

    //RENAME FOLDER

    const closeRenameFolderModal = () => {
        setRenameFolder(false);
        setOldName({
            parent_id: "",
            name: "",
        });
        setErrors({});
    }

    //MOVE FOLDER
    const closeMoveFolderModal = () => {
        setMoveFolder(false);
        setCurrentParentId(1);
        setErrors({});
    }

    //DELETE FOLDER

    const closeDeleteFolderModal = () => {
        setDeleteFolder(false);
        setErrors({});
    }

    React.useEffect( () => {
        const fetchFolders = async () => {
            try {
                const res = await axiosClient.get(`/api/folders/${id}`);
                console.log(res);
                setFolders(res.data.data.subfolders);
                setLinks(res.data.breadcrumbs);
                setSelected([]);
            } catch (err) {
                console.log(err);
                setFolders([]);
            }
        }

        fetchFolders();
    }, [id]);

    const handleAddFolder = async () => {
        setLoading(true);
        setErrors({});

        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('parent_id', id);

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

    const handleRenameFolder = async () => {
        setLoading(true);
        setErrors({});

        console.log(oldName);

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.put(`/api/folder-rename/${selected[0].id}`, oldName, {
                headers: {
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setLoading(false);
                setRenameFolder(false);
                setFolders(res.data.data);
                setSelected([]);
                setOldName({
                    parent_id: "",
                    name: "",
                });

                toast(`${res.data.message}`);
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.message);
            setLoading(false);
        }
    };

    const handleDeleteFolder = async () => {
        setLoading(true);
        setErrors({});

        
        const newSelected = [];
        
        selected.forEach( (item) => {
            newSelected.push(item.id)
        });
        
        console.log(newSelected);

        const data = {
            parent_id: selected[0].parent_id,
            selected: newSelected
        }

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.post(`/api/folder-delete`, data, {
                headers: {
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setLoading(false);
                setDeleteFolder(false);
                setFolders(res.data.data);
                setSelected([]);

                toast(`${res.data.message}`);
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.message);
            setLoading(false);
        }
    };

    const handleMoveFolder = async () => {
        setLoading(true);
        setErrors({});

        // const newSelected = [];
        
        // selected.forEach( (item) => {
        //     newSelected.push(item)
        // });
        
        // console.log(newSelected);

        const data = {
            parent_id: selected[0].parent_id,
            selected: selected,
            new_parent_id: currentParentId,
        }

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.put(`/api/folder-move`, data, {
                headers: {
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setLoading(false);
                setMoveFolder(false);
                setFolders(res.data.data);
                setCurrentParentId(1);
                setSelected([]);
                
                navigate(`/f2/file-manager/${res.data.parent_id}`);

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
            <FileDisplay key={item.id} item={item} selected={selected} setSelected={setSelected} loc="filefile" />
        )
    });

    console.log(selected);

    return (
        <AdminPage className={"min-h-[100svh]"} title={"File Manager"} onClick={() => setSelected([])}>
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

                                <li>
                                    <button 
                                        className={`w-full text-start rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover flex items-center gap-2`}
                                        onClick={openAddFileModal}
                                    >
                                        <FaFileCirclePlus className='text-lg' /> New File
                                    </button>
                                </li>

                            </ul>

                        </div>
                    </div>
                </div>
            </div>
            
            <div className='fixed bg-light-background dark:bg-dark-accent left-0 md:left-56 lg:left-64 right-0'>
                <AdminFileManagerActions 
                    selected={selected} 
                    setRenameFolder={setRenameFolder} 
                    setOldName={setOldName} 
                    setDeleteFolder={setDeleteFolder} 
                    setCurrentParentId={setCurrentParentId}
                    setMoveFolder={setMoveFolder} 
                />
                <AdminBreadCrumbs links={links} />
            </div>

            <div className='flex flex-col pt-[88px]'>
                {renderFolders}
            </div>

            {addFolder && <Modal title={"Create New Folder"} onClose={closeAddFolderModal}>
                <form className='flex flex-col gap-4 mb-4'>
                    <Input 
                        type="text"
                        name='name'
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

            {renameFolder && selected?.length === 1 && <Modal title={"Rename Folder"} onClose={closeRenameFolderModal}>
                <form className='flex flex-col gap-4 mb-4'>
                    <Input 
                        type="text"
                        name='name'
                        placeholder='Name'
                        onChange={handleRenameChange}
                        disabled={loading}
                        value={oldName.name}
                        errors={errors.name}
                    />

                    <div className='w-full mt-4'>
                        <ActionButton
                            label={"Rename"}
                            processLabel={"Renaming"}
                            loading={loading}
                            disabled={loading || !oldName.name}
                            onClick={handleRenameFolder}
                            className={"bg-secondary hover:bg-secondary-darker text-white"}
                        />
                    </div>
                </form>
            </Modal>}

            {moveFolder && selected?.length > 0 && <MoveModal closeMoveFolderModal={closeMoveFolderModal} loading={loading} handleMoveFolder={handleMoveFolder} selected={selected} currentParentId={currentParentId} setCurrentParentId={setCurrentParentId} />}

            {deleteFolder && selected?.length > 0 && <Modal title={`Delete ${selected?.length > 1 ? "Folders" : "Folder"}`} onClose={closeDeleteFolderModal}>
                <form className='flex flex-col gap-4 mb-4'>
                    <span>Are you sure you want to delete {selected?.length > 1 ? "theses olders?" : "the folder?"}</span>

                    <div className='w-full mt-4'>
                        <ActionButton
                            label={"Delete"}
                            processLabel={"Deleting"}
                            loading={loading}
                            disabled={loading}
                            onClick={handleDeleteFolder}
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

export default AdminFileManagerFile

const MoveModal = ({ closeMoveFolderModal, loading, handleMoveFolder, selected, currentParentId, setCurrentParentId }) => {
    const [folders, setFolders] = React.useState();

    React.useEffect( () => {
        const fetchFolders = async () => {
            try {
                const res = await axiosClient.get(`/api/folders/${currentParentId}`);
                console.log(res);
                const filtered = res.data.data.subfolders.filter(
                    item2 => !selected.some(item1 => item1.id === item2.id)
                ); 
                console.log(filtered);
                setFolders(filtered);

                // setLinks(res.data.breadcrumbs);
                // setSelected([]);
            } catch (err) {
                console.log(err);
                setFolders([]);
            }
        }
        
        fetchFolders();
    }, [currentParentId]);

    const handleClick = (e, id) => {
        e.stopPropagation();
        e.preventDefault();
        setCurrentParentId(id)
    }

    const handleMove = () => {
        handleMoveFolder();
        setFolders([]);
    }
    
    const renderFolders = folders?.map( (item) => {
        return (
            <button
                onDoubleClick={(e) => handleClick(e, item.id)}
                key={item.id}
                className={`flex items-center p-4 gap-2 cursor-pointer border-b hover:bg-light-hover dark:hover:bg-dark-hover border-light-line dark:border-dark-line`}
                type='button'
            >
                <FaFolder className='text-2xl text-secondary' />
                <span>{item.name}</span>
            </button>
        )
    });
    
    return (
        <Modal title={`Move Folder`} onClose={closeMoveFolderModal}>
            <form className='flex flex-col gap-4 mb-4'>
                {folders?.length > 0 ? <div className='flex flex-col'>
                    {renderFolders}
                </div>
                :
                <div className='flex flex-col items-center'>
                    <span>Move Here.</span>
                </div>
                }

                <div className='w-full mt-4'>
                    <ActionButton
                        label={"Move"}
                        processLabel={"Moving"}
                        loading={loading}
                        disabled={loading}
                        onClick={handleMove}
                        className={"bg-secondary hover:bg-secondary-darker text-white"}
                    />
                </div>
            </form>
        </Modal>
    )
}