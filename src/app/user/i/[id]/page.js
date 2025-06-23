import React from 'react'
import FilterBlock from '../../../../lib/FilterBlock'
import ListingCards from '../../../../components/ListingCardsSection/ListingCards'
import Pagination from '../../../../lib/Pagination'
import ListingCardsSection from '../../../../components/ListingCardsSection'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import Image from 'next/image'
import { DetailsSection } from '../../../auctions/Details'
import { use_get } from '../../../../lib/functions'
import { auction_fees, calculate_total, calculate_vat, generate_crumbs, numberWithCommas } from '../../../../lib/functions/util'
import { ShowAuctionDetails } from '../../../auctions/ActionArea'
import { data } from 'autoprefixer'
import CountdownTimer from '../../../../components/Counter'
import Link from 'next/link'

async function fetchAuction(slug) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?where[slug][equals]=${slug}`})
    return res?.docs[0]
}

export default async function ViewPayables({ params }) {
    const auction = await fetchAuction(params?.id)

    if (!auction) return null

    console.log(auction)

    const crumbs = generate_crumbs(auction.sub_category)



    return (
        <div className='w-full py-8 px-2'>
            <section>
                <BreadCrumbs crumbs={crumbs} />
            </section>

            <div className='w-full mt-8 mb-4 space-y-4 lg:space-y-0 lg:space-x-4 flex flex-col lg:flex-row items-start'>
                <section className='w-full lg:w-[60%] space-y-4 flex flex-col items-start '>
                    <section className='w-full space-x-4 flex flex-col lg:flex-row items-start '>
                        <div className='w-full lg:w-[40%] aspect-square bg-third' >
                            <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${auction.image[0].url}`} alt={auction.image[0].alt} className='aspect-square w-full object-cover' height={auction.image[0].height} width={auction.image[0].width} />
                        </div>
                        <div className='flex-1'>
                            <h4 className='text-lg py-4 lg:py-0 lg:text-3xl font-medium'>{auction.title}</h4>
                        </div>
                    </section>
                    <section className='max-w-2xl'>
                        <DetailsSection data={auction} />
                    </section>

                </section>
                <section className='flex-1 hidden lg:block w-full lg:w-auto'>
                    <div className='w-full lg:w-3/4 h-auto border-t lg:border border-secondary-200/10 p-4 pb-0 text-secondary-400 lg:rounded-2xl'>
                        <div className='text-lg text-secondary-100/40 font-extralight flex items-center justify-between'>
                            <p className='text-third'>YOU WON!</p>
                            <p className='uppercase'>#{auction?.lotId?.split("-")[1] ?? ''}</p>
                        </div>
                        <div className='font-medium text-5xl'>
                            € {numberWithCommas(auction?.bid_id?.current_bid || 0)}
                        </div>
                        <div className=' flex flex-col  w-full py-4 text-sm divide-y divide-dashed divide-bright/10  font-light'>
                            <div className='flex items-center justify-between py-4'>
                                <p>Bid Amount</p>
                                <p>€ {numberWithCommas(auction?.bid_id?.current_bid) ?? 0}</p>
                            </div>
                            <div className='flex items-center justify-between py-4'>
                                <p>Auction Fees</p>
                                <p>€ {numberWithCommas(auction_fees(auction?.bid_id?.current_bid))}</p>
                            </div>
                            <div className='flex items-center justify-between py-4'>
                                <p>VAT</p>
                                <p>€ {numberWithCommas(parseFloat(calculate_vat(auction?.bid_id?.current_bid)).toFixed(2))}</p>
                            </div>
                            <div className='flex items-center text-base font-medium justify-between py-4'>
                                <p>Total Price</p>
                                <p>€ {numberWithCommas(calculate_total(auction?.bid_id?.current_bid).toFixed(2))}</p>
                            </div>
                        </div>
                        <div className='flex items-center mt-4 justify-between'>
                            <Link href={`/user/payment-request/${auction.slug}`}  className='flex-1 bg-bright text-background text-center py-4 cursor-pointer'>Pay</Link>
                        </div>
                        <div className='py-2.5 text-xs'>
                            By bidding, you agree to our Terms of Use.
                        </div>
                    </div>

                </section>
            </div>
            <section className='w-full'>

                <section className='w-full lg:w-1/2'>
                    <h4 className='text-lg text-bright  font-medium'>Condition Report</h4>
                    <p className='text-sm'>
                        {auction.condition_details}
                    </p>
                    <ShowAuctionDetails data={auction.item_details} />
                </section>
            </section>
            <section>
                <ListingCardsSection />
            </section>
            <section className='flex lg:hidden fixed left-0 bottom-0 w-screen items-center justify-start px-2 py-4 bg-background border-t border-third'>
                <div className='grid w-[60%]  text-xs grid-rows-[30px_1fr_30px]'>
                    <p>YOU WON!</p>
                    <div className='font-medium text-3xl'>
                        € {numberWithCommas(auction?.current_bid || 0)}
                    </div>
                    <span><CountdownTimer targetDate={auction.endDate} /></span>

                </div>
                <div className='flex-1 px-2'>
                    <Link href={`/user/payment-request/${auction.slug}`} className='px-2 py-4 bg-secondary h-full flex justify-center items-center'>
                        <p>Pay</p>
                    </Link>
                </div>
            </section>
        </div>
    )
}

// zziqKiLsBX6h4Rfg