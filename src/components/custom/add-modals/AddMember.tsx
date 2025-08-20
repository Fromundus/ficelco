import api, { getCsrf } from '@/api/axios';
import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import Modal from '../Modal';
import { Plus } from 'lucide-react';
import InputWithLabel from '../InputWithLabel';
import ButtonWithLoading from '../ButtonWithLoading';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type FormData = {
    account_number?: string;
    book?: string;
    name?: string;
    address?: string;
    occupant?: string;
    phone_number?: string;
    email?: string;
};

type Errors = {
    account_number?: string;
    book?: string;
    name?: string;
    address?: string;
    occupant?: string;
    phone_number?: string;
    email?: string;
};

const AddMember = ({ refetch }: { refetch: () => void }) => {
    const [openModal, setOpenModal] = React.useState(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [formData, setFormData] = React.useState<FormData>({
        account_number: "",
        book: "",
        name: "",
        address: "",
        occupant: "",
        phone_number: "",
        email: "",
    });

    const [errors, setErrors] = React.useState<Errors>({
        account_number: "",
        book: "",
        name: "",
        address: "",
        occupant: "",
        phone_number: "",
        email: "",
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

    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors(null);

        const registerData = {
            account_number: formData.account_number ,
            book: formData.book ,
            name: formData.name ,
            address: formData.address ,
            occupant: formData.occupant ,
            phone_number: formData.phone_number ,
            email: formData.email ,
        }

        try {
            await getCsrf();
            const res = await api.post('/api/member', registerData);
            console.log(res);

            setFormData({
                account_number: "",
                book: "",
                name: "",
                address: "",
                occupant: "",
                phone_number: "",
                email: "",
            });

            refetch();

            toast({
                title: "Successfully Created"
            });

            setLoading(false);
        } catch (err) {
            console.log(err);
            setErrors(err.response.data.errors);
            setLoading(false);
        }
    }

    useEffect(() => {
        setFormData({});
    }, [openModal]);

    return (
        <>
            <Modal title='Add Member' buttonLabel={<><Plus /> Add Member</>} open={openModal} setOpen={setOpenModal} >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className='grid grid-cols-2 gap-6'> 
                        <InputWithLabel
                            id="account_number"
                            name='account_number'
                            type="text"
                            label='Account Number'
                            placeholder="Enter your account number"
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
                            placeholder="Enter your book number"
                            value={formData.book}
                            error={errors?.book}
                            onChange={handleChange}
                            disabled={loading}
                            minLength={6}
                            maxLength={6}
                        />
                        <InputWithLabel
                            id="name"
                            name='name'
                            type="text"
                            label='Name'
                            placeholder="Enter your name"
                            value={formData.name}
                            error={errors?.name}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <InputWithLabel
                            id="address"
                            name='address'
                            type="text"
                            label='Address'
                            placeholder="Enter your address"
                            value={formData.address}
                            error={errors?.address}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        <InputWithLabel
                            id="occupant"
                            name='occupant'
                            type="text"
                            label='Occupant'
                            placeholder="Enter your occupant"
                            value={formData.occupant}
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
                            value={formData.email}
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
                            value={formData.phone_number}
                            error={errors?.phone_number}
                            onChange={handleChange}
                            disabled={loading}
                            minLength={11}
                            maxLength={11}
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
            </Modal>
        </>
    )
}

export default AddMember
