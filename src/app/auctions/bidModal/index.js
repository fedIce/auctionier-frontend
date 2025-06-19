'use client'
import { XMarkIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { CheckerAnimation, LoaderBlockAnimation } from '../../../components/util/checker'
import { numberWithCommas } from '../../../lib/functions/util'

const BidModal = ({ open, setOpen, amount: a, action = () => null }) => {

    const [amount, setAmount] = useState(a)
    const [loading, setLoading] = useState(true)
    const [done, setDone] = useState(false)

    useEffect(() => {
        let timeout = null
        if (a !== '') setAmount(a)

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
        action().then(() => {
            setTimeout(() => {
                setLoading(false)
                setDone(true)
            }, 1000)
        })
    }


    if (!open) return null

    return (
        <div className='fixed z-50 left-0 top-0 w-screen h-screen bg-background/70 flex items-end lg:items-start lg:pt-[25vh] justify-center'>
            {done ?
                <DoneBidding action={setOpen} />
                : <div className='max-w-xl relative bg-background w-full  border border-third/10'>
                    <div className='flex items-center justify-between p-4 border-b border-bright/10 '>
                        <div>
                            <h4>Place your Bid</h4>
                            <p className='text-[10px] text-bright-300'>Please make sure you check all the details below prior to confirming your bid.</p>
                        </div>
                        <span onClick={() => setOpen(false)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
                    </div>
                    <div className=' flex flex-col  w-full py-4 text-sm px-8 divide-y divide-dashed divide-bright/10  font-light'>
                        <div className='flex items-center justify-between py-4'>
                            <p>Bid Amount</p>
                            <p>€ {numberWithCommas(amount) ?? 0}</p>
                        </div>
                        <div className='flex items-center justify-between py-4'>
                            <p>Auction Fees</p>
                            <p>€ {numberWithCommas((parseFloat(amount) * 0.2).toFixed(2))}</p>
                        </div>
                        <div className='flex items-center justify-between py-4'>
                            <p>VAT</p>
                            <p>€ {numberWithCommas((parseFloat(amount) * 0.2).toFixed(2))}</p>
                        </div>
                        <div className='flex items-center text-base font-medium justify-between py-4'>
                            <p>Total Price</p>
                            <p>€ {numberWithCommas((parseFloat(amount) * 1.4  ).toFixed(2))}</p>
                        </div>
                    </div>
                    <div className='px-4 py-2.5 text-xs'>
                        All bids are binding; if your bid is highest you agree to pay for this object. By bidding, you agree to our Terms of Use.
                    </div>
                    <div onClick={() => handleAction()} className='flex items-center mt-4 justify-between'>
                        <div className='flex-1 bg-bright text-background text-center py-4 cursor-pointer'>Place Bid</div>
                        {/* <div className='flex-1  text-bright-300 py-4 bg-background-900 text-center cursor-pointer'>Cancel</div> */}
                    </div>
                    {
                        loading &&
                        <div className=' absolute z-50 top-0 left-0 w-full h-full bg-background/70 flex items-center justify-center'>
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
        <div className='w-full h-auto flex flex-col items-center max-w-xl bg-background  border border-third/10'>
            <div className='py-4 text-2xl font-medium'>Bid Submitted</div>
            <div className='py-4 text-sm font-light'>Well done!, we'll keep you posted, goodluck!</div>
            <CheckerAnimation width={150} height={150} />
            <div onClick={() => action(false)} className='flex w-full items-center mt-4 justify-between'>
                <div className='flex-1 bg-bright text-background text-center py-4 cursor-pointer'>OK</div>
            </div>
        </div>
    )
}