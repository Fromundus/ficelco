import React from 'react'
import { FaFolder } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';

function FileDisplay({ item, selected, setSelected, loc }) {
    const navigate = useNavigate();

    const handleSelectFile = (e, item) => {
        e.stopPropagation();

        !selected ? 
        setSelected([item])
        :
        setSelected( (prev) => {
            if(prev.some(existing => existing.id === item.id)){
                return prev.filter(selectedFodlers => selectedFodlers.id !== item.id);
            } else {
                return [...prev, item];
            }
        });
    };

    const handleDoubleClick = (e) => {
        e.stopPropagation();
        navigate(`/f2/file-manager/${item.id}`)
    };

    return (
        <button 
            onDoubleClick={handleDoubleClick} 
            onClick={(e) => loc === "filefile" && handleSelectFile(e, item)}
            key={item.id} 
            className={`flex items-center p-4 gap-2 cursor-pointer border-b ${selected?.some(existing => existing.id === item.id) ? "bg-yellow-200 dark:bg-yellow-700 border-light-line dark:border-dark-line" : "hover:bg-light-hover dark:hover:bg-dark-hover border-light-line dark:border-dark-line"}`}
        >
            <FaFolder className='text-2xl text-secondary' />
            <span>{item.name}</span>
        </button>
    )
}

export default FileDisplay