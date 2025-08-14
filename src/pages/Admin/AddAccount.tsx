import React, { ChangeEvent, FormEvent } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RegisterComponent from '@/components/custom/RegisterComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputWithLabel from '@/components/custom/InputWithLabel';
import api, { getCsrf } from '@/api/axios';
import ButtonWithLoading from '@/components/custom/ButtonWithLoading';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import AdminPage from '@/components/custom/AdminPage';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import CustomTabs from '@/components/custom/CustomTabs';

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
    const [type, setType] = React.useState('user');
    const [loading, setLoading] = React.useState<boolean>(false);

    const [tab, setTab] = React.useState("overview");

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

    const handleToggleType = (type: string) => {
        setType(type);
    }

    const typeTab = [
        { value: "user", label: "User" },
        { value: "admin", label: "Admin" },
    ];

    const navigate = useNavigate();

    return (
        <AdminPage withBackButton={true} title='Add Account'>
            <div className='w-fit mb-4'>
                <CustomTabs tabs={typeTab} value={type} onChange={setType} />
            </div>

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
        </AdminPage>
    )
}

export default AddAccount
