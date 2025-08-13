// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import api, { getCsrf } from "@/api/axios";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { MoreVertical } from "lucide-react";

// interface User {
//   id: number;
//   name: string;
//   email: string;
//   account_number: string;
//   role: string;
// }

// export default function AccountsTable() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selected, setSelected] = useState<number[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [bulkRole, setBulkRole] = useState("");

//   const fetchUsers = async () => {
//     setLoading(true);
//     const res = await api.get(`/api/users`, {
//       params: { page, per_page: perPage, search },
//     });
//     setUsers(res.data.data);
//     setTotalPages(res.data.last_page);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, [page]);

//   const toggleSelect = (id: number) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   const selectAll = () => {
//     if (selected.length === users.length) {
//       setSelected([]);
//     } else {
//       setSelected(users.map((u) => u.id));
//     }
//   };

//   const bulkDelete = async () => {
//     if (!selected.length) return;
//     await getCsrf();
//     await api.delete("/api/users", { data: { ids: selected } });
//     setSelected([]);
//     fetchUsers();
//   };

//   const updateRole = async (ids: number[], role: string) => {
//     if (!ids.length) return;
//     await getCsrf();
//     await api.put("/api/users/role", { ids, role });
//     fetchUsers();
//   };

// const resetPassword = async (email: string) => {
//     try {
//       const data = {
//         email: email,
//       }

//       await getCsrf();

//       const res = await api.post('/api/forgot-password', data);
//       console.log(res);

//       fetchUsers();
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   return (
//     <div className="space-y-4">
//       {/* Search + Bulk Actions */}
//       <div className="flex flex-wrap gap-2 items-center">
//         <Input
//           placeholder="Search users..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-xs"
//         />
//         <Button onClick={() => { setPage(1); fetchUsers(); }}>Search</Button>

//         {selected.length > 0 && (
//           <>
//             <Select onValueChange={setBulkRole} value={bulkRole}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Set role..." />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="superadmin">Super Admin</SelectItem>
//                 <SelectItem value="user">User</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button
//               onClick={() => {
//                 if (bulkRole) updateRole(selected, bulkRole);
//               }}
//             >
//               Update Role ({selected.length})
//             </Button>
//             <Button variant="destructive" onClick={bulkDelete}>
//               Delete Selected ({selected.length})
//             </Button>
//           </>
//         )}
//       </div>

//       {/* Table */}
//       <div className="border rounded-md">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">
//                 <Checkbox
//                   checked={selected.length === users.length && users.length > 0}
//                   onCheckedChange={selectAll}
//                 />
//               </TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Account Number</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center">
//                   Loading...
//                 </TableCell>
//               </TableRow>
//             ) : users.length > 0 ? (
//               users.map((u) => (
//                 <TableRow key={u.id}>
//                   <TableCell>
//                     <Checkbox
//                       checked={selected.includes(u.id)}
//                       onCheckedChange={() => toggleSelect(u.id)}
//                     />
//                   </TableCell>
//                   <TableCell>{u.name}</TableCell>
//                   <TableCell>{u.email}</TableCell>
//                   <TableCell>{u.account_number}</TableCell>
//                   <TableCell>
//                     <Select
//                       value={u.role}
//                       onValueChange={(role) => updateRole([u.id], role)}
//                     >
//                       <SelectTrigger className="w-[130px]">
//                         <SelectValue placeholder="Select role" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="superadmin">Super Admin</SelectItem>
//                         <SelectItem value="user">User</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </TableCell>
//                   <TableCell>
//                     {/* <Button
//                       size="sm"
//                       variant="destructive"
//                       onClick={() => bulkDelete()}
//                     >
//                       Delete
//                     </Button> */}

//                     <DropdownMenu>
//                         <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" className="hover:bg-secondary hover:text-foreground">
//                                 <MoreVertical />
//                             </Button>
//                         </DropdownMenuTrigger>
//                         <DropdownMenuContent align="end" className="">
//                             <DropdownMenuItem>
//                                 View
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                                 Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem onClick={() => resetPassword(u.email)}>
//                                 Reset Password
//                             </DropdownMenuItem>
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : !loading && (
//               <TableRow>
//                 <TableCell colSpan={6} className="text-center">
//                   No users found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-end gap-2 w-full">
//         <Button
//           variant="outline"
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//         >
//           Prev
//         </Button>
//         <span className="px-4 text-sm flex items-center border rounded">
//           Page {page} of {totalPages}
//         </span>
//         <Button
//           variant="outline"
//           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//           disabled={page === totalPages}
//         >
//           Next
//         </Button>
//       </div>
//     </div>
//   );
// }

import React, { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import api, { getCsrf } from "@/api/axios";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreVertical, Plus, PlusCircle, Save, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Modal from "./Modal";
import ButtonWithLoading from "./ButtonWithLoading";
import IconButton from "./IconButton";
import InputWithLabel from "./InputWithLabel";
import { Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  email: string;
  account_number: string;
  role: string;
}

export default function AccountsTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search); // new
  const [loading, setLoading] = useState(false);
  const [bulkRole, setBulkRole] = useState("");

  const [open, setOpen] = React.useState(false);

  const [newUser, setNewUser] = React.useState({
    account_number: "",
    book: "",
    name: "",
    address: "",
    occupant: "",
    phone_number: "",
    email: "",
  });

  const [errors, setErrors] = React.useState({
    account_number: "",
    book: "",
    name: "",
    address: "",
    occupant: "",
    phone_number: "",
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewUser((prev) => {
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

  const fetchUsers = async (searchQuery = debouncedSearch) => {
    setLoading(true);
    const res = await api.get(`/api/users`, {
      params: { page, per_page: perPage, search: searchQuery },
    });
    setUsers(res.data.data);
    setTotalPages(res.data.last_page);
    setLoading(false);
  };

  // Fetch when page or search changes
  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 1000); // 1 second debounce

    return () => clearTimeout(handler);
  }, [search]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === users.length) {
      setSelected([]);
    } else {
      setSelected(users.map((u) => u.id));
    }
  };

  const bulkDelete = async () => {
    if (!selected.length) return;

    try {
      await getCsrf();
      await api.delete("/api/users", { data: { ids: selected } });

      toast({
        title: "Deleted Successfully",
      });

      setSelected([]);
      fetchUsers();

    } catch (err) {
      console.log(err);
      toast({
        title: err.response.status,
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  const updateRole = async (ids: number[], role: string) => {
    if (!ids.length) return;
    try {
      await getCsrf();
      await api.put("/api/users/role", { ids, role });

      toast({
        title: "Updated Successfully",
      });

      setSelected([]);
      fetchUsers();
    } catch (err) {
      console.log(err);
      toast({
        title: err.response.status,
        description: err.response.data.message,
        variant: "destructive",
      });
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    try {
      await getCsrf();
      await api.post('/api/forgot-password', { email });
      fetchUsers();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
        await getCsrf();
        const res = await api.post('/api/register', newUser);
        console.log(res);

        setNewUser({
            account_number: "",
            book: "",
            name: "",
            address: "",
            occupant: "",
            phone_number: "",
            email: "",
        });
        setLoading(false);

        toast({
          title: "Created Successfully"
        });

        fetchUsers();
    } catch (err) {
        console.log(err);
        setErrors(err.response.data.errors);
        toast({
          title: err.response.status,
          description: err.response.data.message,
          variant: "destructive",
        });
        setLoading(false);
    }
}

  return (
    <div className="space-y-4">
      {/* Search + Bulk Actions */}
      <div className="flex flex-col lg:justify-between lg:flex-row gap-4">
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />

        <div className="flex items-center gap-4">
          {selected.length > 0 && (
            <>
              <Select onValueChange={setBulkRole} value={bulkRole}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Set role..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                </SelectContent>
              </Select>

              <IconButton className="bg-blue-500 hover:bg-blue-600" onClick={() => {
                  if (bulkRole) updateRole(selected, bulkRole);
                }} disabled={selected.length === 0}>
                <Save /> ({selected.length})
              </IconButton>
              <IconButton variant="destructive" onClick={bulkDelete} disabled={selected.length === 0}>
                <Trash /> ({selected.length})
              </IconButton>
            </>
          )}
          <IconButton>
            <Link className="flex items-center gap-2" to={'add?type=user'}>
              <PlusCircle /> Add User
            </Link>
          </IconButton>
          <IconButton>
            <Link className="flex items-center gap-2" to={'add?type=admin'}>
              <PlusCircle /> Add Admin
            </Link>
          </IconButton>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table className="bg-card">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={selected.length === users.length && users.length > 0}
                  onCheckedChange={selectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Account Number</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : users.length > 0 ? (
              users.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>
                    <Checkbox
                      checked={selected.includes(u.id)}
                      onCheckedChange={() => toggleSelect(u.id)}
                    />
                  </TableCell>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.account_number}</TableCell>
                  <TableCell>
                    <Select
                      value={u.role}
                      onValueChange={(role) => updateRole([u.id], role)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="hover:bg-secondary hover:text-foreground">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => resetPassword(u.email)}>
                          Reset Password
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-2 w-full">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </Button>
        <span className="px-4 text-sm flex items-center border rounded">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
