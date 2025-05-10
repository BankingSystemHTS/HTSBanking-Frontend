'use client'
import HeaderBox from '@/components/main/HeaderBox'
import React from 'react'
import { usePathname } from 'next/navigation'
import TotalBalanceBox from '@/components/main/TotalBalanceBox'

const Home = () => {
  const pathname = usePathname()
  // mock user
  const loggedIn = { name: "Nathan" }
  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome, "
            user={loggedIn?.name || "Guest"}
            subtext="Access and manage your account and 
            transactions efficiently."
          />
          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.14}
          />
        </header>
      </div>
    </section>
  )
}

export default Home
