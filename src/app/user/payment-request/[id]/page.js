import React from 'react'
import BuyersProtection from '../buyers-protection'
import ShippinTo from '../shipping'
import PayOptions from '../pay-options'
import { use_get } from '../../../../lib/functions'
import { calculate_total, numberWithCommas } from '../../../../lib/functions/util'
import Image from 'next/image'

async function fetchAuction(slug) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?where[slug][equals]=${slug}`, options: { cache: 'force-cache' } })
    return res?.docs[0]
}

async function getAuctionBid(id) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bids/${id}?depth=2`, options: { cache: 'force-cache' } })
    return res
}

const PaymentRequest = async ({ params }) => {
    const par = await params
    const auction = await fetchAuction(par.id)
    const bid = await getAuctionBid(auction.id)

    if (!auction || !bid) return null

    const top_bidder = bid?.top_biddder

    const payment_data = top_bidder ? {
        totalAmount: calculate_total(bid.current_bid) * 100, // add Shipping, VAT and other costs
        currency: 'EUR',
        customer: {
            email: top_bidder.email
        },
        order:{
            user: top_bidder.id,
            auction: auction.id,
            winning_bid: top_bidder,
            payment_option: 'revolut_pay' ,
        }
    } : {
        totalAmount: calculate_total(bid.current_bid) * 100, // add Shipping, VAT and other costs
        currency: 'EUR',
    }

    return (
        <div className='w-full px-2 lg:px-0 py-8'>
            <section className='my-8 w-full'>
                <h4 className='font-bold text-2xl text-nowrap my-4'>Checkout</h4>
            </section>
            <section className='w-full flex flex-col space-y-8 divide-y-2 divide-bright/10'>
                <section className='w-full flex items-start space-x-4 py-8'>
                    <div className='w-[25%] aspect-square bg-third'>
                        <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${auction.image[0].url}`} alt={auction.image[0].alt} className='aspect-square w-full object-cover' height={auction.image[0].height} width={auction.image[0].width} />
                    </div>
                    <div className='flex-1 space-y-2'>
                        <h4 className='font-medium text-lg lg:text-2xl'>{auction.title}</h4>
                        <h6 className='flex flex-col text-xs spa uppercase py-2'>
                            <p className={` font-light text-xl text-third`}> CLOSING PRICE </p>
                            <p className='text-xl font-semibold'>€ {numberWithCommas(bid.current_bid)}</p>
                        </h6>
                    </div>
                </section>
                <BuyersProtection />
                <ShippinTo />
                <PayOptions data={payment_data} />
                {/* <Payment /> */}
            </section>

        </div >
    )
}

export default PaymentRequest