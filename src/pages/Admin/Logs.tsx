import api from '@/api/axios';
import CustomTabs from '@/components/custom/CustomTabs';
import LogComponent from '@/components/custom/LogComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react'

const Logs = () => {
  const [loading, setLoading] = React.useState(false);
  const [logs, setLogs] = React.useState(null);
  const [type, setType] = React.useState('all');

  const tabs = [
    { value: "all", label: "All", disabled: loading, },
    { value: "auth", label: "Auth", disabled: loading, },
    { value: "account", label: "Account", disabled: loading, },
  ];

  const fetchLogs = async () => {
    setLoading(true);
    const res = await api.get(`/api/logs`, {
      params: { 
        type: type,
      },
    });
    console.log(res);
    setLogs(res.data.data);
    setLoading(false);
  };

  // Fetch when page changes
  React.useEffect(() => {
    fetchLogs();
  }, [type]);

  const renderLogs = logs?.map((item) => {
    return (
      <LogComponent key={item.id} log={item} />
    )
  })

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
              {renderLogs}
            </div>
          </CardContent>
        </Card>
    </div>
  )
}

export default Logs
