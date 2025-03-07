import React from 'react'
import { NavLink, Outlet, useNavigate, useSearchParams } from 'react-router-dom'
import logo from "../assets/ficelco-logo.png"
import { useStateContext } from '../context/ContextProvider'
import getCookie from '../lib/getCookie';
import axiosClient from '../axios-client';
import { Bounce, ToastContainer, toast } from 'react-toastify';

function AdminLayout() {
    const { name, email, setRole, setName, setId, setEmail, setProfilePic, profilePic, id, role } = useStateContext();
    const [postLoading, setPostLoading] = React.useState(false);
    const [posts, setPosts] = React.useState();
    const [postYears, setPostYears] = React.useState();
    
    const navigate = useNavigate();

    const firstLetter = name?.slice(0, 1).toUpperCase();

    if(!id || !role){
        navigate('/login');
    }

    React.useEffect( () => {
        const fetchUpdates = async () => {
            setPostLoading(true);

            try {
                const res = await axiosClient.get('/api/posts');
                console.log(res);
                setPosts(res.data.data);
                setPostYears(res.data.years);
                setPostLoading(false);
            } catch (err) {
                console.log(err);
                setPostLoading(false);
                setPosts([]);
            }
        }

        fetchUpdates();
    }, []);

    const handleLogout = async (e) => {
        e.preventDefault();

        try {    
            const response = await axiosClient.post('/api/logout', {}, {
                    headers: {
                        'X-XSRF-TOKEN': getCookie(),
                        withCredentials: true
                    }
                }
            );
    
            console.log(response);
    
            if(response.status === 200){
                setRole(null);
                setName(null);
                setId(null);
                setEmail(null);
                setProfilePic(null);
                navigate(`/login`);
            }
    
        } catch (err){
            setRole(null);
            setName(null);
            setId(null);
            setEmail(null);
            setProfilePic(null);
            navigate(`/login`);
        }
    }

    return (
        <div className='relative'>
            <div className="fixed overflow-y-auto custom-scrollbar h-screen flex-col justify-between border-e border-light-line dark:border-dark-line bg-light-background dark:bg-dark-accent text-light-foreground dark:text-dark-foreground md:w-56 lg:w-64 hidden md:flex lg:flex">
                <div className="px-4 py-6">
                    <span className="grid h-10 place-content-center rounded-lg text-xs cursor-pointer" onClick={() => window.location.reload()}>
                        <img className='w-[50px]' src={logo} alt="" />
                    </span>

                    <ul className="mt-6 space-y-1">
                    <li>
                        <NavLink
                        end
                        to={'/f2'}
                        >
                            {({isActive}) => (isActive ?
                                <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>Dashboard</span>
                                :
                                <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>Dashboard</span>
                            )}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                        to={'updates'}
                        >
                            {({isActive}) => (isActive ?
                                <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>Updates</span>
                                :
                                <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>Updates</span>
                            )}
                        </NavLink>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-light-hover dark:hover:bg-dark-hover"
                        >
                            <span className="text-sm font-medium"> Teams </span>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                            <NavLink
                                to={'board-of-directors'}
                            >
                                {({isActive}) => (isActive ?
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>Board of Directors</span>
                                    :
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>Board of Directors</span>
                                )}
                            </NavLink>
                            </li>

                            <li>
                            <NavLink
                                to={'management-team'}
                            >
                                {({isActive}) => (isActive ?
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>Management Team</span>
                                    :
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>Management Team</span>
                                )}
                            </NavLink>
                            </li>

                            <li>
                            <NavLink
                                to={'feuc'}
                            >
                                {({isActive}) => (isActive ?
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>FEUC</span>
                                    :
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>FEUC</span>
                                )}
                            </NavLink>
                            </li>
                        </ul>
                        </details>
                    </li>

                    <li>
                        <NavLink
                        to={'billing'}
                        >
                            {({isActive}) => (isActive ?
                                <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>Billing</span>
                                :
                                <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>Billing</span>
                            )}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink
                        to={'power-rates'}
                        >
                            {({isActive}) => (isActive ?
                                <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>Power Rates</span>
                                :
                                <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>Power Rates</span>
                            )}                        
                        </NavLink>
                    </li>

                    <li>
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 hover:bg-light-hover dark:hover:bg-dark-hover"
                        >
                            <span className="text-sm font-medium"> Account </span>

                            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="size-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                />
                            </svg>
                            </span>
                        </summary>

                        <ul className="mt-2 space-y-1 px-4">
                            <li>
                            <NavLink
                                to={'details'}
                            >
                                {({isActive}) => (isActive ?
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>Details</span>
                                    :
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>Details</span>
                                )}
                            </NavLink>
                            </li>

                            <li>
                            <NavLink
                                to={'security'}
                            >
                                {({isActive}) => (isActive ?
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium bg-light-hover dark:bg-dark-hover'>Security</span>
                                    :
                                    <span className='block rounded-lg px-4 py-2 text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover'>Security</span>
                                )}
                            </NavLink>
                            </li>

                            <li>
                            <form onSubmit={handleLogout}>
                                <button
                                type="submit"
                                className="w-full rounded-lg px-4 py-2 [text-align:_inherit] text-sm font-medium hover:bg-light-hover dark:hover:bg-dark-hover"
                                >
                                Logout
                                </button>
                            </form>
                            </li>
                        </ul>
                        </details>
                    </li>
                    </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-light-line dark:border-dark-line">
                    <NavLink to={'details'} className="flex items-center gap-2 bg-light-background dark:bg-dark-accent text-light-foreground dark:text-dark-foreground p-4">
                    {/* <img
                        alt={name}
                        src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                        className="size-10 rounded-full object-cover"
                    /> */}
                    {name ?
                        profilePic ?
                            <div className='flex aspect-square size-10 border bg-light-hover dark:bg-dark-hover border-light-line dark:border-dark-line rounded-full'>
                                <img className='object-cover rounded-full' src={`http://localhost:8000/storage/${profilePic}`} alt="" />
                            </div>
                            :
                            <div className='border rounded-full p-2 bg-light-hover dark:bg-dark-hover border-light-line dark:border-dark-line size-10 flex items-center justify-center'>
                                <span className='font-semibold text-lg'>{firstLetter}</span>
                            </div>
                        :
                        <div className='border rounded-full p-2 bg-light-hover dark:bg-dark-hover border-light-line dark:border-dark-line size-10 flex items-center justify-center animate-pulse'>
                        </div>
                    }

                    <div className='md:w-32 lg:w-40'>
                        {name ?
                            <div className="text-xs">
                                <strong className="block font-medium">{name}</strong>
                                <p className='truncate'>{email}</p>
                            </div>
                            :
                            <div className="text-xs flex gap-2 flex-col">
                                <div className='w-full bg-light-hover dark:bg-dark-hover h-2 rounded-lg animate-pulse'></div>
                                <div className='w-full bg-light-hover dark:bg-dark-hover h-2 rounded-lg animate-pulse'></div>
                            </div>
                        }
                    </div>
                    </NavLink>
                </div>
            </div>
            <div className='relative md:ml-56 lg:ml-64 min-h-[100svh] bg-light-background dark:bg-dark-background text-light-foreground dark:text-dark-foreground'>
                <Outlet context={{ posts, setPosts, postLoading, setPostLoading, postYears, setPostYears }} />
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover={false}
                theme={localStorage.getItem("theme")}
                transition={Bounce}
            />
        </div>
    )
}

export default AdminLayout