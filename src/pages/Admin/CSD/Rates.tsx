import AdminPageMain from '@/components/custom/AdminPageMain'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Rates = () => {
  return (
    <AdminPageMain title='Monthly Rates' description='Manage consumer monthly rates.' topAction={
        <Button>
          <Link className='flex items-center gap-2' to={'add'}>
            <Plus /> Add Monthly Rates
          </Link>
        </Button>
    }>
        3. Rates Table (History of Published Rates)

Components:

DataTable (shadcn table with sorting & search).

Columns:

Month & Year

Rate (₱/kWh)

Notes

Date Published

Actions (View, Edit, Delete)

👉 Admin can edit an existing month’s rate or delete outdated/incorrect entries.
    </AdminPageMain>
  )
}

export default Rates
