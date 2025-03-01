import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import PageHeader from '../components/PageHeader';

function History() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const events = [
        {
            year: '1971',
            title: 'FICELCO Established',
            description: 'On October 28, 1971, the First Electric Cooperative, Inc. was established under PD 6 as amended, led by Provincial Officers from different sectors of the province.'
        },
        {
            year: '1972',
            title: 'Initial Operations and USAID Support',
            description: 'FICELCO received power generating equipment from USAID and began operating the Magsaysay Electric Distribution System in Virac and Bato.'
        },
        {
            year: '1973',
            title: 'Fuel Price Hike',
            description: 'Despite sustaining operations for a few months, FICELCO was hit by rising fuel costs, prompting a shift in priorities and exploration of alternative energy sources.'
        },
        {
            year: '1975',
            title: 'Power Plant and Headquarters Construction',
            description: 'FICELCO completed the construction of its power plant and headquarters, expanding services to Virac, Bato, San Andres, and San Miguel.'
        },
        {
            year: '1983',
            title: 'Mini-Hydro Plant and Typhoon Warling',
            description: 'The Balongbong Mini-Hydro Plant was inaugurated, but Typhoon Warling damaged key infrastructure, reducing service hours and straining resources.'
        },
        {
            year: '1988',
            title: 'Transition to NAPOCOR and Recovery',
            description: 'Power generation shifted to NAPOCOR, and FICELCO surpassed a 95% collection efficiency, joining the ranks of elite cooperatives.'
        },
        {
            year: '1998',
            title: 'Typhoon Loleng',
            description: 'Severe damage from Typhoon Loleng prompted a rapid restoration effort, supported by neighboring cooperatives and the local government.'
        },
        {
            year: '2002',
            title: 'Power Crisis and Genset Rentals',
            description: 'FICELCO rented gensets to address a power supply crisis, petitioning for temporary retention until NAPOCOR could boost capacity.'
        },
        {
            year: '2006',
            title: 'Typhoon Reming and Restoration',
            description: 'Despite severe damage, FICELCO restored power within three months, showcasing the dedication of its management, employees, and member-consumers.'
        },
        {
            year: 'Today',
            title: '100% Electrification and Service Excellence',
            description: 'FICELCO has achieved 100% electrification across Catanduanes, continuing its mission to provide reliable and affordable electricity to all.'
        }
    ];

    const links = [
        {
            title: "About",
            href: "/about"
        },
        {
            title: "History",
            href: "/about/history"
        },
    ];

    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"History"} />
            </div>
            <div className="p-4">
                <span className='text-lg font-semibold flex justify-center my-4 w-full'>Historical Timeline</span>
                <div className="flex flex-col gap-4">
                    {events.map((event, index) => (
                        <div key={index} className="flex items-center">
                            <div className="w-1/6 md:w-1/12 lg:w-1/12 min-w-[100px] text-center relative flex justify-center">
                                {event.year !== "1971" && <div className={`absolute border-s border-neutral-300 dark:border-neutral-700 h-[100px] sm:h-[70px] md:h-[60px] lg:h-[50px] bottom-10`}></div>}
                                {event.year !== "Today" && <div className={`absolute border-s border-neutral-300 dark:border-neutral-700 h-[100px] sm:h-[70px] md:h-[60px] lg:h-[50px] top-10`}></div>}
                                <span className="text-lg font-semibold text-secondary dark:text-primary">{event.year}</span>
                            </div>
                            <div className="w-5/6 md:w-11/12 lg:w-11/12 p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-bold mb-2">{event.title}</h2>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default History