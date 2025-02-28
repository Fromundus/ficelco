import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs'
import PageHeader from '../components/PageHeader'

function CooperativeProfile() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "About",
            href: "/about"
        },
        {
            title: "Cooperative Profile",
            href: "/about/cooperative-profile"
        },
    ];


    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"Cooperative Profile"} />
            </div>
            <div className='flex flex-col'>
                <div className='p-4 rounded-lg w-full flex sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px]'>
                    <img className='object-cover rounded-lg w-full' src="https://catanduanestribune.net/wp-content/uploads/2022/07/ficelco2-1024x576.png" alt="" />
                </div>
                <span className="p-4 rounded-lg shadow-lg leading-relaxed">
                    FICELCO was established on <strong>October 28, 1971</strong>, as a non-stock, non-profit distribution utility. As one of the first electric cooperatives in the country, FICELCO has weathered numerous challenges, including fuel price hikes, compulsory wage increases, high maintenance costs, typhoons, and power outages. Despite these obstacles, FICELCO has consistently maintained an <strong>A+ Categorization</strong> among the cooperatives in Region V.
                    <br /><br />
                    As the sole franchise holder for electric distribution in Catanduanes, we proudly serve <strong>42,268 member-consumers</strong> across <strong>315 barangays</strong> in the municipalities of Bagamanoc, Baras, Bato, Caramoran, Gigmoto, Pandan, Panganiban, San Andres, San Miguel, Viga, and Virac. These municipalities are represented by <strong>7 Board of Directors</strong> across distinct districts:
                    <ul className="list-disc list-inside my-4">
                        <li><strong>District 1:</strong> Gigmoto-Baras</li>
                        <li><strong>District 2:</strong> Bato</li>
                        <li><strong>District 3:</strong> San Andres</li>
                        <li><strong>District 4:</strong> San Miguel</li>
                        <li><strong>District 5:</strong> Virac</li>
                        <li><strong>District 6:</strong> Caramoran and Pandan</li>
                        <li><strong>District 7:</strong> Bagamanoc, Panganiban, and Viga</li>
                    </ul>
                    As of today, we have achieved <strong>100% electrification</strong> across all areas.
                    <br /><br />
                    <strong>FICELCO is about change.</strong> We continuously evolve to meet the dynamic demands of our consumers and offer growth opportunities for our human resources to enhance service delivery. Our commitment remains steadfast: to extend rural electrification to the farthest barangays and remotest sitios, fostering progress and development throughout Catanduanes.
                    <br /><br />
                    We are dedicated to delivering reliable service, driving innovation, and illuminating communities — today and for generations to come.
                </span>
            </div>
        </>
    )
}

export default CooperativeProfile