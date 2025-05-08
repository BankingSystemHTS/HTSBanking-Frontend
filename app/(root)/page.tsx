'use client'
import HeaderBox from '@/components/main/HeaderBox'
import React from 'react'
import { usePathname } from 'next/navigation'

const Home = () => {
  const pathname = usePathname()
  // mock user
  const loggedIn = { name: "Nathan"} 
  return (
    <section className="home">
      <div className="home-content">
        <HeaderBox
          type="greeting"
          title="Welcome, "
          user={loggedIn?.name || "Guest"}
          subtext="Access and manage your account and transactions efficiently."
        />
      </div>
    </section>
  )
}

export default Home
