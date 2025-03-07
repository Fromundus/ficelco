import React from 'react'
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';
import { Link, useNavigate } from 'react-router-dom';
import getCookie from '../lib/getCookie';
import Logo from '../components/Logo';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ButtonLoader from '../components/ButtonLoader';
import Input from '../components/Input';
import ActionButton from '../components/ActionButton';

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
            }
            setIsloading(false);
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
                onSubmit={handleSubmit}
            >
                <Input
                    type="text"
                    id="name"
                    placeholder="Name"
                    name='name'
                    onChange={handleChange}
                    disabled={isLoading}
                    value={data.name}
                    autoComplete='false'
                    errors={errors.name}
                />

                <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    name='email'
                    onChange={handleChange}
                    disabled={isLoading}
                    value={data.email}
                    autoComplete='false'
                    errors={errors.email}
                />

                <div className='relative'>
                    <Input
                        type={showPassword ? "text" : "password"}
                        name='password'
                        className='w-full'
                        placeholder='New Password'
                        onChange={handleChange}
                        disabled={isLoading}
                        value={data.password}
                    />

                    <span
                        className="absolute top-3 right-0 text-tertiary flex justify-center cursor-pointer w-[50px]"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handlePasswordToggle("password")}
                        disabled={isLoading}
                    >
                        {showPassword ? <FaEye className='text-xl text-light-accent' /> : <FaEyeSlash className='text-xl text-light-accent' />}
                    </span>
                </div>

                <div className='relative'>
                    <Input
                        type={showPasswordConfirmation ? "text" : "password"}
                        name='password_confirmation'
                        className='w-full'
                        placeholder='Confirm New Password'
                        onChange={handleChange}
                        disabled={isLoading}
                        value={data.password_confirmation}
                        errors={errors.password}
                    />

                    <span
                        className="absolute top-3 right-0 text-tertiary flex justify-center cursor-pointer w-[50px]"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handlePasswordToggle("password_confirmation")}
                        disabled={isLoading}
                    >
                        {showPasswordConfirmation ? <FaEye className='text-xl text-light-accent' /> : <FaEyeSlash className='text-xl text-light-accent' />}
                    </span>
                </div>

                <p className='my-2'>By creating an account, you are agreeing to FICELCO <span className='underline cursor-pointer'>terms & conditions and privacy policy</span>.</p>

                <ActionButton
                    label={"Create Account"}
                    processLabel={"Creating"}
                    loading={isLoading}
                    disabled={(!data.name || !data.email || !data.password || !data.password_confirmation || isLoading)}
                    className={"bg-secondary hover:bg-secondary-darker text-white"}
                />
            </form>
            <Link to={'/login'} className='text-secondary dark:text-primary text-center mt-4'>Already have an account? Log In</Link>
        </div>
    )
}

export default Signup