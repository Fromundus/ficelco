import React from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdArrowBack } from "react-icons/io";
import getCookie from '../lib/getCookie';
import Logo from '../components/Logo';

function Login() {
    React.useEffect( () => {
        window.scrollTo(0 ,0);
        // window.localStorage.clear();
    }, []);

    const navigate = useNavigate();

    const [isLoading, setIsloading] = React.useState(false);
    const { setRole, setName, setId } = useStateContext();
    const [data, setData] = React.useState({
        contact_number: "",
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

            const response = await axiosClient.post(
                '/api/login',
                {
                    contact_number: data.contact_number, 
                    password: data.password 
                },
                {
                    headers: {
                        'X-XSRF-TOKEN': getCookie(),    
                        withCredentials: true
                    }
                }
            );

            console.log(response);

            if(response.status === 200){
                setName(response.data.data.firstname);
                setRole(response.data.data.role);
                setId(response.data.data.user_id);
                navigate(`/${response.data.data.role}`);
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
                Login
            </span>
            {errors && <span className='my-4 text-primary text-center font-semibold'>{errors}</span>}
            <form
                className='flex flex-col gap-4 mt-4'
                onSubmit={handleSubmit}>
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

                <label
                    htmlFor="Password"
                    className="relative block p-0.5 pb-0 border-b-[1px] border-secondary focus-within:border-secondary focus-within:ring-0 focus-within:ring-secondary focus-within:border-b-2 w-full"
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
                        Password
                    </span>
                </label>

                <p className='my-2'>By logging in, you are agreeing to ShopPayo <span className='underline cursor-pointer'>terms & conditions and privacy policy</span>.</p>
                
                <button
                    type='submit'
                    className={`btn font-semibold ${(!data.contact_number || !data.password || isLoading) ? "bg-secondary text-neutral-600" : "bg-primary text-white"}`}
                >
                    Log In
                </button>
            </form>
            <span className='mt-6 text-center'><Link className='text-tertiary'>Forgot Password?</Link></span>
            <div className='border-b border-secondary mt-auto mx-2'></div>
            
            <span className='mt-6 text-center'>Don't have an account? <Link className='text-tertiary underline' to={'/signup'}>Sign up</Link></span>
        </div>
    )
}

export default Login