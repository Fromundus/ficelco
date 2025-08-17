import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import User from "@/types/User";
import api from "@/api/axios";
import AdminPage from "@/components/custom/AdminPage";
import CustomTabs from "@/components/custom/CustomTabs";
import { ArrowLeft, Mail, MapPin, Phone, SquarePen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import IconButton from "@/components/custom/IconButton";
import Loading from "@/components/Loading";
import Modal from "@/components/custom/Modal";
import InputWithLabel from "@/components/custom/InputWithLabel";
import ButtonWithLoading from "@/components/custom/ButtonWithLoading";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

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

const Account: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const { toast } = useToast();

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

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/api/users/${id}`);
            setUser(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchUser();
    }, [id]);

    React.useEffect(() => {
        if(user){
            setFormData(() => {
                return {
                    account_number: user.account_number,
                    book: user.book,
                    name: user.name,
                    address: user.address,
                    occupant: user.occupant,
                    phone_number: user.phone_number,
                    email: user.email,
                }
            });
        }
    }, [user]);

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


    // console.log(user);

    // console.log(formData);

    const userName = user?.name?.split("").slice(0, 2).join("").toUpperCase();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setUser((prev) =>
            prev ? { ...prev, profile_picture: e.target.files![0] as any } : prev
        );
        }
    };

    const handleSave = async (e: FormEvent) => {
        e.preventDefault();
        if (!user) return;
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
        formData?.append(key, value as any);
        });

        setButtonLoading(true);

        try {
        await api.post(`/api/users/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        toast({ title: "Profile updated successfully" });
        fetchUser();
        } catch (err) {
        toast({ title: "Error updating profile", variant: "destructive" });
        } finally {
        setLoading(false);
        setButtonLoading(false);
        }
    };

    if (loading) return <div className="flex items-center justify-center min-h-[80vh]">Loading...</div>;

    if (!loading && !user) {
    return (
        <AdminPage withBackButton={true}>
            <div className="min-h-[60vh] flex items-center justify-center w-full">
                <Card>
                    <CardContent className="pt-6">
                        <p className="text-center">Resident not found</p>
                    </CardContent>
                </Card>
            </div>
        </AdminPage>    
    );
    }

    return (
        <AdminPage withBackButton={true} title={user.name} description={user.role} titleAction={
            <Modal title={"Update"} open={editModal} setOpen={setEditModal} buttonLabel={
                <>
                    <SquarePen /> Update Account
                </>
            }>
                <form onSubmit={handleSave} className="space-y-6">
                    <div className='grid grid-cols-2 gap-6'> 
                        {user.role === "user" && <InputWithLabel
                            id="account_number"
                            name='account_number'
                            type="text"
                            label='Account Number'
                            placeholder="Enter your account number"
                            value={formData?.account_number}
                            error={errors?.account_number}
                            onChange={handleChange}
                            minLength={8}
                            maxLength={8}
                            disabled={true}
                        />}
                        {user.role === "user" && <InputWithLabel
                            id="book"
                            name='book'
                            type="text"
                            label='Book Number'
                            placeholder="Enter your book number"
                            value={formData?.book}
                            error={errors?.book}
                            onChange={handleChange}
                            minLength={6}
                            maxLength={6}
                            disabled={true}
                        />}
                        <InputWithLabel
                            id="name"
                            name='name'
                            type="text"
                            label='Name'
                            placeholder="Enter your name"
                            value={formData?.name}
                            error={errors?.name}
                            onChange={handleChange}
                            // disabled={true}
                        />
                        {user.role === "user" && <InputWithLabel
                            id="address"
                            name='address'
                            type="text"
                            label='Address'
                            placeholder="Enter your address"
                            value={formData?.address}
                            error={errors?.address}
                            onChange={handleChange}
                            disabled={true}
                        />}
                        {user.role === "user" && <InputWithLabel
                            id="occupant"
                            name='occupant'
                            type="text"
                            label='Occupant'
                            placeholder="Enter your occupant"
                            value={formData?.occupant}
                            error={errors?.occupant}
                            onChange={handleChange}
                            disabled={loading}
                        />}
                        <InputWithLabel
                            id="email"
                            name='email'
                            type="email"
                            label='Email'
                            placeholder="Enter your email address"
                            value={formData?.email}
                            error={errors?.email}
                            onChange={handleChange}
                            disabled={loading}
                        />
                        {user.role === "user" && <InputWithLabel
                            id="phone_number"
                            name='phone_number'
                            type="text"
                            label='Phone Number'
                            placeholder="Enter your phone number"
                            value={formData?.phone_number}
                            error={errors?.phone_number}
                            onChange={handleChange}
                            disabled={loading}
                            minLength={11}
                            maxLength={11}
                        />}
                    </div>
                    <div className="w-full grid grid-cols-2 gap-2">
                        <ButtonWithLoading
                            type='submit'
                            disabled={loading}
                            className='w-full'
                            loading={buttonLoading}
                        >
                            Update
                        </ButtonWithLoading>
                        <Button type="button" variant="outline" onClick={() => setEditModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>
        }>
            <div className="w-full space-y-6">
                {/* <Card className="">
                    <CardHeader className="flex items-center justify-center text-center">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={imagePreview || `/storage/${user.profile_picture}`} />
                            <AvatarFallback className="text-3xl">{userName}</AvatarFallback>
                        </Avatar>
                        <span className="text-lg font-semibold">{user.name}</span>
                        <span className="text-muted-foreground uppercase text-sm">{user.role}</span>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col gap-4">
                        {user.email && <div className="flex items-center gap-4">
                            <Mail className="w-4" />
                            <span>{user.email}</span>
                        </div>}
                        {user.phone_number && <div className="flex items-center gap-4">
                            <Phone className="w-4" />
                            <span>{user.phone_number}</span>
                        </div>}
                        {user.address && <div className="flex items-center gap-4">
                            <MapPin className="w-4" />
                            <span>{user.address}</span>
                        </div>}
                    </CardContent>
                </Card> */}

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Personal Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {user.name && <div className="flex flex-col">
                                <span className="text-muted-foreground">Name</span>
                                <span>{user.name}</span>
                            </div>}
                            {user.account_number && <div className="flex flex-col">
                                <span className="text-muted-foreground">Account Number</span>
                                <span>{user.account_number}</span>
                            </div>}
                            {user.book && <div className="flex flex-col">
                                <span className="text-muted-foreground">Book</span>
                                <span>{user.book}</span>
                            </div>}
                            {user.address && <div className="flex flex-col">
                                <span className="text-muted-foreground">Address</span>
                                <span>{user.address}</span>
                            </div>}
                            {user.occupant && <div className="flex flex-col">
                                <span className="text-muted-foreground">Occupant</span>
                                <span>{user.occupant}</span>
                            </div>}
                            {user.email && <div className="flex flex-col">
                                <span className="text-muted-foreground">Email</span>
                                <span>{user.email}</span>
                            </div>}
                            {user.phone_number && <div className="flex flex-col">
                                <span className="text-muted-foreground">Phone Number</span>
                                <span>{user.phone_number}</span>
                            </div>}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>
                            Registratrion Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="flex flex-col">
                                <span className="text-muted-foreground">Date Created</span>
                                <span>{format(new Date(user.created_at), "PPpp")}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-muted-foreground">Email Status</span>
                                {user.email_verified_at ? 
                                    <Badge className="bg-green-500 text-white hover:bg-green-600 w-fit">Verified</Badge>
                                    :
                                    <Badge className="text-nowrap w-fit" variant="destructive">Not Verified</Badge>
                                }
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AdminPage>
    );
};

export default Account;
