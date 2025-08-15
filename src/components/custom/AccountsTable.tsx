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
import { MoreVertical, Plus, PlusCircle, Save, Trash } from "lucide-react";
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
import AddAdmin from "./add-account-components/AddAdmin";
import AddUser from "./add-account-components/AddUser";

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
  
  console.log(users);

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

  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Search + Bulk Actions */}
      <div className="flex items-center justify-between">
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
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:justify-between lg:flex-row gap-4">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />

            <div className="flex items-center gap-2">
              {selected.length > 0 && (
                <>
                  <Select onValueChange={setBulkRole} value={bulkRole}>
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
                  <IconButton variant="destructive" onClick={bulkDelete} disabled={selected.length === 0 || loading}>
                    <Trash />
                  </IconButton>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Account Records
          </CardTitle>
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
                            Reset Password
                          </DropdownMenuItem>}

                          {!u.email_verified_at && <DropdownMenuItem onClick={() => resendVerification(u.email)}>
                            Resend Verification
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
          <div className="flex justify-between gap-4 w-full mt-4">
            <span className="text-sm text-muted-foreground">{selected.length} of {users.length} row(s) selected.</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Prev
              </Button>
              <span className="px-4 text-sm flex items-center bg-background border h-full rounded">
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

