import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { numberWithCommas, timeExpired } from '../../../lib/functions/util'
import moment from 'moment';
import Link from 'next/link';
import { ChevronRightIcon, HeartIcon } from '@heroicons/react/24/outline';
import * as SolidIcons from '@heroicons/react/24/solid';
import { use_post } from '@/lib/functions';
import { useAuth } from '@/contexts/auth';
import { LoaderSpinnerAnimation } from '../../../components/util/checker'


const topBid = (bids) => {
    let top = {
        amount: 0
    }
    if (bids) {
        for (let i = 0; i <= bids.length - 1; i++) {
            if (bids[i].amount > top.amount) {
                top = bids[i]
            }
        }

        return top
    }

}


const ListingCards = ({ data = null, user = null, watches = null, pulse = false, watchCount = null }) => {

    const auth = useAuth()
    const _user = auth.user?.user ?? null
    const [watching, setWatching] = useState([])
    const [count, setCount] = useState(0)
    const [likeLoading, setLikeLoading] = useState(false)

    useEffect(() => {
        if (watches) {
            setWatching(Array.from(watches))
        }
        if (watchCount) {
            setCount(watchCount.filter(i => i.auction_item == data?.id)?.length || 0)
        }
    }, [watches, watchCount])

    useEffect(() => {
    }, [watching])

    let bid_summary = null


    if (typeof data?.bid_id == 'object') {
        bid_summary = {
            length: data.bid_id.bids?.length || 0,
            top_bid: topBid(data.bid_id.bids),
            winner: data.bid_id.top_biddder
        }

        if (timeExpired(data.endDate) && data.status === 'closed' && data.active == false && data.bid_id?.top_biddder) {
            bid_summary.winner = data.bid_id.top_biddder
        }

    }



    const hasBidded = data?.bid_id?.bids?.some(i => i.user == user?.id) || false
    const leading_bid = bid_summary?.top_bid?.user == user?.id
    const statusText = user ? hasBidded ?
        bid_summary?.winner && bid_summary.winner.id === user?.id && !data.order?.id ?
            {
                msg: "You Won this Bid!",
                status: 'won'
            } :
            user?.id && data.order && data.order.user?.id == user?.id ?
                data.order.status == 'completed' ?
                    {
                        msg: `You Paid!`,
                        status: 'paid-',
                    }
                    :
                    data.order.status == 'pending' ?
                        {
                            msg: `You order is being processed`,
                            status: 'pending',
                        }
                        :
                        data.order.status == 'shipped' ?
                            {
                                msg: `You order has been shipped`,
                                status: 'shippped',
                            }
                            :
                            {
                                msg: `You order was Cancelled`,
                                status: 'cancelled',
                            }
                :
                leading_bid ?
                    {
                        msg: "You are in the Lead",
                        status: 'leading'
                    } :
                    {
                        msg: 'You have Been Out Bided',
                        status: 'outbided'
                    }
        :
        {
            msg: "Current Bid",
            status: 'watching'
        } : null

    const SolidHeart = SolidIcons.HeartIcon

    const onAddToFavourites = async () => {
        if (!auth.userLoggedIn()) return
        setLikeLoading(true)
        return await use_post({
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/watchers/watch?depth=0`, token: auth?.user?.token, data: {
                user: _user?.id,
                auction_item: data?.id
            }
        }).then((res) => {
            if (res.action == 'create') {
                setWatching(w => [...w, res.auction_item])
                setCount(c => c + 1)
            } else {
                setWatching(w => w.filter(l => l !== res.auction_item))
                setCount(c => c - 1)
            }
        }).finally(() => setLikeLoading(false))
    }


    const isWatched = data && new Set(watching).has(data?.id) || false;

    return data ? (
        <div className='flex flex-col w-full relative space-y-2 text-foreground'>
            <Link href={`/auctions/${data.slug}`} className=" w-full lg:min-w-64 min-h-60 cursor-pointer lg:max-h-80 bg-third-300 overflow-hidden rounded-lg " >
                <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}${data.thumbnail?.url ? data.thumbnail.url : data.image[0].sizes.medium.url || ''}`} alt={data.thumbnail?.url ? data.thumbnail.alt : data.image[0].alt || 'auction image'} className='min-h-60 transition-transform duration-300 hover:scale-125 object-cover' height={data.thumbnail?.url ? data.thumbnail.height : data.image[0].sizes.medium.height || 600} width={data.thumbnail?.url ? data.thumbnail.width : data.image[0].sizes.medium.width || 600} />
            </Link >
            <div>
                <Link href={`/auctions/${data.slug}`} className='text-xl font-medium'>{data.title}</Link>
                <h6 className='flex flex-col text-xs uppercase py-2'><p className={` font-semibold  ${['leading', 'won'].includes(statusText?.status) ? 'text-green-400' : statusText?.status == 'outbided' ? 'text-third-300' : 'text-bright'}`}> {statusText?.msg} </p><p className='text-xl font-semibold'>€ {numberWithCommas(data.bid_id?.current_bid || 0)}</p></h6>
                {
                    user &&
                        statusText.status == 'won' ?
                        <Link href={`/user/i/${data.slug}`} className='text-sm cursor-pointer justify-center bg-third font-medium text-foreground py-2.5 flex items-center space-x-4 font-mono hover:bg-third-100 hover:text-bright transition-colors duration-300 underline'>
                            <span>Pay Now</span>
                            <span><ChevronRightIcon className='w-4 h-4 stroke-2' /></span>
                        </Link>
                        :
                        <h6 className='text-sm font-mono'>{new Date(data.endDate) > new Date() ? `Ends ${moment(data.endDate).fromNow()}` : `Closed for bidding`}</h6>
                }
            </div>
            {watches &&
                <div className='absolute bg-foreground pl-1 pr-2 rounded-full flex items-center space-x-2 top-3 text-background right-3'>
                    {
                        likeLoading ?
                            <LoaderSpinnerAnimation width={30} height={30} />
                            :
                            isWatched ?
                                <SolidHeart onClick={() => onAddToFavourites()} className='w-7 h-7 cursor-pointer ' />
                                :
                                <HeartIcon onClick={() => onAddToFavourites()} className='w-7 h-7 cursor-pointer ' />
                    }
                    <p className='font-medium text-background'>{count}</p>
                </div>}
        </div>
    )
        : (
            <div className={`w-full lg:min-w-64 min-h-80 bg-foreground rounded-lg ${pulse && 'animate-pulse'}`} >
                {/* Section Card */}
            </div >
        )
}

export default ListingCards


