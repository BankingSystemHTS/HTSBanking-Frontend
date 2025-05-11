import React from 'react'
import CountUp from 'react-countup'
import { formatAmount } from '@/lib/utils'

const AnimatedCounter = ({ amount }: { amount: number }) => {
  return (
    <div>
      <CountUp
        end={amount}
        duration={2}
        prefix="$  "
        className="text-xl font-semibold font-medium"
        decimal=","
        decimals={2}
      />
    </div>
  )
}

export default AnimatedCounter
