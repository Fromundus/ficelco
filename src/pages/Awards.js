import React from 'react'
import PageHeader from '../components/PageHeader'
import BreadCrumbs from '../components/BreadCrumbs';

function Awards() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "About",
            href: "/about"
        },
        {
            title: "Awards",
            href: "/about/awards"
        },
    ];


    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"Awards"} />
            </div>
        </>
    )
}

export default Awards