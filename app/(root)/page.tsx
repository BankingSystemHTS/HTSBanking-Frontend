import HeaderBox from '@/components/main/HeaderBox'
import React from 'react'
import { usePathname } from 'next/navigation'
import TotalBalanceBox from '@/components/main/TotalBalanceBox'
import RightSidebar from '@/components/sidebar/RightSidebar'
import { getLoggedInUser } from '@/lib/actions/user.actions'

const Home = async () => {

  const loggedIn = await getLoggedInUser();
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
        Recent Transaction
      </div>

      {/* Right sidebar belongs to home page only*/}
      <RightSidebar
        user={loggedIn}
        transactions={[]}
        banks={[{ currentBalance: 145 }, {currentBalance: 200}]}
      />
      
    </section>
  )
}

export default Home
