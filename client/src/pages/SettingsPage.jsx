import React from 'react'
import Settings from '../components/Settings'
import Sidebar from '../components/Sidebar'

export default function SettingsPage() {
  return (
    <div className='flex flex-col max-w-screen-xl m-auto px-4 gap-10 md:flex-row lg:flex-row'>
      <Settings />
      <Sidebar />
    </div>
  )
}
