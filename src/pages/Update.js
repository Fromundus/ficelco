import React from 'react'
import { useParams } from 'react-router-dom';
import BreadCrumbs from '../components/BreadCrumbs';
import PageHeader from '../components/PageHeader';

function Update() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const { id } = useParams();

    const links = [
        {
            title: "News and Updates",
            href: "/news-and-updates"
        },
        {
            title: `${id}`,
            href: `/news-and-updates/${id}`
        },
    ];

    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={`Update ${id}`} />
            </div>  
        </>
    )
}

export default Update