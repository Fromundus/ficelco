import React from 'react'
import AdminPage from '../../components/Admin/AdminPage'
import getCookie from '../../lib/getCookie';
import { useStateContext } from '../../context/ContextProvider';
import axiosClient from '../../axios-client';
import ButtonLoader from '../../components/ButtonLoader';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';
import Input from '../../components/Input';

function AdminSecurity() {
    const { id } = useStateContext();
    const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState({
        old_password: "",
        password: "",
        password_confirmation: ""
    });

    const [showOldPassword, setShowOldPassword] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = React.useState(false);

    const [errors, setErrors] = React.useState({});

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
    }

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await axiosClient.get('/sanctum/csrf-cookie', { withCredentials: true });

            const res = await axiosClient.put(`/api/user-update-password/${id}`, data, {
                headers: {
                    'X-XSRF-TOKEN': getCookie(),    
                    withCredentials: true
                }
            });

            if(res.status === 200){
                console.log(res);
                setLoading(false);
                setData({
                    old_password: "",
                    password: "",
                    password_confirmation: ""
                });

                toast(`${res.data.message}`);
            }
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.message);
            setLoading(false);
        }
    };

    const handlePasswordToggle = (type) => {
        if(type === "password"){
            !loading && setShowPassword(prev => !prev);
        } else if (type === "password_confirmation"){
            !loading && setShowPasswordConfirmation(prev => !prev);
        } else if (type === "old_password"){
            !loading && setShowOldPassword(prev => !prev);
        }
    }

    return (
        <AdminPage title={"Security"}>
            <div className='p-4'>
                <form className='flex flex-col gap-4 mb-4' onSubmit={handleChangePassword}>
                    <div className='relative'>
                        <Input
                            type={showOldPassword ? "text" : "password"}
                            name='old_password'
                            className='w-full'
                            placeholder='Old Password'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.old_password}
                            errors={errors.old_password}
                        />

                        <span
                            className="absolute top-3 right-0 text-tertiary flex justify-center cursor-pointer w-[50px]"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handlePasswordToggle("old_password")}
                            disabled={loading}
                        >
                            {showOldPassword ? <FaEye className='text-xl text-light-accent' /> : <FaEyeSlash className='text-xl text-light-accent' />}
                        </span>
                    </div>

                    <div className='relative'>
                        <Input
                            type={showPassword ? "text" : "password"}
                            name='password'
                            className='w-full'
                            placeholder='New Password'
                            onChange={handleChange}
                            disabled={loading}
                            value={data.password}
                        />

                        <span
                            className="absolute top-3 right-0 text-tertiary flex justify-center cursor-pointer w-[50px]"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handlePasswordToggle("password")}
                            disabled={loading}
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
                            disabled={loading}
                            value={data.password_confirmation}
                            errors={errors.password}
                        />

                        <span
                            className="absolute top-3 right-0 text-tertiary flex justify-center cursor-pointer w-[50px]"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => handlePasswordToggle("password_confirmation")}
                            disabled={loading}
                        >
                            {showPasswordConfirmation ? <FaEye className='text-xl text-light-accent' /> : <FaEyeSlash className='text-xl text-light-accent' />}
                        </span>
                    </div>

                    <button 
                        className={`p-2 rounded-lg h-11 flex items-center justify-center gap-2 ${loading || !data.old_password || !data.password || !data.password_confirmation ? "bg-light-accent text-dark-line cursor-not-allowed" : "bg-secondary hover:bg-secondary-darker text-white"}`}
                        disabled={loading || !data.old_password || !data.password || !data.password_confirmation}
                    >
                        {loading ? "Changing" : "Change Password"}
                        {loading && <ButtonLoader />}
                    </button>
                </form>
            </div>
        </AdminPage>
    )
}

export default AdminSecurity