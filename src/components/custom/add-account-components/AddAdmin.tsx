import api, { getCsrf } from '@/api/axios';
import { toast } from '@/hooks/use-toast';
import React, { ChangeEvent, FormEvent } from 'react'
import Modal from '../Modal';
import InputWithLabel from '../InputWithLabel';
import { Plus } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ButtonWithLoading from '../ButtonWithLoading';

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

const AddAdmin = ({ refetch }: { refetch: () => void }) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [addModal, setAddModal] = React.useState(false);
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
            });

            refetch();

            setLoading(false);
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.errors);
            setLoading(false);
        }
    }

    return (
        <Modal title={"Add Admin Account"} buttonLabel={<><Plus/> Add Admin</>} open={addModal} setOpen={setAddModal} >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className='grid grid-cols-2 gap-6'>
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
                                    <SelectItem value="csd">Consumer Services Department</SelectItem>
                                    <SelectItem value="mrbc">Meter Reading and Billing Collection Division</SelectItem>
                                    <SelectItem value="bac">Bids and Awards Committee</SelectItem>
                                    {/* <SelectItem value="user">User</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>
                        {errors?.role && <span className='text-destructive text-sm'>{errors?.role}</span>}
                    </div>
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
        </Modal>
    )
}

export default AddAdmin