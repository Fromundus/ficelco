import React from 'react'
import PageHeader from '../components/PageHeader'
import { IoIosArrowBack, IoIosArrowForward  } from "react-icons/io";
import BreadCrumbs from '../components/BreadCrumbs';

function Biddings() {
    React.useEffect( () => {
        window.scrollTo(0, 0);
    }, []);

    const links = [
        {
            title: "Biddings",
            href: "/biddings"
        }
    ];

    return (
        <>
            <BreadCrumbs links={links} />
            <div className='px-4'>
                <PageHeader title={"Biddings"} />
            </div>
            <div className="overflow-x-auto rounded-lg p-4">
                <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700 bg-light-background dark:bg-dark-background text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="p-4 font-medium whitespace-nowrap text-center">Series Number</th>
                            <th className="p-4 font-medium whitespace-nowrap text-center">Title</th>
                            <th className="p-4 font-medium whitespace-nowrap text-center">Date</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                        <tr>
                            <td className="p-3 font-medium whitespace-nowrap text-center">RPH-SBB-No.-24-15-for-Region-5</td>
                            <td className="p-3 whitespace-nowrap text-center">Steel-Pole-Requirements_PB-ITB-R</td>
                            <td className="p-3 whitespace-nowrap text-center">5-3-2024</td>
                            <td className="p-3 whitespace-nowrap flex justify-center">
                            <a
                                href="#"
                                className="inline-block rounded-lg bg-secondary hover:bg-secondary-darker dark:bg-primary p-2 text-xs font-medium text-white dark:hover:bg-primary-darker"
                            >
                                View
                            </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium whitespace-nowrap text-center">RPH-SBB-No.-24-15-for-Region-5</td>
                            <td className="p-3 whitespace-nowrap text-center">Steel-Pole-Requirements_PB-ITB-R</td>
                            <td className="p-3 whitespace-nowrap text-center">5-3-2024</td>
                            <td className="p-3 whitespace-nowrap flex justify-center">
                            <a
                                href="#"
                                className="inline-block rounded-lg bg-secondary hover:bg-secondary-darker dark:bg-primary p-2 text-xs font-medium text-white dark:hover:bg-primary-darker"
                            >
                                View
                            </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium whitespace-nowrap text-center">RPH-SBB-No.-24-15-for-Region-5</td>
                            <td className="p-3 whitespace-nowrap text-center">Steel-Pole-Requirements_PB-ITB-R</td>
                            <td className="p-3 whitespace-nowrap text-center">5-3-2024</td>
                            <td className="p-3 whitespace-nowrap flex justify-center">
                            <a
                                href="#"
                                className="inline-block rounded-lg bg-secondary hover:bg-secondary-darker dark:bg-primary p-2 text-xs font-medium text-white dark:hover:bg-primary-darker"
                            >
                                View
                            </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium whitespace-nowrap text-center">RPH-SBB-No.-24-15-for-Region-5</td>
                            <td className="p-3 whitespace-nowrap text-center">Steel-Pole-Requirements_PB-ITB-R</td>
                            <td className="p-3 whitespace-nowrap text-center">5-3-2024</td>
                            <td className="p-3 whitespace-nowrap flex justify-center">
                            <a
                                href="#"
                                className="inline-block rounded-lg bg-secondary hover:bg-secondary-darker dark:bg-primary p-2 text-xs font-medium text-white dark:hover:bg-primary-darker"
                            >
                                View
                            </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="p-3 font-medium whitespace-nowrap text-center">RPH-SBB-No.-24-15-for-Region-5</td>
                            <td className="p-3 whitespace-nowrap text-center">Steel-Pole-Requirements_PB-ITB-R</td>
                            <td className="p-3 whitespace-nowrap text-center">5-3-2024</td>
                            <td className="p-3 whitespace-nowrap flex justify-center">
                            <a
                                href="#"
                                className="inline-block rounded-lg bg-secondary hover:bg-secondary-darker dark:bg-primary p-2 text-xs font-medium text-white dark:hover:bg-primary-darker"
                            >
                                View
                            </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-neutral-200 dark:border-neutral-700 flex items-center flex-wrap gap-4">
                <span>Showing 11 to 20 of 41 results</span>
                <div className='flex items-center ms-auto'>
                    <button className='w-10 border-x border-y border-neutral-200 dark:border-neutral-700 rounded-s-lg p-2 h-10 flex items-center justify-center text-lg'><IoIosArrowBack /></button>
                    <button className='w-10 border-e border-y border-neutral-200 bg-primary-darker dark:bg-secondary text-white dark:border-neutral-700 p-2 h-10 flex items-center justify-center'>1</button>
                    <button className='w-10 border-e border-y border-neutral-200 dark:border-neutral-700 p-2 h-10 flex items-center justify-center'>2</button>
                    <button className='w-10 border-e border-y border-neutral-200 dark:border-neutral-700 p-2 h-10 flex items-center justify-center'>3</button>
                    <button className='w-10 border-e border-y border-neutral-200 dark:border-neutral-700 p-2 h-10 flex items-center justify-center'>4</button>
                    <button className='w-10 border-e border-y border-neutral-200 dark:border-neutral-700 rounded-e-lg p-2 h-10 flex items-center justify-center text-lg'><IoIosArrowForward /></button>
                </div>
            </div>
        </>
    )
}

export default Biddings