import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import PageHeader from '../components/PageHeader';
import BodProfile from '../components/BodProfile';

function Feuc() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "About",
            href: "/about"
        },
        {
            title: "FEUC",
            href: "/about/feuc"
        },
    ];

    const feuc = [
        {
            name: "Manuel T. Mendoza, Jr.",
            municipality: "President"
        },
        {
            name: "Raoul Ross T. Zafe",
            municipality: "Vice President"
        },
        {
            name: "Jenny G. Aquende",
            municipality: "Secretary"
        },
        {
            name: "Pedro P. Cielo, Jr.",
            municipality: "Treasurer"
        },
        {
            name: "Angelica S. Tablizo",
            municipality: "Auditor"
        },
        {
            name: "Cynthia M. Del Valle",
            municipality: "P.R.O."
        },
        {
            name: "Errol B. Floranza",
            municipality: "Business Manager"
        },
        {
            name: "Archie M. Aquino",
            municipality: "Sgt. At Arms"
        },
        {
            name: "Albert R. Reyes",
            municipality: "Chairman Of The Board"
        },
        {
            name: "Anthony Urbano",
            municipality: "Vice Chairman"
        },
        {
            name: "Reynaldo S. Tabinas, Jr.",
            municipality: "Secretary"
        },
        {
            name: "Larry I. Alberto",
            municipality: "Member"
        },
        {
            name: "Felipe C. Tapado, Jr.",
            municipality: "Member"
        },
        {
            name: "Gener B. Molod",
            municipality: "Member"
        },
        {
            name: "Anthony B. Tablate",
            municipality: "Member"
        },
        {
            name: "Jereco S. Zuniega",
            municipality: "Member"
        },
    ];

    const renderFeuc = feuc?.map( (item) => {
        return (
            <BodProfile key={item.name} item={item} />
        )
    });


    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"FEUC"} />
            </div>
            <div className='p-4'>
                <div className='flex justify-center flex-wrap'>
                    {renderFeuc}
                </div>
            </div>
        </>
    )
}

export default Feuc