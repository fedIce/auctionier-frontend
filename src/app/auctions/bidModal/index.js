'use client'
import * as Icons from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { CheckerAnimation, LoaderBlockAnimation } from '../../../components/util/checker'
import { auction_fees, calculate_total, calculate_vat, getAuctionFees, numberWithCommas } from '../../../lib/functions/util'

const BidModal = ({ open, setOpen, amount: a, action = () => null }) => {

    const [amount, setAmount] = useState(a)
    const [loading, setLoading] = useState(true)
    const [done, setDone] = useState(false)
    const [seeBreakdown, setSeeBreakDown] = useState(false)

    // const GenerateIcons = () => {
    //     let v = []
    //     Object.keys(Icons).forEach((key) => {
    //         v.push({
    //             label: key.replace('Icon', '').replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase(),
    //             value: key
    //         })
    //     })
    //     return v
    // }

    // useEffect(() => {
    // console.log(GenerateIcons())
    // }, [])

    useEffect(() => {
        let timeout = null
        if (a !== '') setAmount(parseFloat(a))

        if (open == false) {
            setLoading(true)
            setDone(false)
        } else {

            timeout = setTimeout(() => { setLoading(false) }, 1000)
        }

        return () => clearTimeout(timeout)
    }, [a, open])

    useEffect(() => { }, [amount, a, open])

    const handleAction = async () => {
        setLoading(true)
        action().then((e) => {
            console.log(e)
            if (e != null) {
                setTimeout(() => {
                    setDone(true)
                }, 1000)
                return null
            }
            setOpen(false)
        }).catch(e => console.log('OOPES', e))
            .finally(() => setLoading(false))
    }

    // const allFees = getAuctionFees(amount)

    const _auction_fees = auction_fees(amount).toFixed(2)
    const total = calculate_total(amount)
    const VAT = calculate_vat(amount).toFixed(2)

    if (!open) return null

    const XIcon = Icons["XMarkIcon"]

    return (
        <div className='fixed z-50 left-0 top-0 w-screen h-screen bg-background/70 text-foreground flex px-2 items-start pt-[25vh] justify-center'>
            {done ?
                <DoneBidding action={setOpen} />
                : <div className='max-w-xl relative bg-background w-full  border border-foreground/10'>
                    <div className='flex items-center justify-between p-4 border-b border-foreground/10 '>
                        <div>
                            <h4>Place your Bid</h4>
                            <p className='text-[10px] text-bright'>Please make sure you check all the details below prior to confirming your bid.</p>
                        </div>
                        <span onClick={() => setOpen(false)} className='cursor-pointer'><XIcon className='w-7 h-7 text-secondary' /></span>
                    </div>
                    <div className={`relative flex flex-col ${seeBreakdown && 'h-[40vh]'}  w-full py-4 text-sm px-8 divide-y divide-dashed divide-bright/10  font-light`}>
                        <div className='flex items-center justify-between py-4'>
                            <p>Bid Amount</p>
                            <p>€ {numberWithCommas(amount) ?? 0}</p>
                        </div>
                        <div className='flex items-center justify-between py-4'>
                            <p>Auction Fees</p>
                            <p>€ {numberWithCommas(_auction_fees)}</p>
                        </div>
                        <div className='flex items-center justify-between py-4'>
                            <div className='flex items-center space-x-4'><p>VAT</p> </div>
                            <p>€ {numberWithCommas(VAT)}</p>
                        </div>
                        <p onClick={() => setSeeBreakDown(!seeBreakdown)} className='cursor-pointer border-none py-4 hover:underline hover:font-semibold text-xs'>(see fees)</p>
                        <div className='flex items-center text-base font-medium justify-between py-4'>
                            <p>Total Price</p>
                            <p>€ {numberWithCommas(parseFloat(total).toFixed(2))}</p>
                        </div>

                        {seeBreakdown && <VatBreakDown amount={amount} close={setSeeBreakDown} />}

                    </div>
                    <div className='px-8 py-2.5 text-[10px]'>
                        All bids are binding; if your bid is highest you agree to pay for this object. By bidding, you agree to our Terms of Use.
                    </div>
                    <div onClick={() => handleAction()} className='flex items-center mt-4 justify-between'>
                        <div className='flex-1 bg-secondary text-background text-center py-4 cursor-pointer'>Place Bid</div>
                        {/* <div className='flex-1  text-bright-300 py-4 bg-background-900 text-center cursor-pointer'>Cancel</div> */}
                    </div>
                    {
                        loading &&
                        <div className=' absolute z-50 top-0 left-0 w-full h-full bg-transparent flex items-center justify-center'>
                            <LoaderBlockAnimation width={50} height={50} />
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default BidModal

const DoneBidding = ({ action }) => {
    return (
        <div className='w-full h-auto flex flex-col items-center max-w-xl bg-background  border border-foreground/10'>
            <div className='py-4 text-2xl font-medium'>Bid Submitted</div>
            <div className='py-4 text-sm font-light'>Well done!, we&apos;ll keep you posted, goodluck!</div>
            <CheckerAnimation width={150} height={150} />
            <div onClick={() => action(false)} className='flex w-full items-center mt-4 justify-between'>
                <div className='flex-1 bg-secondary text-background text-center py-4 cursor-pointer'>OK</div>
            </div>
        </div>
    )
}


export const VatBreakDown = ({ amount, close }) => {

    const values = getAuctionFees(amount)
    return (
        <div className='absolute bg-background h-full top-0 left-0 flex flex-col  w-full py-1 text-sm px-8 divide-y divide-dashed divide-bright/10  font-light'>
            <div className='grid grid-cols-[1fr_120px_120px] py-4 items-center text-end'>
                <p className='text-start'>Cost</p>
                <h4>Value</h4>
                <h4>VAT</h4>
            </div>
            <div className='grid grid-cols-[1fr_120px_120px] py-4 items-center text-end'>
                <p className='text-start'>Bid Amount</p>
                <h4>€ {numberWithCommas(values.bid_amount)}</h4>
                <h4>€ {numberWithCommas(values.bid_amount_VAT)}</h4>
            </div>
            {/* <div className='grid grid-cols-[1fr_120px_120px] py-4 items-center text-end'>
                <p className='text-start'>Internet Fee</p>
                <h4>€ {numberWithCommas(values.internet_fee)}</h4>
                <h4>€ {numberWithCommas(values.internet_fee_VAT)}</h4>
            </div> */}
            <div className='grid grid-cols-[1fr_120px_120px] py-4 items-center text-end'>
                <p className='text-start'>Buyers Premium</p>
                <h4>€ {numberWithCommas(values.buyer_premium)}</h4>
                <h4>€ {numberWithCommas(values.buyer_premium_VAT)}</h4>
            </div>
            <div className='grid grid-cols-[1fr_120px_120px] py-4 items-center text-end'>
                <p className='text-start'>Lotting Fee</p>
                <h4>€ {numberWithCommas(values.lotting_fee)}</h4>
                <h4>€ {numberWithCommas(values.lotting_fee_VAT)}</h4>
            </div>

            <div className='border-none py-2 text-xs cursor-pointer hover:underline hover:font-semibold' onClick={() => close(false)}>(Hide Fees)</div>

            <div className='flex items-center text-base font-medium justify-between py-4'>
                <p>Total Price</p>
                <p>€ {numberWithCommas(parseFloat(calculate_total(amount)).toFixed(2))}</p>
            </div>
        </div>
    )
}