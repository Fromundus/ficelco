import React from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import getCookie from '../lib/getCookie';
import Logo from '../components/Logo';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonLoader from '../components/ButtonLoader';

function Signup() {
    React.useEffect( () => {
        window.scrollTo(0 ,0);
    }, []);

    const navigate = useNavigate();

    const [isLoading, setIsloading] = React.useState(false);
    const { setRole, setName, setId } = useStateContext();
    const [data, setData] = React.useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

    const [errors, setErrors] = React.useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

        setErrors( (prev) => {
            return {
                ...prev,
                [name]: ""
            }
        })
    }

    const handlePasswordToggle = (type) => {
        if(type === "password"){
            setShowPassword(prev => !prev);
        } else if (type === "password_confirmation"){
            setShowPasswordConfirmation(prev => !prev);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsloading(true);
        setErrors("");

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.post('/api/register', data, {
                    headers: {
                        'X-XSRF-TOKEN': getCookie(),    
                        withCredentials: true
                    }
                }
            );

            console.log(res);

            if(res.status === 200){
                setIsloading(false);
                navigate(`/login`);
            }

        } catch (err){
            console.log(err);
            if(err.response.status === 422){
                setErrors(err.response.data.message);
                setIsloading(false);
            }
        }
    }

    return (
        <div className='min-h-[100svh] p-4 flex flex-col w-full'>
            <div className='flex w-full justify-center items-center mt-4'>
                <Logo width={"70px"} height={"70px"} />
            </div>
            <span className='text-center text-2xl font-semibold my-2 mt-4'>
                Create Account
            </span>
            <form
                className='flex flex-col gap-4 mt-4 w-full sm:px-20 md:px-52 lg:px-80'
                onSubmit={handleSubmit}>
                <label
                    htmlFor="name"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-light-accent focus-within:border-primary focus-within:ring-0 focus-within:ring-light-accent w-full"
                    >
                    <input
                        type="text"
                        id="name"
                        className="peer px-1 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full appearance-none"
                        placeholder="name"
                        name='name'
                        onChange={handleChange}
                        value={data.name}
                        autoComplete='false'
                    />

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-light-accent transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Name
                    </span>
                </label>
                {errors.name && <span className='text-red-500'>{errors.name}</span>}

                <label
                    htmlFor="email"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-light-accent focus-within:border-primary focus-within:ring-0 focus-within:ring-light-accent w-full"
                    >
                    <input
                        type="email"
                        id="email"
                        className="peer px-1 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full appearance-none"
                        placeholder="email"
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        autoComplete='false'
                    />

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-light-accent transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Email
                    </span>
                </label>
                {errors.email && <span className='text-red-500'>{errors.email}</span>}

                <label
                    htmlFor="Password"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-light-accent focus-within:border-primary focus-within:ring-0 focus-within:ring-light-accent w-full"
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
                        className="absolute top-3 right-0 text-tertiary flex justify-center cursor-pointer w-[50px]"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handlePasswordToggle("password")}
                    >
                        {showPassword ? <FaEye className='text-xl text-light-accent' /> : <FaEyeSlash className='text-xl text-light-accent' />}
                    </span>

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-light-accent transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Password
                    </span>
                </label>

                <label
                    htmlFor="PasswordConfirmation"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-light-accent focus-within:border-primary focus-within:ring-0 focus-within:ring-light-accent w-full"
                    >
                    <input
                        type={showPasswordConfirmation ? "text" : "password"}
                        id="PasswordConfirmation"
                        className="peer px-1 border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 w-full"
                        placeholder="Confirm Password"
                        name='password_confirmation'
                        onChange={handleChange}
                        value={data.password_confirmation}
                        autoComplete='false'
                    />

                    <span
                        className="absolute top-3 right-0 text-tertiary flex justify-center cursor-pointer w-[50px]"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handlePasswordToggle("password_confirmation")}
                    >
                        {showPasswordConfirmation ? <FaEye className='text-xl text-light-accent' /> : <FaEyeSlash className='text-xl text-light-accent' />}
                    </span>

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-light-accent transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                        >
                        Password
                    </span>
                </label>
                {errors.password && <span className='text-red-500'>{errors.password}</span>}

                <p className='my-2'>By creating an account, you are agreeing to FICELCO <span className='underline cursor-pointer'>terms & conditions and privacy policy</span>.</p>
                
                <button
                    type='submit'
                    className={`h-[44px] rounded-lg font-semibold flex items-center gap-2 justify-center ${(!data.name || !data.email || !data.password || !data.password_confirmation || isLoading) ? "bg-light-accent text-dark-line cursor-not-allowed" : "bg-primary text-white"}`}
                    disabled={(!data.name || !data.email || !data.password || !data.password_confirmation || isLoading)}
                    // disabled={true}
                >
                    Create
                    {isLoading && <ButtonLoader />}
                </button>
            </form>
            <Link to={'/login'} className='text-secondary dark:text-primary text-center mt-4'>Already have an account? Log In</Link>
        </div>
    )
}

export default Signup