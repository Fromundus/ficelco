import React from 'react'
import { MdDelete, MdEdit, MdDriveFileMove, MdFileCopy, MdDownload  } from "react-icons/md";

function AdminFileManagerActions({ selected, setRenameFolder, setOldName, setDeleteFolder, setCurrentParentId, setMoveFolder }) {

    const handleRename = (e) => {
        e.stopPropagation();
        setRenameFolder(true);
        setOldName({
            name: selected[0].name,
            parent_id: selected[0].parent_id,
        });
    }

    const handleDelete = (e) => {
        e.stopPropagation();
        setDeleteFolder(true);
    }

    const handleMove = (e) => {
        e.stopPropagation();
        setMoveFolder(true);
        setCurrentParentId(1)
    }

    return (
        <div className='flex items-center w-full border-b border-light-line dark:border-dark-line p-2 justify-end gap-2 h-11'>
            {selected?.length === 1 && <button className='p-1 rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleRename}>
                    <MdEdit className='text-2xl' />
            </button>}
            {selected?.length > 0 && <button className='p-1 rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleMove}>
                <MdFileCopy className='text-2xl' />
            </button>}
            {selected?.length > 0 && <button className='p-1 rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleMove}>
                <MdDriveFileMove className='text-2xl' />
            </button>}
            {selected?.length > 0 && <button className='p-1 rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleDelete}>
                <MdDownload className='text-2xl' />
            </button>}
            {selected?.length > 0 && <button className='p-1 rounded-lg hover:bg-light-hover dark:hover:bg-dark-hover' onClick={handleDelete}>
                <MdDelete className='text-2xl' />
            </button>}
        </div>
    )
}

export default AdminFileManagerActions