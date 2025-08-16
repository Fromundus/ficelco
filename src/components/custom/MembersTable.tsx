import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import api, { getCsrf } from "@/api/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { MoreVertical, Search, Trash, User, UserCheck, UserX } from "lucide-react";
import { Badge } from "../ui/badge";
import IconButton from "./IconButton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Member from "@/types/Member";

export default function MembersTable() {
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [selectedStatus, setSelectedStatus] = useState("all");

  const [fetchTotal, setFetchTotal] = useState();

  const [counts, setCounts] = useState({
    total: 0,
    registered: 0,
    notregistered: 0,
  });

  // For debounce
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const fetchMembers = async (searchQuery = debouncedSearch) => {
    setLoading(true);
    const res = await api.get(`/api/members`, {
      params: { 
        page, 
        per_page: perPage, 
        search: searchQuery,
        status: selectedStatus,
      },
    });
    setMembers(res.data.members.data);
    setTotalPages(res.data.members.last_page);
    setFetchTotal(res.data.members.total);
    setCounts(res.data.counts);
    setLoading(false);
  };

  // Fetch when page changes
  useEffect(() => {
    fetchMembers();
  }, [page, debouncedSearch, selectedStatus]);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // reset to first page when searching
    }, 1000); // 300ms delay

    return () => clearTimeout(handler);
  }, [search]);

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selected.length === members.length) {
      setSelected([]);
    } else {
      setSelected(members.map((m) => m.id));
    }
  };

  const bulkDelete = async () => {
    if (!selected.length) return;
    await getCsrf();
    await api.delete("/api/members", { data: { ids: selected } });
    setSelected([]);
    fetchMembers();
  };

  return (
    <div className="space-y-6">
      {/* Search + Actions */}
      <div>
        <h2 className="text-2xl font-bold">Member Management</h2>
        <p className="text-muted-foreground">Manage member information and records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">{counts.total}</p>
              </div>
              <User className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Registered</p>
                <p className="text-2xl font-bold">{counts.registered}</p>
              </div>
              <UserCheck className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Not Registered</p>
                <p className="text-2xl font-bold">{counts.notregistered}</p>
              </div>
              <UserX className="h-8 w-8 text-destructive" />
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
                placeholder="Search members..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="registered">Registered</SelectItem>
                <SelectItem value="notregistered">Not Registered</SelectItem>
              </SelectContent>
            </Select>

            {selected.length > 0 && <IconButton variant="destructive" onClick={bulkDelete} disabled={selected.length === 0 || loading}>
              <Trash />
            </IconButton>}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Member Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selected.length === members.length && members.length > 0}
                    onCheckedChange={selectAll}
                  />
                </TableHead>
                <TableHead>Account Number</TableHead>
                <TableHead>Book</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
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
              ) : members.length > 0 ? (
                members.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <Checkbox
                        checked={selected.includes(m.id)}
                        onCheckedChange={() => toggleSelect(m.id)}
                      />
                    </TableCell>
                    <TableCell>{m.account_number}</TableCell>
                    <TableCell>{m.book}</TableCell>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.address}</TableCell>
                    <TableCell>{m.status ?
                      <Badge className="bg-green-500 text-white hover:bg-green-600">
                        Registered
                      </Badge>
                      :
                      <Badge className="text-nowrap" variant="destructive">
                        Not Registered
                      </Badge>
                    }</TableCell>
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
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    No members found.
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
