// import React, { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useToast } from "@/components/ui/use-toast";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import User from "@/types/User";
// import api from "@/api/axios";

// const Account: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const [user, setUser] = useState<User | null>(null);
//   const [imagePreview, setImagePreview] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const { toast } = useToast();

//   useEffect(() => {
//     api.get(`/api/users/${id}`).then((res) => {
//       setUser(res.data);
//     });
//   }, [id]);

//   const handleChange = (field: keyof User, value: string) => {
//     setUser((prev) => prev ? { ...prev, [field]: value } : prev);
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImagePreview(URL.createObjectURL(e.target.files[0]));
//       setUser((prev) =>
//         prev ? { ...prev, profile_picture: e.target.files![0] as any } : prev
//       );
//     }
//   };

//   const handleSave = async () => {
//     if (!user) return;
//     const formData = new FormData();
//     Object.entries(user).forEach(([key, value]) => {
//       formData.append(key, value as any);
//     });

//     setLoading(true);
//     try {
//       await api.post(`/api/users/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       toast({ title: "Profile updated successfully" });
//     } catch (err) {
//       toast({ title: "Error updating profile", variant: "destructive" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return <p>Loading...</p>;

//   return (
//     <Card className="max-w-4xl mx-auto mt-8 p-4">
//       <CardHeader>
//         {/* <CardTitle>Viewing Profile: {user.name}</CardTitle> */}
//       </CardHeader>
//       <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         {/* Left Column: Profile Picture */}
//         <div className="flex flex-col items-center">
//           <Avatar className="w-32 h-32">
//             <AvatarImage src={imagePreview || `/storage/${user.profile_picture}`} />
//             <AvatarFallback>{user.name}</AvatarFallback>
//           </Avatar>
//           <Input type="file" accept="image/*" onChange={handleImageChange} className="mt-3" />
//         </div>

//         {/* Right Column: User Details */}
//         <div className="md:col-span-2 space-y-4">
//           {[
//             ["name", "Name"],
//             ["email", "Email"],
//             ["role", "Role"],
//             ["account_number", "Account Number"],
//             ["book", "Book"],
//             ["occupant", "Occupant"],
//             ["address", "Address"],
//             ["phone_number", "Phone Number"],
//           ].map(([field, label]) => (
//             <div key={field}>
//               <Label htmlFor={field}>{label}</Label>
//               <Input
//                 id={field}
//                 value={(user as any)[field] || ""}
//                 onChange={(e) => handleChange(field as keyof User, e.target.value)}
//               />
//             </div>
//           ))}

//           <Button onClick={handleSave} disabled={loading}>
//             {loading ? "Saving..." : "Save Changes"}
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default Account;

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "react-router-dom";
import User from "@/types/User";
import api from "@/api/axios";
import AdminPage from "@/components/custom/AdminPage";
import CustomTabs from "@/components/custom/CustomTabs";
import { Mail, MapPin, Phone, SquarePen } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import IconButton from "@/components/custom/IconButton";

const Account: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [tab, setTab] = React.useState('overview');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        api.get(`/api/users/${id}`).then((res) => {
        setUser(res.data);
        });
    }, [id]);

    const userName = user?.name?.split("").slice(0, 2).join("").toUpperCase();

    const handleChange = (field: keyof User, value: string) => {
        setUser((prev) => prev ? { ...prev, [field]: value } : prev);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        setImagePreview(URL.createObjectURL(e.target.files[0]));
        setUser((prev) =>
            prev ? { ...prev, profile_picture: e.target.files![0] as any } : prev
        );
        }
    };

    const handleSave = async () => {
        if (!user) return;
        const formData = new FormData();
        Object.entries(user).forEach(([key, value]) => {
        formData.append(key, value as any);
        });

        setLoading(true);
        try {
        await api.post(`/api/users/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        toast({ title: "Profile updated successfully" });
        } catch (err) {
        toast({ title: "Error updating profile", variant: "destructive" });
        } finally {
        setLoading(false);
        }
    };

    if (!user) return <p>Loading...</p>;

    const userTabs = [
        { value: "overview", label: "Overview" },
        { value: "bills", label: "Bills" },
        { value: "transactions", label: "Transactions" },
        { value: "update", label: "Update" },
    ];

    const adminTabs = [
        { value: "overview", label: "Overview" },
        { value: "activities", label: "Activities" },
        { value: "update", label: "Update" },
    ];

    return (
        <AdminPage withBackButton={true} title="Profile Page">
            <div className="w-fit">
                <CustomTabs tabs={user.role === "user" ? userTabs : adminTabs} value={tab} onChange={setTab} />
            </div>
            {tab === "overview" && <div className="w-full grid grid-rows-2 gap-4">
                <div className="grid lg:grid-cols-2 gap-4">
                    <Card className="">
                        <CardHeader className="flex items-center justify-center text-center">
                            <IconButton className="self-end" variant="outline" onClick={() => setTab("update")}>
                                <SquarePen />
                            </IconButton>
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
                    </Card>
                    {user.role !== "user" && <Card className="">
                        <CardHeader>
                            <div className="flex justify-between">
                                <span className="text-lg">Latest Activities</span>
                                <Button className="text-muted-foreground font-normal" variant="ghost" onClick={() => setTab("activities")}>
                                    View All
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>
                    </Card>}
                    {user.role === "user" && <Card className="">
                        <CardHeader>
                            <div className="flex justify-between">
                                <span className="text-lg">Bills</span>
                                <Button className="text-muted-foreground font-normal" variant="ghost" onClick={() => setTab("bills")}>
                                    View All
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            
                        </CardContent>
                    </Card>}
                </div>
                {user.role === "user" && <Card className="w-full">
                    <CardHeader>
                        <div className="flex justify-between">
                            <span className="text-lg">Transactions</span>
                            <Button className="text-muted-foreground font-normal" variant="ghost" onClick={() => setTab("transactions")}>
                                View All
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        
                    </CardContent>
                </Card>}
            </div>}
        </AdminPage>
    );
};

export default Account;
