import api from '@/api/axios'
import AdminPageMain from '@/components/custom/AdminPageMain'
import CustomTabs from '@/components/custom/CustomTabs'
import PdfPreview from '@/components/custom/PdfPreview'
import RateCard from '@/components/RateCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { PowerRate } from '@/types/PowerRate'
import { format } from 'date-fns'
import { Eye, MoreHorizontal, Plus, Search, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from '@/components/ui/input'

const Rates = () => {
  const [loading, setLoading] = React.useState(false);
  const [rates, setRates] = React.useState<PowerRate[]>(null);
  const [years, setYears] = React.useState(null);
  const [months, setMonths] = React.useState(null);

  const [year, setYear] = React.useState('all');
  const [month, setMonth] = React.useState('all');
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search); // new


  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  
  const fetchRates = async (pageNumber = 1) => {
    setLoading(true);
    setButtonLoading(true)
    try {
      const res = await api.get(`/api/monthly-rates`, {
        params: { search, year, month, page: pageNumber },
      });

      console.log(res);

      // append new logs instead of replacing
      if (pageNumber === 1) {
        setRates(res.data.data.data);
      } else {
        setRates((prev) => [...prev, ...res.data.data.data]);
      }

      setPage(res.data.data.current_page);
      setHasMore(res.data.data.current_page < res.data.data.last_page);
      setYears(res.data.years);
      setMonths(res.data.months);
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRates();
  }, [year, month, debouncedSearch]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 1000); // 1 second debounce

    return () => clearTimeout(handler);
  }, [search]);

  const renderRates = rates?.map((item) => {
    return (
      <RateCard key={item.id} item={item} refetch={fetchRates} />
    )
  });

  return (
    <AdminPageMain title='Monthly Rates Management' description='Configure and update electricity rates for different customer types' topAction={
        <Button>
          <Link className='flex items-center gap-2' to={'add'}>
            <Plus /> Add Monthly Rates
          </Link>
        </Button>
    }>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col w-full lg:justify-between lg:flex-row gap-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search rates..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10"
                />
              </div>

              <Select value={year} onValueChange={setYear} disabled={loading}>
                <SelectTrigger className="w-[150px] capitalize">
                  <SelectValue placeholder="Filter by Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {years?.map((item, index) => {
                    return (
                      <SelectItem key={index} className='capitalize' value={item}>{item}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>

              <Select value={month} onValueChange={setMonth} disabled={loading}>
                <SelectTrigger className="w-[150px] capitalize">
                  <SelectValue placeholder="Filter by Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {months?.map((item, index) => {
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
              Power Rates History
            </CardTitle>
            <CardDescription>
              Historical electricity rates and adjustments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4 items-center'>
              {loading ? 
                <span>Loading...</span>
                : rates?.length > 0 ? 
                renderRates
                :
                <span>No rates found.</span>
                
              }
              {/* {renderRates} */}
            </div>
          </CardContent>
        </Card>
    </AdminPageMain>
  )
}

export default Rates
