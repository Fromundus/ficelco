import React from 'react'
import BreadCrumbs from '../components/BreadCrumbs';
import PageHeader from '../components/PageHeader';
import BodProfile from '../components/BodProfile';

function ManagementTeam() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "About",
            href: "/about"
        },
        {
            title: "Management Team",
            href: "/about/management-team"
        },
    ];

    const managementProfile = [
        {
            name: "Francis A. Gianan",
            municipality: "General Manager"
        },
    ];

    const renderManagementProfile = managementProfile?.map( (item, index) => {
        return (
            <BodProfile key={index} item={item} />
        )
    });

    const departmentManagers = [
        {
            name: "Geraldine A. Toledo",
            municipality: "Executive Assistant"
        },
        {
            name: "Salvador N. Gianan Jr.",
            municipality: "Internal Audit Manager"
        },
        {
            name: "	Bryan T. Tejerero",
            municipality: "Administrative Manager"
        },
        {
            name: "Neil P. Tesorero",
            municipality: "CORPLAN Manager"
        },
        {
            name: "Maria Fatima E. Cea",
            municipality: "Finance Services Manager"
        },
        {
            name: "Joe Neil T. Tuzon",
            municipality: "OIC – Technical Services Manager"
        },
        {
            name: "Wendy Y. Lumbao",
            municipality: "Area Office Manager"
        },
        {
            name: "Aileen G. Muñoz",
            municipality: "Consumer Service Manager"
        },
    ];

    const renderDepartmentManagers = departmentManagers?.map( (item, index) => {
        return (
            <BodProfile key={index} item={item} />
        )
    });

    const divisionSupervisors = [
        {
            name: "Jennifer M. Dela Cruz",
            municipality: "Information & Communication Technology Supervisor"
        },
        {
            name: "Larry O. Escobar",
            municipality: "System Loss Reduction Supervisor"
        },
        {
            name: "Aris G. De Leon",
            municipality: "Materials and Logistics Services Supervisor"
        },
        {
            name: "Evelyn D. Vargas",
            municipality: "Human Resource and Support Services Supervisor"
        },
        {
            name: "Marisan T. Tapado",
            municipality: "Accountant"
        },
        {
            name: "Roberto T. Tindugan",
            municipality: "Meter Reading Billing and Collection Supervisor"
        },
        {
            name: "Aurora Roxanne T. Tugano",
            municipality: "Consumer Development Supervisor"
        },
        {
            name: "Junelyn G. Molina",
            municipality: "CORPLAN Supervisor"
        },
        {
            name: "Joe Neil T. Tuzon",
            municipality: "System Planning and Construction Supervisor"
        },
        {
            name: "",
            municipality: "Maintenance and Operation Supervisor"
        },
        {
            name: "",
            municipality: "Area Supervisor – Area I"
        },
        {
            name: "",
            municipality: "Area Supervisor – Area II"
        },
    ];

    const renderDivisionSupervisors = divisionSupervisors?.map( (item, index) => {
        return (
            <BodProfile key={index} item={item} />
        )
    });


    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"Management Team"} />
            </div>
            <div className='p-4'>
                <span className='text-lg font-semibold flex justify-center my-4 w-full text-secondary dark:text-primary'>Management Profile</span>
                <div className='flex justify-center flex-wrap mt-4'>
                    {renderManagementProfile}
                </div>
            </div>
            <div className='p-4'>
                <span className='text-lg font-semibold flex justify-center my-4 w-full text-secondary dark:text-primary'>Department Managers</span>
                <div className='flex justify-center flex-wrap mt-4'>
                    {renderDepartmentManagers}
                </div>
            </div>
            <div className='p-4'>
                <span className='text-lg font-semibold flex justify-center my-4 w-full text-secondary dark:text-primary'>Division Supervisors</span>
                <div className='flex justify-center flex-wrap mt-4'>
                    {renderDivisionSupervisors}
                </div>
            </div>
        </>
    )
}

export default ManagementTeam