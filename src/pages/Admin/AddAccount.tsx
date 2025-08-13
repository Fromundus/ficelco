import React, { ChangeEvent, FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import RegisterComponent from '@/components/custom/RegisterComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputWithLabel from '@/components/custom/InputWithLabel';
import api, { getCsrf } from '@/api/axios';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

type FormData = {
    name?: string;
    email?: string;
    role?: string;
    password?: string;
    password_confirmation?: string;
};

type Errors = {
    name?: string;
    email?: string;
    role?: string;
    password?: string;
};

const AddAccount = () => {
    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const [loading, setLoading] = React.useState<boolean>(false);

    const [formData, setFormData] = React.useState<FormData>({
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: "",
    });

    const [errors, setErrors] = React.useState<Errors>({
        name: "",
        email: "",
        role: "",
        password: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
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
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        try {
            await getCsrf();
            const res = await api.post('/api/registerAdmin', formData);
            console.log(res);

            setFormData({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            });

            toast({
                title: "Created Successfully"
            })

            setLoading(false);
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.errors);
            setLoading(false);
        }
    }

    console.log(type);

    return (
        <>
            {type === 'user' && <RegisterComponent type='user' />}
            {type === 'admin' && 
            <Card className='max-w-lg mx-auto w-full'>
                <CardHeader className='flex items-center'>
                    <CardTitle>
                        Register
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <InputWithLabel
                            id="name"
                            name='name'
                            type="text"
                            label='Name'
                            placeholder="Enter name"
                            value={formData.name}
                            error={errors?.name}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <InputWithLabel
                            id="email"
                            name='email'
                            type="email"
                            label='Email'
                            placeholder="Enter email address"
                            value={formData.email}
                            error={errors?.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-3 w-full'>
                                <Label>
                                    Role
                                </Label>
                                <Select onValueChange={(value) => setFormData((prev) => {
                                    return {
                                        ...prev,
                                        role: value
                                    }
                                })} value={formData.role}>
                                    <SelectTrigger className="w-full" disabled={loading}>
                                        <SelectValue placeholder="Set role..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="superadmin">Super Admin</SelectItem>
                                        <SelectItem value="user">User</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            {errors?.role && <span className='text-destructive text-sm'>{errors?.role}</span>}
                        </div>

                        <InputWithLabel
                            id="password"
                            name='password'
                            type="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            disabled={loading}
                            label='Password'
                        />
                        <InputWithLabel
                            id="password_confirmation"
                            name='password_confirmation'
                            type="password"
                            placeholder="Confirm password"
                            value={formData.password_confirmation}
                            error={errors?.password}
                            onChange={handleChange}
                            disabled={loading}
                            label='Confirm Password'
                        />
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
            </Card>
            }
        </>
    )
}

export default AddAccount
