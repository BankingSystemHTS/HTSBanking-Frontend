import { formatAmount } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const BankCard = ({ account, userName, showBalance=true }: CreditCardProps ) => {
  return (
    <div className="flex flex-col">
        <Link href="/" className="bank-card">
           {/* Card Content*/}
           <div className="bank-card_content">
              <div>
                 <h1 className="text-16 font-semibold text-white">
                    {account.name || userName}
                 </h1>
                 <p className="font-ibm-plex-serif font-black text-white">
                    {formatAmount(account.currentBalance)}
                 </p>
              </div>

              <article className="flex flex-col gap-2">
                 <div className="flex justify-between">
                    <h1 className="text-12 font-semibold text-white">
                       {userName}
                    </h1>
                    <h2 className="text-12 font-semibold text-white">
                       ●● / ●●
                    </h2>
                 </div>
                  <p className="text-12 font-semibold tracking=[1.1px] text-white">
                    ●●●● ●●●● ●●●● <span className="text-16">{1234}</span>
                  </p>
              </article>
           </div>
           {/* Card Icons and Background Image */}
           <div className="bank-card_icon">
              <Image
                 src="/icons/Paypass.svg"
                 width="20"
                 height="20"
                 alt="pay icon"
              />
              <Image
                 src="/icons/mastercard.svg"
                 width="45"
                 height="32"
                 alt="mastercard icon"
                 className="ml-10"
              />
           </div>

           <Image
              src="/icons/lines.png"
              width="316"
              height="190"
              alt="lines background"
              className="absolute top-0 left-0"
            />
        </Link>


    </div>
  )
}

export default BankCard
