import api, { getCsrf } from '@/api/axios';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import InputWithLabel from '@/components/custom/InputWithLabel';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/store/auth';
import { Value } from '@radix-ui/react-select';
import axios from 'axios';
import { ArrowLeftIcon, CheckCircle } from 'lucide-react';
import React, { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom';

type FormData = {
    account_number?: string;
    book?: string;
    name?: string;
    address?: string;
    occupant?: string;
    phone_number?: string;
    email?: string;
    password?: string;
    password_confirmation?: string;
};

type Errors = {
    account_number?: string;
    book?: string;
    name?: string;
    address?: string;
    occupant?: string;
    phone_number?: string;
    email?: string;
    password?: string;
};

type ValidatedData = {
    account_number?: string;
    book?: string;
    name?: string;
    address?: string;
    occupant?: string;
    phone_number?: string;
    email?: string;
    created?: string;
    createdBy?: string;
    status?: string;
}

const RegisterComponent = ({ type }: { type?: string }) => {
    const { login } = useAuth();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [validated, setValidated] = React.useState<boolean>(false);
    const [registered, setRegistered] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<FormData>({
        account_number: "",
        book: "",
        name: "",
        address: "",
        occupant: "",
        phone_number: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = React.useState<Errors>({
        account_number: "",
        book: "",
        name: "",
        address: "",
        occupant: "",
        phone_number: "",
        email: "",
        password: "",
    });

    const [singleError, setSingleError] = React.useState<string | null>(null);

    const [validatedData, setValidatedData] = React.useState<ValidatedData>({
        account_number: "",
        book: "",
        name: "",
        address: "",
        occupant: "",
        phone_number: "",
        email: "",
        created: "",
        createdBy: "",
        status: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        });

        setErrors((prev) => {
            return {
                ...prev,
                [name]: "",
            }
        });

        setSingleError(null);
    }

    const handleValidate = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);
        setSingleError(null);

        try {
            await getCsrf();
            const res = await api.post('/api/validate', formData);
            console.log(res);

            setValidated(true);

            setValidatedData({
                account_number: res.data.data.account_number,
                book: res.data.data.book,
                name: res.data.data.name,
                address: res.data.data.address,
                occupant: res.data.data.occupant,
                phone_number: res.data.data.phone_number,
                email: res.data.data.email,
                created: res.data.data.created,
                createdBy: res.data.data.createdBy,
                status: res.data.data.status,
            });

            setLoading(false);
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.errors);
            setSingleError(err.response.data.message);
            setLoading(false);
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        const registerData = {
            account_number: validatedData.account_number ?? formData.account_number ,
            book: validatedData.book ?? formData.book ,
            name: validatedData.name ?? formData.name ,
            address: validatedData.address ?? formData.address ,
            occupant: validatedData.occupant ?? formData.occupant ,
            phone_number: validatedData.phone_number ?? formData.phone_number ,
            email: validatedData.email ?? formData.email ,
            password: formData.password,
            password_confirmation: formData.password_confirmation,
        }

        try {
            await getCsrf();
            const res = await api.post('/api/register', registerData);
            console.log(res);

            // setFormData({
            //     account_number: "",
            //     book: "",
            //     name: "",
            //     address: "",
            //     occupant: "",
            //     phone_number: "",
            //     email: "",
            //     password: "",
            //     password_confirmation: "",
            // });

            setValidated(false);
            // setValidatedData({
            //     account_number: "",
            //     book: "",
            //     name: "",
            //     address: "",
            //     occupant: "",
            //     phone_number: "",
            //     email: "",
            //     created: "",
            //     createdBy: "",
            //     status: "",
            // });

            setRegistered(true);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.errors);
            setLoading(false);
        }
    }

    const resendVerification = async () => {
        setLoading(true);
        try {
            await getCsrf();
            const res = await api.post("/api/email/resend", { email: formData.email });
            console.log(res);
        } catch {
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className={`${!type && "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"} w-full`}>
            {!validated && !registered && <Card className={`${type === "user" ? "w-full" : "max-w-sm"} mx-auto w-full`}>
                <CardHeader className='flex items-center'>
                    <CardTitle>
                        Validate
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleValidate} className="space-y-6">
                        {singleError && 
                        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-2 w-full text-center">
                            <span className='text-destructive text-sm'>{singleError}</span>
                        </div>
                        }
                        <InputWithLabel
                            id="account_number"
                            name='account_number'
                            type="text"
                            label='Account Number'
                            placeholder="Enter account number"
                            value={formData.account_number}
                            error={errors?.account_number}
                            onChange={handleChange}
                            disabled={loading}
                            minLength={8}
                            maxLength={8}
                        />
                        <InputWithLabel
                            id="book"
                            name='book'
                            type="text"
                            label='Book Number'
                            placeholder="Enter book number"
                            value={formData.book}
                            error={errors?.book}
                            onChange={handleChange}
                            disabled={loading}
                            minLength={6}
                            maxLength={6}
                        />
                        <ButtonWithLoading 
                            type='submit' 
                            className='w-full' 
                            loading={loading}
                            disabled={loading || formData.account_number === "" || formData.book === ""}
                        >
                            Validate
                        </ButtonWithLoading>
                    </form>
                </CardContent>
                {!type && <CardFooter>
                    <div className='text-center w-full text-sm'>
                        Already have an account? {" "}
                        <Button className='p-0 h-fit' variant='link'>
                            <Link className='text-primary underline' to={'/login'}>
                                Login.
                            </Link>
                        </Button>
                    </div>
                </CardFooter>}
            </Card>}

            {validated && <Card className={`${type === "user" ? "w-full" : "max-w-lg"} mx-auto w-full`}>
                <CardHeader className='flex items-center'>
                    {type === "user" && <div className='w-full'>
                        <Button variant='outline' onClick={() => {
                            setValidated(false);
                            setFormData({});
                        }}>
                            <ArrowLeftIcon /> Back
                        </Button>
                    </div>}
                    <CardTitle>
                        Register
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className='grid grid-cols-2 gap-6'> 
                            <InputWithLabel
                                id="account_number"
                                name='account_number'
                                type="text"
                                label='Account Number'
                                placeholder="Enter your account number"
                                value={validatedData.account_number}
                                error={errors?.account_number}
                                onChange={handleChange}
                                minLength={8}
                                maxLength={8}
                                disabled={true}
                            />
                            <InputWithLabel
                                id="book"
                                name='book'
                                type="text"
                                label='Book Number'
                                placeholder="Enter your book number"
                                value={validatedData.book}
                                error={errors?.book}
                                onChange={handleChange}
                                minLength={6}
                                maxLength={6}
                                disabled={true}
                            />
                            <InputWithLabel
                                id="name"
                                name='name'
                                type="text"
                                label='Name'
                                placeholder="Enter your name"
                                value={validatedData.name}
                                error={errors?.name}
                                onChange={handleChange}
                                disabled={true}
                            />
                            <InputWithLabel
                                id="address"
                                name='address'
                                type="text"
                                label='Address'
                                placeholder="Enter your address"
                                value={validatedData.address}
                                error={errors?.address}
                                onChange={handleChange}
                                disabled={true}
                            />
                            <InputWithLabel
                                id="occupant"
                                name='occupant'
                                type="text"
                                label='Occupant'
                                placeholder="Enter your occupant"
                                value={validatedData.occupant}
                                error={errors?.occupant}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="email"
                                name='email'
                                type="email"
                                label='Email'
                                placeholder="Enter your email address"
                                value={validatedData.email}
                                error={errors?.email}
                                onChange={handleChange}
                                disabled={loading}
                            />
                            <InputWithLabel
                                id="phone_number"
                                name='phone_number'
                                type="text"
                                label='Phone Number'
                                placeholder="Enter your phone number"
                                value={validatedData.phone_number}
                                error={errors?.phone_number}
                                onChange={handleChange}
                                disabled={loading}
                                minLength={11}
                                maxLength={11}
                            />
                            <InputWithLabel
                                id="password"
                                name='password'
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                disabled={loading}
                                label='Password'
                            />
                            <InputWithLabel
                                id="password_confirmation"
                                name='password_confirmation'
                                type="password"
                                placeholder="Confirm your password"
                                value={formData.password_confirmation}
                                error={errors?.password}
                                onChange={handleChange}
                                disabled={loading}
                                label='Confirm Password'
                            />
                        </div>
                        <ButtonWithLoading
                            type='submit'
                            disabled={loading}
                            className='w-full'
                            loading={loading}
                        >
                            Create
                        </ButtonWithLoading>
                    </form>
                </CardContent>
                {!type && <CardFooter>
                    <div className='text-center w-full text-sm'>
                        Already have an account? {" "}
                        <Link className='text-primary font-semibold' to={'/login'}>
                            Login.
                        </Link>
                    </div>
                </CardFooter>}
            </Card>}

            {registered && 
                <Card className='card-electric max-w-lg mx-auto w-full text-sm'>
                    <CardHeader className="text-center">
                        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                        <CardTitle className="mt-4 text-2xl font-bold">
                            Registration Successful
                        </CardTitle>
                    </CardHeader>
                    {!type && <CardContent className="space-y-4 text-center">
                        <p className="text-muted-foreground">
                            We’ve sent a verification link to your email account. Please check your inbox and click the link to verify your account.
                        </p>

                        <Button>
                            <Link to={'/login'}>
                                Login
                            </Link>
                        </Button>
                    </CardContent>}
                    {type === "user" && <CardContent className="space-y-4 text-center">
                        <p className="text-muted-foreground">
                            The user account has been created successfully. A verification link has been sent to the user’s email address. They must verify their email before they can log in.
                        </p>
                        <div className='flex items-center gap-2 w-full justify-center'>
                            <Button variant='outline' onClick={() => {
                                setRegistered(false);
                                setValidated(false);
                                setFormData({});
                                setValidatedData({});
                            }}>
                                Create New User Account
                            </Button>
                            <ButtonWithLoading loading={loading} disabled={loading} onClick={resendVerification}>
                                Resend
                            </ButtonWithLoading>
                        </div>

                    </CardContent>}
                </Card>
            }
        </div>
    )
}

export default RegisterComponent
