import React from 'react';
import axiosClient from '../axios-client';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { IoMdArrowBack } from 'react-icons/io';
import Logo from '../components/Logo';

function Signup() {
    const navigate = useNavigate();
    const uniqueId = uuidv4();
    const [showPassword, setShowPassword] = React.useState(false);
    const { setToken, setRole, setName, setId } = useStateContext();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect( () => {
        window.scrollTo(0, 0);
        // window.localStorage.clear();
    }, []);

    const [data, setData] = React.useState({
        firstname: "",
        lastname: "",
        contact_number: "",
        password: "",
        password_confirmation: ""
    });

    const [errors, setErrors] = React.useState({
        firstname: "",
        lastname: "",
        contact_number: "",
        password: "",
        password_confirmation: ""
    });

    const handlePasswordToggle = () => {
        setShowPassword(prev => !prev)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        });

        setErrors( (prev) => {
            return {
                ...prev,
                [name]: ""
            }
        });

        if(name === "password_confirmation"){
            setErrors( (prev) => {
                return {
                    ...prev,
                    password: ""
                }
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = {
            user_id: uniqueId,
            cart_id: uniqueId,
            firstname: data.firstname,
            lastname: data.lastname,
            contact_number: data.contact_number,
            password: data.password,
            password_confirmation: data.password_confirmation
        }

        // axiosClient.post("api/register", formData)
        //     .then( ({data}) => {
        //         setRole(data.role);
        //         setName(data.name);
        //         setIsLoading(false);
        //         navigate('/U2FsdGVkX1+Rv7W03=/welcome');
        //     })
        //     .catch( (err) => {
        //         console.log(err);
        //         setErrors(err.response.data.message);
        //         setIsLoading(false);
        //     })

            try {
                await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });
    
                const xsrfToken = document.cookie.split('; ')
                    .find(row => row.startsWith('XSRF-TOKEN='))
                    ?.split('=')[1];
    
                const response = await axiosClient.post(
                    '/api/register',
                    {
                        user_id: uniqueId,
                        cart_id: uniqueId,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        contact_number: data.contact_number,
                        password: data.password,
                        password_confirmation: data.password_confirmation
                    },
                    {
                        headers: { 'X-XSRF-TOKEN': decodeURIComponent(xsrfToken) },
                        withCredentials: true
                    }
                );
    
                console.log(response);
    
                if(response.status === 200){
                    setIsLoading(false);
                    // setName(response.data.data.firstname);
                    // setRole(response.data.data.role);
                    // setId(response.data.data.role);
                    navigate(`/login`);
                }
    
            } catch (err){
                console.log(err);
                setErrors(err.response.data.message);
                setIsLoading(false);
            }
    }

    return (
        <div className='min-h-[100svh] p-4 flex flex-col pb-8'>
            <div className='flex'>
                <Link to={"/"}>
                    <IoMdArrowBack className='text-2xl' />
                </Link>
                <div className='ms-auto'>
                    <Link to={'/guest'} className='font-semibold'>Continue As Guest</Link>
                </div>
            </div>
            <div className='flex w-full justify-center items-center mt-4'>
                <Logo width={"70px"} height={"70px"} />
            </div>
            <span className='text-center text-2xl font-semibold my-2 mt-4'>
                Create account
            </span>
            <form
                className='flex flex-col gap-4 mt-4 mb-4'
                onSubmit={handleSubmit}>
                <label
                    htmlFor="Firstname"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-secondary focus-within:border-secondary focus-within:ring-0 focus-within:ring-secondary focus-within:border-b-2 w-full"
                    >
                    <input
                        type="text"
                        id="Firstname"
                        className="peer px-1 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                        placeholder="Firstname"
                        name='firstname'
                        onChange={handleChange}
                        value={data.firstname}
                        autoComplete='false'
                    />

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-secondary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        First Name
                    </span>
                </label>
                {errors.firstname && <span className='text-primary'>{errors.firstname}</span>}

                <label
                    htmlFor="LastName"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-secondary focus-within:border-secondary focus-within:ring-0 focus-within:ring-secondary focus-within:border-b-2 w-full"
                    >
                    <input
                        type="text"
                        id="LastName"
                        className="peer px-1 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                        placeholder="LastName"
                        name='lastname'
                        onChange={handleChange}
                        value={data.lastname}
                        autoComplete='false'
                    />

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-secondary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Last Name
                    </span>
                </label>
                {errors.lastname && <span className='text-primary'>{errors.lastname}</span>}

                <label
                    htmlFor="ContactNumber"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-secondary focus-within:border-secondary focus-within:ring-0 focus-within:ring-secondary focus-within:border-b-2 w-full"
                    >
                    <input
                        type="number"
                        id="ContactNumber"
                        className="peer px-1 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full appearance-none"
                        placeholder="ContactNumber"
                        name='contact_number'
                        onChange={handleChange}
                        value={data.contact_number}
                        autoComplete='false'
                    />

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-secondary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Contact Number
                    </span>
                </label>
                {errors.contact_number && <span className='text-primary'>{errors.contact_number}</span>}

                <label
                    htmlFor="Password"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-secondary focus-within:border-secondary focus-within:ring-0 focus-within:ring-secondary focus-within:border-b-2 w-full mt-4"
                    >
                    <input
                        type={showPassword ? "text" : "password"}
                        id="Password"
                        className="peer px-1 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                        placeholder="Password"
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        autoComplete='false'
                    />

                    <span
                        className="absolute top-3 right-3 text-tertiary cursor-pointer"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={handlePasswordToggle}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-secondary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Create Password
                    </span>
                </label>

                <label
                    htmlFor="PasswordConfirmation"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-secondary focus-within:border-secondary focus-within:ring-0 focus-within:ring-secondary focus-within:border-b-2 w-full"
                    >
                    <input
                        type={showPassword ? "text" : "password"}
                        id="PasswordConfirmation"
                        className="peer px-1 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                        placeholder="PasswordConfirmation"
                        name='password_confirmation'
                        onChange={handleChange}
                        value={data.password_confirmation}
                        autoComplete='false'
                    />

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-secondary transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Password Confirmation
                    </span>
                </label>
                {errors.password && <span className='text-primary'>{errors.password}</span>}

                <p className='my-2'>By creating account, you are agreeing to ShopPayo <span className='underline cursor-pointer'>terms & conditions and privacy policy</span>.</p>
                
                <button
                    className={`btn font-semibold ${(!data.firstname || !data.lastname || !data.contact_number || !data.password || !data.password_confirmation) || isLoading ? "bg-secondary text-neutral-600 cursor-not-allowed" : "bg-primary text-white"}`}
                    disabled={!data.firstname || !data.lastname || !data.contact_number || !data.password || !data.password_confirmation}
                >
                    Create Account
                </button>
            </form>
            <div className='border-b border-secondary mt-auto mx-2'></div>
            <span className='mt-6 text-center'>Already have an account? <Link className='text-tertiary underline' to={'/login'}>Log In</Link></span>
        </div>
    );
}

export default Signup;
