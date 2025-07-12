'use client'
import React, { useEffect, useState } from 'react'
import AInput from '../../../lib/AInput'
import AButton, { ApplePayIcon, GooglePayIcon, MasterCardPayIcon, PayPalIcon, USDTIcon, VisaPayIcon } from '../../../lib/AButton'
import { ShieldCheckIcon, TruckIcon, ArrowRightIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import moment from 'moment';
import CountdownTimer from '../../../components/Counter';
import { closedForBidding, getShortCode, numberWithCommas } from '../../../lib/functions/util';
import { useBidding } from '../../../contexts/bid_context'
import BidModal from '../bidModal';
import Image from 'next/image';


const ActionArea = ({ data }) => {

    const [bids, setBids] = useState({})
    const [allBids, setAllBids] = useState([])
    const [seeAllBids, setSeeAllBids] = useState(false)
    const [openBiddingModal, setOpenBiddingModal] = useState(false)
    const [bidAmount, setBidAmount] = useState('')
    const [bidAmountError, setBidAmountError] = useState(null)
    const [bidStatus, setBidStatus] = useState({})
    const [openMobileBidModal, setOpenMobileBidModal] = useState(false)

    const bidding = useBidding()



    useEffect(() => {
        bidding.getAuctionBidData(data.id).then(res => setBids(res))
        bidding.getAuctionBidItemData(data.id).then((res) => setBidStatus(res))
    }, [])

    React.useMemo(() => {
        setAllBids(bids.bids?.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1))
    }, [bids.bids]);

    useEffect(() => {
        let timeout = null
        if (bidAmountError !== null) {
            timeout = setTimeout(() => {
                setBidAmountError(null)
            }, 3000)
        }

        return () => {
            if (timeout) clearTimeout(timeout)
        }
    }, [bids, bidAmountError, bidStatus, allBids])



    let nextBid = bids?.current_bid ? Math.ceil((bids.current_bid * 0.05) + bids.current_bid) : 1
    nextBid = (typeof nextBid == 'number' && nextBid >= 0) ? nextBid : 1

    // console.log(bidStatus, nextBid)

    const isclosedForBidding = data.endDate ? closedForBidding({ ...bidStatus, endDate: data.endDate }) : false


    const place_bid = async () => bidding.placeBid({ ...data, amount: bidAmount })
        .then(res => {
            setBids(res.new_bids)
            return res
        })
        .catch(() => {
            setBidAmountError("Something went wrong, try again")
        })
        .finally(() => setBidAmount(''))

    const handlePlaceBid = () => {
        if (bidAmount < nextBid) {
            return setBidAmountError("Value Should be atleast €" + numberWithCommas(nextBid))
        }

        return setOpenBiddingModal(true)
    }

    return (
        <div className='w-full lg:w-3/4 h-auto border-t lg:border border-secondary-200/10 p-4 text-secondary-400 lg:rounded-2xl'>
            <div className='text-lg text-secondary-100/40 font-extralight flex items-center justify-between'>
                <p>CURRENT BID</p>
                <p className='uppercase'>#{data?.lotId?.split("-")[1] ?? ''}</p>
            </div>
            {isclosedForBidding ?
                <div className='pt-8 text-xl text-red-400/60'>
                    Closed for Bidding
                </div>
                :

                <section className='w-full'>
                    <section className='w-full hidden lg:block'>
                        <div className='font-medium text-5xl'>
                            € {numberWithCommas(bids?.current_bid || 0)}
                        </div>
                        <div className='flex items-center py-4 border-b border-secondary-100/10 justify-between'>
                            <p className='font-medium text-base'>Start Time</p>
                            <p className='font-light text-xs'>{moment(data.startDate).format('llll')}</p>
                        </div>
                        <div className='flex items-center py-4 border-b border-secondary-100/10 justify-between'>
                            <p className='font-medium text-base'>Closes in</p>
                            <span className='font-light text-xs'><CountdownTimer targetDate={data.endDate} /></span>
                        </div>
                        <div className='flex items-center py-4 justify-between'>
                            <p className='font-medium text-base'>Opening Bid</p>
                            <p className='font-light text-xs'>{` ${bids?.starting_bid > 0 ? `€ ${numberWithCommas(bids?.starting_bid)}` : '-' || '-'}`}</p>
                        </div>
                    </section>
                    <section className='lg:flex hidden flex-col space-y-1 py-4 mb-8'>
                        <div><AInput error={bidAmountError} value={bidAmount} setvalue={setBidAmount} className={`bg-secondary placeholder:text-bright-300 text-bright-500 border-gray-300 ring-0  focus:ring-0 rounded-b-none`} label={null} placeholder={`€ ${numberWithCommas(nextBid)} and above`} /></div>
                        <div className='flex items-center space-x-1'>
                            <AButton btn_action={handlePlaceBid} text="Place Bid" className="focus:ring-third-200/50 bg-third-200 text-bright-600 hover:bg-third-200/90 rounded-tl-none rounded-tr-none rounded-br-none"></AButton>
                            <AButton text="Set Max Bid" className="focus:ring-secondary/50 bg-secondary hover:bg-secondary/90 text-bright-600 rounded-tr-none rounded-tl-none rounded-bl-none"></AButton>
                        </div>
                        <span className='text-xs underline'>Bids exclude auction fees</span>
                    </section>
                </section>}
            <section className='mt-8 space-y-1'>
                <h4 className='text-lg text-bright  font-medium'>Condition Report</h4>
                <p className='text-sm'>
                    {data.condition_details}
                </p>
                <ShowAuctionDetails data={data.item_details} />

                <section className='border-t space-y-4 border-bright/10 py-8'>
                    <div className='flex items-center space-x-2 text-sm'>
                        <ShieldCheckIcon className='w-5 h-5 stroke-2' />
                        <p className='font-medium'>Buyers Protection fee: </p>
                        <p>9% + € 3  </p>
                    </div>
                    <div className='flex items-center space-x-2 text-sm'>
                        <TruckIcon className='w-5 h-5 stroke-2' />
                        <p className='font-medium'>Pickup in Alamre, Cyprus </p>
                    </div>
                </section>

                <section className='border-t space-y-4 border-bright/10 py-8'>

                    <div className='flex items-center space-x-2 text-sm'>
                        <p className='font-medium text-lg'>Payment Options </p>
                    </div>
                    <div className='flex items-center justify-around'>
                        <PayPalIcon className='w-7 h-7' />
                        <ApplePayIcon className='w-7 h-7' />
                        <VisaPayIcon className='w-7 h-7' />
                        <MasterCardPayIcon className='w-7 h-7' />
                        <GooglePayIcon className='w-7 h-7' />
                        <USDTIcon className='w-7 h-7' />
                    </div>
                </section>

                <section className='border-t space-y-4 text-sm border-bright/10 py-8'>
                    <div className='p-2 px-4 text-bright bg-secondary-800 text-center rounded-lg'>
                        <p>32 other people are watching this object</p>
                    </div>
                    <div className='py-4 space-y-2'>
                        {
                            (!seeAllBids ? allBids?.slice(0, 5) : allBids)?.map((bid, i) => {
                                const userId = bid.user?.id ? bid.user.id : bid.user
                                return bid.user && (
                                    <div key={i} className='grid w-full grid-cols-3'>
                                        {userId &&
                                            <div className='flex items-center space-x-2'>
                                                <p>Bidder</p>
                                                <p className='uppercase'>{getShortCode(userId)}</p>
                                            </div>}
                                        <p>{moment(bid.createdAt).fromNow()}</p>
                                        <p className='text-end'>€ {numberWithCommas(bid.amount)} </p>
                                    </div>
                                )
                            })
                        }
                        {bids.bids &&
                            <div onClick={() => setSeeAllBids(!seeAllBids)} className=' pt-8 cursor-pointer flex items-center text-sm font-medium space-x-2'>
                                <span>{seeAllBids ? `Hide ${bids.bids?.length ?? 0 - 5} Bids` : `See all Bids (+${bids.bids?.length ?? 0 - 5})`} </span>
                                <span><ChevronDownIcon className='w-4 h-4' /></span>
                            </div>}
                    </div>
                </section>
                <section className='border-t space-y-2 border-bright/10 pt-8'>
                    <AButton text={"BOOK VIEWING"} className={`bg-bright-300 text-background `} />
                    <AButton text={"ASK QUESTION"} className={`bg-background-900 text-bright `} />
                    <div className='relative w-full'>
                        <AInput is_text_area={"yes"} label={null} rows={4} className="placeholder:text-bright-300 text-bright-500" />
                        <div className='absolute bottom-4 right-4 p-2 rounded-lg hover:bg-background-900/50 border-1 border-background cursor-pointer hover:text-background hover:border-background bg-background flex justify-center items-center'>
                            <ArrowRightIcon className='w-5 h-5 -rotate-45' />
                        </div>
                    </div>
                </section>

            </section>
            {!isclosedForBidding &&
                <section className='flex lg:hidden fixed left-0 bottom-0 w-screen items-center justify-start px-2 py-4 bg-background border-t border-third'>
                    <div className='grid w-[60%]  text-xs grid-rows-[30px_1fr_30px]'>
                        <p>CURRENT BID</p>
                        <div className='font-medium text-3xl'>
                            € {numberWithCommas(bids?.current_bid || 0)}
                        </div>
                        <span><CountdownTimer targetDate={data.endDate} /></span>
                    </div>
                    <div className='flex-1 px-2'>
                        <div onClick={() => setOpenMobileBidModal(!openMobileBidModal)} className='px-2 py-4 bg-secondary h-full cursor-pointer flex justify-center items-center'>
                            <p>Bid</p>
                        </div>
                    </div>
                </section>}
            <BidModal open={openBiddingModal} setOpen={setOpenBiddingModal} action={place_bid} amount={bidAmount} />
            <MobileBidModal image={data.image[0]} open={openMobileBidModal} setOpen={setOpenMobileBidModal} bids={bids} aution={data} bidAmountError={bidAmountError} bidAmount={bidAmount} setBidAmount={setBidAmount} handlePlaceBid={handlePlaceBid} nextBid={nextBid} seeAllBids={seeAllBids} allBids={allBids} />

        </div>
    )
}

export default ActionArea


const MobileBidModal = ({ image, aution, bids, bidAmountError, bidAmount, setBidAmount, nextBid, seeAllBids, allBids, open, handlePlaceBid = () => null, setOpen = () => null }) => {
    if (!open) return null
    return (
        <div className='lg:hidden fixed left-0 bottom-0 w-screen h-screen flex items-center justify-center px-2 py-4 bg-background/90 border-t border-third'>
            <div className='px-2 w-screen min-h-[30vh] flex flex-col bg-background border border-third/10'>
                <div className='flex items-center justify-between p-4 border-b border-bright/10 '>
                    <div>
                        <h4>Place your Bid</h4>
                        <div className='text-[10px] flex items-center space-x-1 text-bright-300'>
                            <p className='font-light '>Closes in </p>
                            <span className='font-medium'><CountdownTimer targetDate={aution.endDate} /></span>
                        </div>
                    </div>
                    <span onClick={() => setOpen(false)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
                </div>
                <section className='w-full py-2'>
                    <div className='flex space-x-2 items-start'>
                        <div className='flex flex-1'>
                            <div className='w-full aspect-square bg-third' >
                                <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${image.url}`} alt={image.alt} width={500} height={500} className='w-full h-full object-cover ' />
                            </div>
                        </div>
                        <div className='flex flex-1 flex-col'>
                            <div className='text-sm text-secondary-100/40 font-extralight flex items-center justify-between'>
                                <p>CURRENT BID</p>
                                <p className='uppercase text-xs'>#{aution?.lotId?.split("-")[1] ?? ''}</p>
                            </div>
                            <div className='font-medium text-3xl'>
                                € {numberWithCommas(bids?.current_bid || 0)}
                            </div>

                            <div className='flex items-center py-4 border-b border-secondary-100/10 justify-between'>
                                <p className='font-medium text-base'>Closes</p>
                                <span className='font-light text-xs'><CountdownTimer targetDate={aution.endDate} /></span>
                            </div>
                        </div>
                    </div>
                </section>
                <section className=' flex-col space-y-1 py-4'>
                    <div><AInput error={bidAmountError} value={bidAmount} setvalue={setBidAmount} className={`bg-secondary placeholder:text-bright-300 text-bright-500 border-gray-300 ring-0  focus:ring-0 rounded-b-none`} label={null} placeholder={`€ ${numberWithCommas(nextBid)} and above`} /></div>
                    <div className='flex items-center space-x-1'>
                        <AButton btn_action={handlePlaceBid} text="Place Bid" className="focus:ring-third-200/50 bg-third-200 text-bright-600 hover:bg-third-200/90 rounded-tl-none rounded-tr-none rounded-br-none"></AButton>
                        <AButton text="Set Max Bid" className="focus:ring-secondary/50 bg-secondary hover:bg-secondary/90 text-bright-600 rounded-tr-none rounded-tl-none rounded-bl-none"></AButton>
                    </div>
                    <span className='text-xs underline'>Bids exclude auction fees</span>
                </section>
                <section className='flex max-h-[50vh] overflow-y-auto flex-col space-y-4 text-sm border-bright/10 py-4'>
                    <h4 className='font-bold text-bright text-start text-xl'>Bids</h4>
                    {
                        allBids?.length <= 0 ?
                            <p className='text-sm text-bright-300'>No Bids Yet</p>
                            :
                            (!seeAllBids ? allBids?.slice(0, 5) : allBids)?.map((bid, i) => {
                                const userId = bid.user?.id ? bid.user.id : bid.user
                                return bid.user && (
                                    <div key={i} className='grid w-full grid-cols-3'>
                                        {userId &&
                                            <div className='flex items-center space-x-2'>
                                                <p>Bidder</p>
                                                <p className='uppercase'>{getShortCode(userId)}</p>
                                            </div>}
                                        <p>{moment(bid.createdAt).fromNow()}</p>
                                        <p className='text-end'>€ {numberWithCommas(bid.amount)} </p>
                                    </div>
                                )
                            })
                    }
                </section>
            </div>
        </div>
    )
}

export const ShowAuctionDetails = ({ data }) => {
    return (
        <section className='grid grid-cols-2 gap-4 mt-8 mb-16'>
            {
                data?.map((detail, i) => {
                    return (
                        <div key={i} className='space-y-1'>
                            <h4 className='text-bright-500 uppercase font-mono text-sm font-extralight'>{detail.detail_key}</h4>
                            <p className='text-xs font-semibold text-bright-700'>{detail.detail_value} </p>
                        </div>
                    )
                })
            }

        </section>
    )
}