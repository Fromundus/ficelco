import Dashboard from '@/components/Dashboard'
import { userNavigations } from '@/data/navigations'
import React from 'react'

const UserLayout = () => {
  return (
    <div>
      <Dashboard navItems={userNavigations} />
    </div>
  )
}

export default UserLayout
