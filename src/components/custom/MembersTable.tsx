// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import api, { getCsrf } from "@/api/axios";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
// import { MoreVertical, Settings, User } from "lucide-react";

// interface Member {
//   id: number;
//   account_number: string;
//   book: string;
//   name: string;
//   address: string;
//   status: string;
// }

// export default function MembersTable() {
//   const [members, setMembers] = useState<Member[]>([]);
//   const [page, setPage] = useState(1);
//   const [perPage] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [selected, setSelected] = useState<number[]>([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const fetchMembers = async () => {
//     setLoading(true);
//     const res = await api.get(`/api/members`, {
//       params: { page, per_page: perPage, search },
//     });
//     setMembers(res.data.data);
//     setTotalPages(res.data.last_page);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchMembers();
//   }, [page]);

//   const toggleSelect = (id: number) => {
//     setSelected((prev) =>
//       prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
//     );
//   };

//   const selectAll = () => {
//     if (selected.length === members.length) {
//       setSelected([]);
//     } else {
//       setSelected(members.map((m) => m.id));
//     }
//   };

//   const bulkDelete = async () => {
//     if (!selected.length) return;
//     await getCsrf();
//     await api.delete("/api/members", { data: { ids: selected } });
//     setSelected([]);
//     fetchMembers();
//   };

//   return (
//     <div className="space-y-4">
//       {/* Search + Actions */}
//       <div className="flex gap-2">
//         <Input
//           placeholder="Search members..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="max-w-xs"
//         />
//         <Button onClick={() => { setPage(1); fetchMembers(); }}>Search</Button>
//         {selected.length > 0 && (
//           <Button variant="destructive" onClick={bulkDelete}>
//             Delete Selected ({selected.length})
//           </Button>
//         )}
//       </div>

//       {/* Table */}
//       <div className="border rounded-md">
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="w-[50px]">
//                 <Checkbox
//                   checked={selected.length === members.length && members.length > 0}
//                   onCheckedChange={selectAll}
//                 />
//               </TableHead>
//               <TableHead>Account Number</TableHead>
//               <TableHead>Book</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Address</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {loading ? (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center">
//                   Loading...
//                 </TableCell>
//               </TableRow>
//             ) : members.length > 0 ? (
//               members.map((m) => (
//                 <TableRow key={m.id}>
//                   <TableCell>
//                     <Checkbox
//                       checked={selected.includes(m.id)}
//                       onCheckedChange={() => toggleSelect(m.id)}
//                     />
//                   </TableCell>
//                   <TableCell>{m.account_number}</TableCell>
//                   <TableCell>{m.book}</TableCell>
//                   <TableCell>{m.name}</TableCell>
//                   <TableCell>{m.address}</TableCell>
//                   <TableCell>{m.status}</TableCell>
//                   <TableCell>
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
//                         </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : !loading && (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center">
//                   No members found.
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
import { MoreVertical, Trash } from "lucide-react";

interface Member {
  id: number;
  account_number: string;
  book: string;
  name: string;
  address: string;
  status: string;
}

export default function MembersTable() {
  const [members, setMembers] = useState<Member[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<number[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // For debounce
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  const fetchMembers = async (searchQuery = debouncedSearch) => {
    setLoading(true);
    const res = await api.get(`/api/members`, {
      params: { page, per_page: perPage, search: searchQuery },
    });
    setMembers(res.data.data);
    setTotalPages(res.data.last_page);
    setLoading(false);
  };

  // Fetch when page changes
  useEffect(() => {
    fetchMembers();
  }, [page, debouncedSearch]);

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
    <div className="space-y-4">
      {/* Search + Actions */}
      <div className="flex flex-col lg:justify-between lg:flex-row gap-2">
        <Input
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        {selected.length > 0 && <Button className="w-fit" variant="destructive" onClick={bulkDelete} disabled={selected.length === 0}>
          <Trash /> ({selected.length})
        </Button>}
      </div>

      {/* Table */}
      <div className="border rounded-md">
        <Table className="bg-card">
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
                  <TableCell>{m.status}</TableCell>
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
