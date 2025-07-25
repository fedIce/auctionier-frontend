import moment from 'moment'
import Image from 'next/image'
import React from 'react'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import { numberWithCommas } from '../../../../lib/functions/util'
import Link from 'next/link'

const OrderPage = ({ docs, crumbs }) => {

    return (
        <div className='w-full p-2'>
            <div className='space-y-16'>
                <BreadCrumbs crumbs={crumbs} />
                <div className='text-4xl font-bold'>My Orders</div>
            </div>
            <div className='w-full py-10 pb-24 space-y-8'>
                {
                    docs.length <= 0 ?
                        <div>No Orders</div>
                        :
                        docs.map((order, i) => {
                            const auction = order.auction
                            return (
                                <div key={i} className='w-full space-x-4 flex flex-col space-y-2 lg:space-y-0 lg:flex-row items-start'>
                                    <div className='w-full lg:w-1/2 flex'>
                                        <ImageView images={order.auction.image} />
                                    </div>
                                    <div className='flex flex-col space-y-2 flex-1 w-full'>
                                        <div className='text-2xl font-medium'>{auction.title}</div>
                                        <div className='text-sm'>{auction.condition_details}</div>
                                        <div className='w-full space-y-4'>
                                            <div className='w-full flex justify-between'>
                                                <div className=''>Opening Price</div>
                                                <div className=''> € {numberWithCommas(parseFloat(auction.startingBid).toFixed(2))}</div>
                                            </div>
                                            <div className='w-full flex justify-between'>
                                                <div className=''>Closing Price</div>
                                                <div className=''> € {numberWithCommas(parseFloat(auction.bid_id.current_bid).toFixed(2))}</div>
                                            </div>
                                            <div className='w-full flex justify-between'>
                                                <div className=''>Ended</div>
                                                <div className=''>{moment(auction.endDate).fromNow()}</div>
                                            </div>
                                            <div className='w-full flex justify-between'>
                                                <div className=''>Bids</div>
                                                <div className=''>{auction.bid_id.bids.length}</div>
                                            </div>
                                            <div className='w-full flex justify-between'>
                                                <div className=''>Status</div>
                                                <div className=''>
                                                    {order.status == 'pending' ?
                                                        <Link href={`/user/i/${auction.slug}`} className='p-2 px-4 cursor-pointer duration-300 transition-colors bg-secondary hover:bg-secondary-300 text-secondary-900'>View Order</Link>
                                                        :
                                                        order.status == 'shipped' ?
                                                            <Link href={`/user/i/${auction.slug}`} className='p-2 px-4 cursor-pointer duration-300 transition-colors bg-secondary hover:bg-secondary-300 text-secondary-900'>Track</Link>
                                                            : order.status}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                }
            </div>
        </div>
    )
}

export default OrderPage

const ImageView = ({ images }) => {
    return (
        <div className='flex items-start aspect-video divide-x-2 border-2 divide-secondary/10 border-secondary/10 w-full'>
            <div className='w-full h-full flex-1 overflow-hidden '>
                <ImageIndex index={0} images={images} />
            </div>
            <div className='w-full h-full flex-col flex flex-1 overflow-hidden divide-y-2 divide-secondary/10 '>
                <div className='w-full h-1/2 flex flex-1 divide-x-2 divide-secondary/10'>
                    <div className='w-full h-full flex flex-1 overflow-hidden'>
                        <ImageIndex index={1} images={images} />
                    </div>
                    <div className='w-full flex h-full flex-1 overflow-hidden'>
                        <ImageIndex index={2} images={images} />
                    </div>

                </div>
                <div className='w-full flex h-1/2 flex-1 divide-x-2 divide-secondary/10'>
                    <div className='w-full flex flex-1 overflow-hidden'>
                        <ImageIndex index={3} images={images} />
                    </div>
                    <div className='w-full flex h-full flex-1 overflow-hidden'>
                        <ImageIndex index={4} images={images} />
                    </div>
                </div>
            </div>
        </div>
    )
}

const ImageIndex = ({ index = 0, images }) => <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}${images[index].sizes.thumbnail?.url ? images[index].sizes.thumbnail.url : images[index].sizes.medium.url || ''}`} alt={images[index].sizes.thumbnail?.url ? images[index].sizes.thumbnail.alt : images[index].alt ?? 'auction image'} className='min-h-60 transition-transform duration-300 w-full h-full hover:scale-125 object-cover' height={images[index].sizes.thumbnail?.url ? images[index].sizes.thumbnail.height : images[index].sizes.medium.height || 600} width={images[index].sizes.thumbnail?.url ? images[index].sizes.thumbnail.width : images[index].sizes.medium.width || 600} />