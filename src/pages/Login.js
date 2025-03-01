import React from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import getCookie from '../lib/getCookie';
import Logo from '../components/Logo';
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
    React.useEffect( () => {
        window.scrollTo(0 ,0);
        // window.localStorage.clear();
    }, []);

    const navigate = useNavigate();

    const [isLoading, setIsloading] = React.useState(false);
    const { setRole, setName, setId } = useStateContext();
    const [data, setData] = React.useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const [errors, setErrors] = React.useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData( (prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

        setErrors("");
    }

    const handlePasswordToggle = () => {
        setShowPassword(prev => !prev);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsloading(true);
        setErrors("");

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.post(
                '/api/login',
                {
                    email: data.email, 
                    password: data.password 
                },
                {
                    headers: {
                        'X-XSRF-TOKEN': getCookie(),    
                        withCredentials: true
                    }
                }
            );

            console.log(res);

            if(res.status === 200){
                setName(res.data.data.name);
                setRole(res.data.data.role);
                setId(res.data.data.id);
                navigate(`/${res.data.data.role}`);
            }

        } catch (err){
            console.log(err);
            if(err.response.status === 422){
                setErrors("Invalid Account");
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
                Login
            </span>
            {errors && <span className='my-4 text-red-500 text-center font-semibold'>{errors}</span>}
            <form
                className='flex flex-col gap-4 mt-4 w-full sm:px-20 md:px-52 lg:px-80'
                onSubmit={handleSubmit}>
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
                        onClick={handlePasswordToggle}
                    >
                        {showPassword ? <FaEye className='text-xl text-light-accent' /> : <FaEyeSlash className='text-xl text-light-accent' />}
                    </span>

                    <span
                        className="pointer-events-none absolute start-0 top-0 -translate-y-1/2 p-0.5 text-xs text-light-accent transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Password
                    </span>
                </label>

                <p className='my-2'>By logging in, you are agreeing to FICELCO <span className='underline cursor-pointer'>terms & conditions and privacy policy</span>.</p>
                
                <button
                    type='submit'
                    className={`h-[44px] rounded-lg font-semibold ${(!data.email || !data.password || isLoading) ? "bg-light-accent text-neutral-600 cursor-not-allowed" : "bg-primary text-white"}`}
                    disabled={(!data.email || !data.password || isLoading)}
                >
                    Log In
                </button>
            </form>
            <span className='mt-6 text-center'><Link className='text-tertiary'>Forgot Password?</Link></span>

            <Link to={'/signup'} className='text-secondary dark:text-primary text-center mt-4'>Don't have an account? Create Account</Link>
        </div>
    )
}

export default Login