import { ChevronRightIcon, CreditCardIcon, TruckIcon } from '@heroicons/react/24/outline'
import { LockClosedIcon, MagnifyingGlassPlusIcon } from '@heroicons/react/24/solid'
import React from 'react'

const BuyersProtection = () => {
    return (
        <section className='w-full flex flex-col lg:flex-row items-start space-x-4 py-8'>
            <div className='w-full lg:w-[25%] pb-4 lg:pb-0'>
                <h4 className='text-2xl font-medium'>Auctioners Buyers Protection</h4>
            </div>
            <div className='max-w-2xl space-y-4'>
                <div className='flex-1 space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <span className='relative'>
                            <CreditCardIcon className='w-7 h-7' />
                            <LockClosedIcon className='absolute w-4 h-4 bottom-0 -right-1' />
                        </span>
                        <p className='font-semibold text-lg'>Your payment is safe</p>
                    </div>
                    <p className='text-sm'>
                        We ensure your money is kept safe. We only release payment to the seller up to 3 days after delivery so that you have had the time to inspect your object.
                    </p>
                </div>
                <div className='flex items-center space-x-2'>
                    <span className='relative'>
                        <MagnifyingGlassPlusIcon className='w-5 h-5' />
                    </span>
                    <p className=''>All items are inspected by in-house team members.</p>
                </div>
                <div className='flex items-center space-x-2'>
                    <span className='relative'>
                        <TruckIcon className='w-5 h-5' />
                    </span>
                    <p className=''>Items are shipped or delivered from our warehouse, by us.</p>
                </div>
                <div className='flex items-center space-x-2 text-bright-400'>
                    <p>Learn more</p>
                    <ChevronRightIcon className='w-4 h-4' />
                </div>
            </div>
        </section>
    )
}

export default BuyersProtection