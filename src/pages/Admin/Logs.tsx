import api from '@/api/axios';
import CustomTabs from '@/components/custom/CustomTabs';
import LogComponent from '@/components/custom/LogComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const Logs = () => {
  const [loading, setLoading] = React.useState(false);
  const [logs, setLogs] = React.useState(null);
  const [type, setType] = React.useState('all');
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);

  const tabs = [
    { value: "all", label: "All", disabled: loading, },
    { value: "auth", label: "Auth", disabled: loading, },
    { value: "member", label: "Member", disabled: loading, },
    { value: "account", label: "Account", disabled: loading, },
  ];

  const fetchLogs = async (pageNumber = 1, loading = true) => {
    setLoading(loading);
    setButtonLoading(true)
    try {
      const res = await api.get(`/api/logs`, {
        params: { type, page: pageNumber },
      });

      console.log(res);

      // append new logs instead of replacing
      if (pageNumber === 1) {
        setLogs(res.data.data);
      } else {
        setLogs((prev) => [...prev, ...res.data.data]);
      }

      setPage(res.data.current_page);
      setHasMore(res.data.current_page < res.data.last_page);
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  };

  // Fetch when page changes
  React.useEffect(() => {
    fetchLogs(1);
  }, [type]);

  const renderLogs = logs?.map((item) => {
    return (
      <LogComponent key={item.id} log={item} />
    )
  });

  return (
    <div className='space-y-6'>
        <div>
            <h2 className="text-2xl font-bold">Activity Logs</h2>
            <p className="text-muted-foreground">Manage all user activites</p>
        </div>

        <div className='w-fit'>
          <CustomTabs tabs={tabs} value={type} onChange={setType} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Logs
            </CardTitle>
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
