import api from '@/api/axios';
import CustomTabs from '@/components/custom/CustomTabs';
import LogComponent from '@/components/custom/LogComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Logs = () => {
  const [loading, setLoading] = React.useState(false);
  const [logs, setLogs] = React.useState(null);
  const [types, setTypes] = React.useState(null);
  const [actions, setActions] = React.useState(null);
  const [type, setType] = React.useState('all');
  const [action, setAction] = React.useState('all');
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search); // new

  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const fetchLogs = async (pageNumber = 1, loading = true) => {
    setLoading(loading);
    setButtonLoading(true)
    try {
      const res = await api.get(`/api/logs`, {
        params: { 
          search,
          action,
          type, 
          page: pageNumber, 
        },
      });

      console.log(res);

      // append new logs instead of replacing
      if (pageNumber === 1) {
        setLogs(res.data.data.data);
      } else {
        setLogs((prev) => [...prev, ...res.data.data.data]);
      }

      setPage(res.data.data.current_page);
      setHasMore(res.data.data.current_page < res.data.data.last_page);

      setTypes(res.data.types);
      setActions(res.data.actions);
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  };

  // Fetch when page changes
  React.useEffect(() => {
    fetchLogs(1);
  }, [type, action, debouncedSearch]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 1000); // 1 second debounce

    return () => clearTimeout(handler);
  }, [search]);

  const renderLogs = logs?.map((item) => {
    return (
      <LogComponent key={item.id} log={item} />
    )
  });

  return (
    <div className='space-y-6'>
        <div>
            <h2 className="text-2xl font-bold">Activity Logs</h2>
            <p className="text-muted-foreground">Monitor system activities and user actions</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col w-full lg:justify-between lg:flex-row gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10"
                />
              </div>

              <Select value={type} onValueChange={setType} disabled={loading}>
                <SelectTrigger className="w-[150px] capitalize">
                  <SelectValue placeholder="Filter by Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {types?.map((item, index) => {
                    return (
                      <SelectItem key={index} className='capitalize' value={item}>{item}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <Select value={action} onValueChange={setAction} disabled={loading}>
                <SelectTrigger className="w-[150px] capitalize">
                  <SelectValue placeholder="Filter by Action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {actions?.map((item, index) => {
                    return (
                      <SelectItem key={index} className='capitalize' value={item}>{item}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              Recent Activity Log
            </CardTitle>
            <CardDescription>
              Chronological record of system activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              {loading && 
                <div className='w-full flex justify-center'>
                  Loading...
                </div>
              }
              {!loading && logs?.length > 0 ? 
                renderLogs 
                : !loading &&
                <div className='w-full flex justify-center'>
                  No logs found.
                </div>
              }
            </div>
            {!loading && logs?.length > 0 && hasMore && 
            <div className='w-full flex justify-center mt-4'>
              <Button variant='outline' onClick={() => fetchLogs(page + 1, false)} disabled={buttonLoading}>
                {buttonLoading ? "Loading..." : "See More"}
              </Button>
            </div>}
          </CardContent>
        </Card>
    </div>
  )
}

export default Logs
