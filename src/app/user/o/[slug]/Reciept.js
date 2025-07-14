'use client'
import { useState } from "react"
import { LoaderBlockAnimation } from "../../../../components/util/checker"
import { auction_fees, calculate_total, calculate_vat, getAuctionFees, numberWithCommas } from "../../../../lib/functions/util"
import { useAuth } from "../../../../contexts/auth"
import Link from 'next/link'


const Reciept = ({ auction }) => {

    const auth = useAuth()
    const user = auth?.user?.user ?? null

    return (
        <div className='w-full bg-foreground-600 border border-foreground-200/10 flex flex-col items-center py-8 space-y-2 shadow-2xl'>
            <p className='text-3xl font-bold text-center'>&#127881;</p>
            <p className='text-lg font-medium text-secondary text-center'>Thank you for your order!</p>
            <div className='flex items-center space-x-1 text-xs justify-center'>
                <p className='text-secondary text-center'>We emailed your recipet to </p>
                <p className='text-secondary text-center font-bold'>{user?.email }</p>
            </div>
            <div className='relative w-[95%] text-sm lg:w-[70%] my-8 overflow-hidden'>
                <RecieptBlock amount={auction.bid_id.current_bid} />
            </div>
            <Link href={`/`} replace className='underline'>Explore new auctions</Link>
        </div>

    )
}

export default Reciept

const RecieptBlock = ({ amount }) => {

    const [seeBreakdown, setSeeBreakDown] = useState(false)
    const [loading, setLoading] = useState(false)

    const allFees = getAuctionFees(amount) ?? 0
    const auctn_fee = auction_fees(amount) ?? 0
    const VAT = calculate_vat(amount) ?? 0
    const total = calculate_total(amount) ?? 0


    return (
        <div className='relative bg-background w-full  border border-foreground/10'>
            <div className={`relative flex flex-col ${seeBreakdown && 'h-[40vh]'}  w-full py-4 text-sm px-8 divide-y divide-dashed divide-secondary/10  font-light`}>
                <div className='flex items-center justify-between py-4'>
                    <p>Bid Amount</p>
                    <p>€ {numberWithCommas(allFees.bid_amount)}</p>
                </div>
                <div className='flex items-center justify-between py-4'>
                    <p>Auction Fees</p>
                    <p>€ {numberWithCommas(auctn_fee.toFixed(2))}</p>
                </div>
                <div className='flex items-center justify-between py-4'>
                    <div className='flex items-center space-x-4'><p>VAT</p> </div>
                    <p>€ {numberWithCommas(VAT.toFixed(2))} </p>
                </div>
                {/* <p onClick={() => null} className='cursor-pointer border-none py-4 hover:underline hover:font-semibold text-xs'>(see fees)</p> */}
                <div className='flex items-center text-base font-medium justify-between py-4'>
                    <p>Total Price</p>
                    <p>€ {numberWithCommas(total.toFixed(2))}</p>
                </div>

                {/* {seeBreakdown && <VatBreakDown amount={amount} close={setSeeBreakDown} />} */}

            </div>
            {
                !amount &&
                <div className=' absolute z-50 top-0 left-0 w-full h-full bg-transparent flex items-center justify-center'>
                    <LoaderBlockAnimation width={50} height={50} />
                </div>
            }
        </div>
    )
}