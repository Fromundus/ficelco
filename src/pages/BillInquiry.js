import React from 'react'
import PageHeader from '../components/PageHeader'
import FeatureCard from '../components/FeatureCard';
import BreadCrumbs from '../components/BreadCrumbs';

function BillInquiry() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const [data, setData] = React.useState({
        account_number: "",
        account_name: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
    }

    const links = [
        {
            title: "Bill Inquiry",
            href: "/bill-inquiry"
        }
    ];
    
    return (
        <div className=''>
            <BreadCrumbs links={links} />
            <div className='flex items-center justify-center p-4 flex-col'>
                <div className='flex items-center justify-center flex-col'>
                    <PageHeader title={"Check your Bill"} />
                    <span>Updated as of February 28, 2025</span>
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <form className='w-full flex flex-wrap gap-4' onSubmit={handleSubmit} >
                        <input
                            name='account_number'
                            className='w-full rounded-lg text-light-foreground dark:text-dark-foreground dark:bg-dark-secondary placeholder:text-light-accent dark:placeholder:text-dark-primary'
                            type="text"
                            placeholder='Account Number (ex. 123456)'
                            onChange={handleChange}
                            value={data.account_number}
                        />
                        <input
                            name='account_name'
                            className='w-full rounded-lg text-light-foreground dark:text-dark-foreground dark:bg-dark-secondary placeholder:text-light-accent dark:placeholder:text-dark-primary'
                            type="text"
                            placeholder='Account Name (ex. Juan Dela Cruz)'
                            onChange={handleChange}
                            value={data.account_name}
                        />
                        <button className='bg-primary h-[44px] w-full text-white hover:bg-primary-darker rounded-lg'>Verify</button>
                    </form>
                </div>
            </div>
            <div className='flex flex-wrap w-full p-2 mt-4 dark:bg-dark-accent'>
                <FeatureCard
                    image={"https://www.svgrepo.com/show/234211/receipt.svg"}
                    title={"Bill Inquiry"}
                    description={"View your bills online."} 
                />
                <FeatureCard
                    image={"https://www.svgrepo.com/show/385152/care-doctor-health-healthcare-history-hospital.svg"}
                    title={"Bill History"}
                    description={"View your power consumption for the last six(6) months."} 
                />
                <FeatureCard
                    image={"https://www.svgrepo.com/show/301708/credit-card-refund.svg"}
                    title={"Payment"}
                    description={"Pay your electric bills online."} 
                />
            </div>
        </div>
    )
}

export default BillInquiry