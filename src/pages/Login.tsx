import api, { getCsrf } from '@/api/axios';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import InputWithLabel from '@/components/custom/InputWithLabel';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/auth';
import { Value } from '@radix-ui/react-select';
import axios from 'axios';
import React, { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom';

type FormData = {
    email: string;
    password: string;
}

const Login = () => {
    const { login } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<FormData>({
        email: "",
        password: "",
    });

    const [errors, setErrors] = React.useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });

        setErrors(null);
    }
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        try {
            await login(formData.email, formData.password);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.message);
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen py-12 flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <Card className='card-electric max-w-lg mx-auto w-full'>
                    <CardHeader className='flex items-center'>
                        <CardTitle>
                            Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {errors && 
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 w-full text-center">
                                <span className='text-destructive text-sm'>{errors}</span>
                            </div>
                            }
                            <InputWithLabel
                                id="email"
                                name='email'
                                type="text"
                                label='Email'
                                placeholder="Enter your email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <InputWithLabel
                                id="password"
                                name='password'
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                label='Password'
                            />
                            <ButtonWithLoading
                                type='submit'
                                disabled={loading || formData.email === "" || formData.password === ""}
                                className='w-full'
                                loading={loading}
                            >
                                Login
                            </ButtonWithLoading>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <div className='text-center w-full text-sm'>
                            Don't have an account? {" "}
                            <Link className='text-primary font-semibold' to={'/register'}>
                                Create Account.
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default Login
