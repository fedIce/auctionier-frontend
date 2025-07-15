'use client'
import { use_get, use_post } from '@/lib/functions'
import React, { useContext, createContext } from 'react'
import { parseError, useAuth } from '../auth'
import { useAlert } from '../Alert'

const init = {
    bidAmount: '',
    setBidAmount: () => null,
    setOpenBiddingModal: () => null,
    getAuctionBidData: async () => null,
    placeBid: async () => null,
    getAuctionBidItemData: async () => null
}

const BiddingProvider = createContext(init)

const BiddingContext = ({ children }) => {

    const auth = useAuth()
    const alert = useAlert()
    const user = auth.user?.user ?? {}



    const getAuctionBidData = async (id) => {
        return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bids/${id}?depth=2` })
    }

    const getAuctionBidItemData = async (id, depth = 1) => {
        const bids = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bids/${id}?depth=${depth}` })
        return bids
    }

    const placeBid = async (data) => {
        const decimalRegex = /^\d+(\.\d+)?$/;

        if (!decimalRegex.test(data.amount)) {
            alert.setalert('error', `Invalid bid amount, try again`)
            return null
        }

        if (!data.id || !data.auction_type) {
            alert.setalert('error', 'Something went wrong, refresh the page and try again')
            return null
        }

        const result = await use_post({
            url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bids/place_bid?depth=2`, data: {
                customer_id: user.id,
                auction_id: data.id,
                amount: data.amount,
                auction_type: data.auction_type
            },
            token: auth?.user?.token ?? null
        }).catch(async (e) => {
            if (e) {
                const error = await parseError(e)
                alert.setalert('error', error)
                return null
            }

        })
        console.log(result, '::')

        if (!result.validBid) {
            alert.setalert('warning', 'Sorry, Your bid does not meet the reserve price, try again!')
        }

    }

    const value = { getAuctionBidData, placeBid, getAuctionBidItemData }
    return (
        <div className='w-full h-full'>
            <BiddingProvider.Provider value={value}>{children}</BiddingProvider.Provider>
        </div>
    )
}

export const useBidding = () => useContext(BiddingProvider)

export default BiddingContext