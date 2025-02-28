import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import PageHeader from '../components/PageHeader';

function VisionMissionGoal() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "About",
            href: "/about"
        },
        {
            title: "Vision, Mission, and Goal",
            href: "/about/vision-mission-goal"
        },
    ];


    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"Vision, Mission, and Goal"} />
            </div>
        </>
    )
}

export default VisionMissionGoal