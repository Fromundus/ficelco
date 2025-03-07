import React from 'react'
import PageHeader from '../components/PageHeader'
import FeatureCard from '../components/FeatureCard';
import BreadCrumbs from '../components/BreadCrumbs';
import Input from '../components/Input';

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
            <div className='flex p-4 flex-col'>
                <div className='flex items-center justify-center flex-col'>
                    <PageHeader title={"Check your Bill"} />
                    <span>Updated as of March 7, 2025</span>
                </div>
                <div className='flex items-center justify-center mt-4'>
                    <form className='w-full flex flex-wrap gap-4 sm:px-20 md:px-52 lg:px-80' onSubmit={handleSubmit} >

                        {/* <input
                            name='account_number'
                            className='w-full bg-light-background dark:bg-dark-accent focus:ring-0 placeholder:text-light-hover dark:placeholder:text-dark-hover text-sm rounded-lg h-11 border-light-line dark:border-dark-line'
                            type="text"
                            placeholder='Account Number (ex. 123456)'
                            onChange={handleChange}
                            value={data.account_number}
                        /> */}

                        <Input
                            name='account_number'
                            type="text"
                            placeholder='Account Number (ex. 123456)'
                            onChange={handleChange}
                            value={data.account_number}
                            classNameParent={"w-full"}
                        />

                        <Input
                            name='account_name'
                            type="text"
                            placeholder='Account Name (ex. Juan Dela Cruz)'
                            onChange={handleChange}
                            value={data.account_name}
                            classNameParent={"w-full"}
                        />
                        <button className='bg-secondary h-[44px] w-full text-white hover:bg-secondary-darker rounded-lg'>Verify</button>
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