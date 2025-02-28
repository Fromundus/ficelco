import React from 'react'
import PageHeader from '../components/PageHeader'

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
    
    return (
        <div className='flex items-center justify-center flex-col pt-10'>
            <div className='flex items-center justify-center flex-col'>
                <PageHeader title={"Check your Bill"} />
                <span>Updated as of February 28, 2025</span>
            </div>
            <div className='flex items-center justify-center'>
                <form className='w-full p-4 flex flex-wrap gap-4' onSubmit={handleSubmit} >
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
    )
}

export default BillInquiry