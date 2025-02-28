import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import PageHeader from '../components/PageHeader';
import MissionCard from '../components/MissionCard';

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
            <div className='p-2 flex flex-wrap w-full'>
                <MissionCard image={"https://www.svgrepo.com/show/454721/cam-camera-device.svg"} title={"Vision"} description={"A unified FICELCO that is committed to service excellence."} />
                <MissionCard image={"https://www.svgrepo.com/show/454725/search-research.svg"} title={"Mission"} description={"To deliver quality and sustainable service to the province of Catanduanes."} />
                <MissionCard image={"https://www.svgrepo.com/show/454729/achivement-business-mission.svg"} title={"Goal"}/>
                <MissionCard image={"https://www.svgrepo.com/show/454720/think-creative-thinking.svg"} title={"Core Values"}/>
            </div>
        </>
    )
}

export default VisionMissionGoal