import api from '@/api/axios'
import AdminPageMain from '@/components/custom/AdminPageMain'
import CustomTabs from '@/components/custom/CustomTabs'
import PdfPreview from '@/components/custom/PdfPreview'
import RateCard from '@/components/RateCard'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Label } from '@/components/ui/label'
import { format } from 'date-fns'
import { Eye, MoreHorizontal, Plus, X } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Rates = () => {
  const [loading, setLoading] = React.useState(false);
  const [rates, setRates] = React.useState(null);
  const [years, setYears] = React.useState(null);
  const [year, setYear] = React.useState('all');
  const [tabs, setTabs] = React.useState([
    {value: "all", label: "All"},
  ]);
  const [buttonLoading, setButtonLoading] = React.useState(false);

  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  
  const fetchRates = async (pageNumber = 1, loading = true) => {
    setLoading(loading);
    setButtonLoading(true)
    try {
      const res = await api.get(`/api/monthly-rates`, {
        params: { year, page: pageNumber },
      });

      console.log(res);

      // append new logs instead of replacing
      if (pageNumber === 1) {
        setRates(res.data.data.data);
      } else {
        setRates((prev) => [...prev, ...res.data.data.data]);
      }

      const availableYears = res.data.years || [];

      setPage(res.data.data.current_page);
      setHasMore(res.data.data.current_page < res.data.data.last_page);
      setYears(res.data.years);

      setTabs([{value: "all", label: "All"}, ...availableYears]);
    } finally {
      setLoading(false);
      setButtonLoading(false);
    }
  };

  React.useEffect(() => {
    fetchRates();
  }, [year]);

  const renderRates = rates?.map((item) => {
    return (
      <RateCard item={item} />
    )
  });

  return (
    <AdminPageMain title='Monthly Rates' description='Manage consumer monthly rates.' topAction={
        <Button>
          <Link className='flex items-center gap-2' to={'add'}>
            <Plus /> Add Monthly Rates
          </Link>
        </Button>
    }>
        {tabs && <div className='w-fit'>
          <CustomTabs tabs={tabs} value={year} onChange={setYear} />
        </div>}

        <Card className='bg-background border-0'>
          <CardHeader className='px-0'>
            <CardTitle>
              Power Rates History
            </CardTitle>
          </CardHeader>
          <CardContent className='px-0'>
            <div className='flex flex-col gap-4'>
              {renderRates}
            </div>
          </CardContent>
        </Card>
    </AdminPageMain>
  )
}

export default Rates
