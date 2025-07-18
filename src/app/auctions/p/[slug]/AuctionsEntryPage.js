import React from 'react'

import { use_get } from '../../../../lib/functions'
import AuctionsPage from './AuctionsPage'
import { generateQueryParams } from '../../../search/func'



const fetchAuctionItems = async (id) => {
    const res = await use_get({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/t/auction?queryslug=${id}&depth=2`, options: {
            cache: 'no-store',
        }
    })
    return res
}

const fetchAuction = async (id) => {
    const res = await use_get({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auctions?where[slug][equals]=${id}&depth=2`, options: {
            revalidate: 3600,
        }
    })
    return res.docs[0]
}




const AuctionsEntryPage = async ({ params, searchParams }) => {
    const id = await params?.slug
    const query = await searchParams

    const auctions_items = await fetchAuctionItems(id + generateQueryParams('', query))
    const docs = auctions_items?.docs || []


    const auction = await fetchAuction(id)//docs[0]?.auction || {}

    const aggs = auctions_items?.aggs || []
    const {
        hasNextPage,
        hasPrevPage,
        limit,
        nextPage,
        page,
        pagingCounter,
        prevPage,
        totalDocs,
        totalPages,
    } = auctions_items

    const pagination = {
        hasNextPage,
        hasPrevPage,
        limit,
        nextPage,
        page,
        pagingCounter,
        prevPage,
        totalDocs,
        totalPages,
    }

    const _ = [
        {
            title: "Home",
            link: "/",
            description: "Auctionier home page"
        },
        {

            title: auction.title,
            link: `/auctions/p/${auction.slug}`,
            description: auction.description
        }
    ]


    return <AuctionsPage aggs={aggs[0]} auction={auction} pagination={pagination} docs={docs} crumbs={_} />
}

export default AuctionsEntryPage