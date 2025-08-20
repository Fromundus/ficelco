import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
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
import { MoreVertical, Plus, PlusCircle, Save, Shield, Trash, User as UserIcon, UserCheck, Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import IconButton from "./IconButton";
import { Link, useNavigate } from "react-router-dom";
import User from "@/types/User";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Modal from "./Modal";
import InputWithLabel from "./InputWithLabel";
import { Label } from "../ui/label";
import ButtonWithLoading from "./ButtonWithLoading";
import AddAdmin from "./add-modals/AddAdmin";
import AddUser from "./add-modals/AddUser";

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

  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [deleteModal, setDeleteModal] = useState(false);

  const [fetchTotal, setFetchTotal] = useState();

  const [counts, setCounts] = useState({
    total: 0,
    superadmin: 0,
    csd: 0,
    mrbc: 0,
    bac: 0,
    user: 0,
  });
  
  // console.log(counts);

  const fetchUsers = async (searchQuery = debouncedSearch) => {
    setLoading(true);
    const res = await api.get(`/api/users`, {
      params: { 
        page, 
        per_page: perPage, 
        search: searchQuery,
        role: selectedRole,
        status: selectedStatus,
      },
    });
    console.log(res);
    setUsers(res.data.users.data);
    setTotalPages(res.data.users.last_page);
    setFetchTotal(res.data.users.total);
    setCounts(res.data.counts);
    setLoading(false);
  };

  // Fetch when page or search changes
  useEffect(() => {
    fetchUsers();
  }, [page, debouncedSearch, selectedRole, selectedStatus]);

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
    setLoading(true);
    
    try {
      await getCsrf();
      await api.delete("/api/users", { data: { ids: selected } });

      toast({
        title: "Deleted Successfully",
      });

      setSelected([]);
      setDeleteModal(false);
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
    setLoading(true);

    try {
      await getCsrf();
      await api.put("/api/users/role", { ids, role });

      toast({
        title: "Updated Successfully",
      });

      setBulkRole("");
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

      toast({
        title: "Password Reset Link Sent",
      });

      setLoading(false);

      // fetchUsers();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const resetPasswordDefault = async (id: number) => {
    setLoading(true);
    try {
      await getCsrf();
      await api.post('/api/reset-password-default/', { id });

      toast({
        title: "Password Reset Success",
      });

      setLoading(false);

      // fetchUsers();
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const resendVerification = async (email: string) => {
    setLoading(true);
    try {
      await getCsrf();
      const res = await api.post("/api/email/resend", { email });

      toast({
        title: "Email Verification Sent",
      });

      console.log(res);
    } catch {
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (id: number) => {
    setLoading(true);
    try {
      await getCsrf();
      const res = await api.post("/api/email-verify", { id });

      toast({
        title: "Verified",
      });

      fetchUsers();

      console.log(res);
    } catch (err){
      toast({
        title: err.response.data.message,
      });
    }
  };

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Search + Bulk Actions */}
      <div className="flex gap-6 flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Account Management</h2>
          <p className="text-muted-foreground">Manage account information and records</p>
        </div>
        <div className="space-x-4">
          {/* <Button>
            <Link className="flex items-center gap-2" to={'add'}>
              <Plus /> Add Account
            </Link>
          </Button> */}

          <AddUser refetch={fetchUsers} />

          <AddAdmin refetch={fetchUsers} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Super Admins</p>
                <p className="text-2xl font-bold">{counts.superadmin}</p>
              </div>
              <Shield className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Admins</p>
                <p className="text-2xl font-bold">{counts.bac + counts.csd + counts.mrbc}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Users</p>
                <p className="text-2xl font-bold">{counts.user}</p>
              </div>
              <UserIcon className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{counts.total}</p>
              </div>
              <UserIcon className="h-8 w-8 text-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col w-full lg:justify-between lg:flex-row gap-2">
            <div className="relative w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10"
              />
            </div>

            <Select value={selectedRole} onValueChange={setSelectedRole} disabled={loading}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
                <SelectItem value="csd">Consumer Services Department</SelectItem>
                <SelectItem value="mrbc">Meter Reading and Billing Collection Division</SelectItem>
                <SelectItem value="bac">Bids and Awards Committee</SelectItem>
                <SelectItem value="user">User</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus} disabled={loading}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="notverified">Not Verified</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="w-full flex flex-col gap-6 lg:flex-row lg:justify-between lg:items-center">
            <CardTitle>
              Account Records
            </CardTitle>
              <div className="flex items-center gap-2">
                  <>
                    <Select onValueChange={setBulkRole} value={bulkRole} disabled={selected.length === 0 || loading}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Set role..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="superadmin">Super Admin</SelectItem>
                        <SelectItem value="csd">Consumer Services Department</SelectItem>
                        <SelectItem value="mrbc">Meter Reading and Billing Collection Division</SelectItem>
                        <SelectItem value="bac">Bids and Awards Committee</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                      </SelectContent>
                    </Select>

                    <IconButton className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => {
                        if (bulkRole) updateRole(selected, bulkRole);
                      }} disabled={selected.length === 0 || loading}>
                      <Save />
                    </IconButton>
                    <Modal disabled={selected.length === 0 || loading} title="Delete Accounts" buttonLabel={<Trash />} buttonClassName="w-10 h-10 bg-destructive text-white hover:bg-destructive/50" open={deleteModal} setOpen={setDeleteModal}>
                      <p>Are you sure you want to delete?</p>
                      <div className="w-full grid grid-cols-2 gap-2">
                        <ButtonWithLoading className="w-full" loading={loading} disabled={loading || selected.length === 0} onClick={bulkDelete}>
                          Yes
                        </ButtonWithLoading>
                        <Button variant="outline" onClick={() => setDeleteModal(false)}>
                          Cancel
                        </Button>
                      </div>
                    </Modal>

                    {/* <IconButton variant="destructive" onClick={bulkDelete} disabled={selected.length === 0 || loading}>
                      <Trash />
                    </IconButton> */}
                  </>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Table */}
          <Table>
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
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
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
                        disabled={loading}
                      >
                        <SelectTrigger className="w-[130px]">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="superadmin">Super Admin</SelectItem>
                          <SelectItem value="csd">Consumer Services Department</SelectItem>
                          <SelectItem value="mrbc">Meter Reading and Billing Collection Division</SelectItem>
                          <SelectItem value="bac">Bids and Awards Committee</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell>{u.email_verified_at ? 
                      <Badge className="bg-green-500 text-white hover:bg-green-600">Verified</Badge>
                      :
                      <Badge className="text-nowrap" variant="destructive">Not Verified</Badge>
                    }</TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="hover:bg-secondary hover:text-foreground">
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => navigate(`${u.id}`)}
                          >View</DropdownMenuItem>
                          {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}

                          {u.email_verified_at && <DropdownMenuItem onClick={() => resetPassword(u.email)}>
                            Reset Password (Email)
                          </DropdownMenuItem>}

                          {u.email_verified_at && <DropdownMenuItem onClick={() => resetPasswordDefault(u.id)}>
                            Reset Password
                          </DropdownMenuItem>}

                          {!u.email_verified_at && <DropdownMenuItem onClick={() => resendVerification(u.email)}>
                            Resend Verification (Email)
                          </DropdownMenuItem>}

                          {!u.email_verified_at && <DropdownMenuItem onClick={() => verifyEmail(u.id)}>
                            Verify
                          </DropdownMenuItem>}

                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <div className="flex items-center justify-between gap-4 w-full mt-4">
            <span className="text-sm text-muted-foreground">{selected.length} of {fetchTotal} row(s) selected.</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              <span className="px-4 text-sm flex items-center bg-background border p-2 rounded">
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
        </CardContent>
      </Card>


    </div>
  );
}

