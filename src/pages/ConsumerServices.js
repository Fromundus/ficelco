import React from 'react'
import PageHeader from '../components/PageHeader';
import BreadCrumbs from '../components/BreadCrumbs';

function ConsumerServices() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "Consumer Services",
            href: "/consumer-services"
        },
    ];


    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"Consumer Services"} />
            </div>
        </>
    )
}

export default ConsumerServices