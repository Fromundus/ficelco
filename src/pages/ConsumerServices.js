import React from 'react'
import PageHeader from '../components/PageHeader';
import BreadCrumbs from '../components/BreadCrumbs';
import ServicesCard from '../components/ServicesCard';

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
            <div className='flex flex-wrap p-2'>
                <ServicesCard
                    image={"https://www.svgrepo.com/show/341470/building-construction-urban-power-energy.svg"}
                    title={"New Connection Application"}
                />
                <ServicesCard
                    image={"https://www.svgrepo.com/show/402255/old-woman-medium-light-skin-tone.svg"}   
                    title={"Senior Citizen Discount"}
                />
                <ServicesCard
                    image={"https://www.svgrepo.com/show/341445/energy-industry-energetic-thunderbolt-power.svg"}   
                    title={"Service Centers"}
                />
                <ServicesCard
                    image={"https://www.svgrepo.com/show/341469/bill-invoice-payment-receipt-billing.svg"}   
                    title={"Downloadable Forms"}
                />
                <ServicesCard
                    image={"https://www.svgrepo.com/show/341444/generator-electricity-electric-electrical-energy.svg"}   
                    title={"Meter Deposit Refund"}
                />
            </div>
        </>
    )
}

export default ConsumerServices