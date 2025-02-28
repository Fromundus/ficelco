import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import PageHeader from '../components/PageHeader';
import BodProfile from '../components/BodProfile';

function BoardOfDirectors() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "About",
            href: "/about"
        },
        {
            title: "Board of Directors",
            href: "/about/board-of-directors"
        },
    ];

    const bod = [
        {
            name: "Dir. Myrna SJ. Carilimdiliman",
            municipality: "Virac District"
        },
        {
            name: "Dir. Rodulfo B. Vargas, Sr.",
            municipality: "Bato District"
        },
        {
            name: "Dir. Romeo D. Santos",
            municipality: "Baras – Gigmoto District"
        },
        {
            name: "Dir. Robert C. Aquino",
            municipality: "Viga, Panganiban, Bagamanoc District"
        },
        {
            name: "Dir. Alicia Arcilla",
            municipality: "San Andres District"
        },
        {
            name: "Dir. Marilyn T. Robles",
            municipality: "San Miguel District"
        },
        {
            name: "Dir. Arsenia G. Bernacer",
            municipality: "Pandan – Caramoran District"
        },
        {
            name: "Engr. Francis A. Gianan",
            municipality: "General Manager"
        },
    ];

    const renderBoardOfDirectors = bod?.map( (item) => {
        return (
            <BodProfile key={item.name} item={item} />
        )
    });


    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"Board of Directors"} />
            </div>
            <div className='p-4'>
                <div className='flex flex-wrap'>
                    {renderBoardOfDirectors}
                </div>
            </div>
        </>
    )
}

export default BoardOfDirectors