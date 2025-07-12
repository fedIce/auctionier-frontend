import React from 'react'

import { use_get } from '../../../../lib/functions'
import { generateQueryParams } from '../../../search/page'
import AuctionsPage from './AuctionsPage'
import NoItemsFound from '../../../../components/NoItemsFound'



const fetchAuctionItems = async (id) => {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/t/auction?slug=${id}&depth=2` })
    return res
}




const Auctions = async ({ params, searchParams }) => {
    const id = await params?.slug
    const query = await searchParams

    const auctions_items = await fetchAuctionItems(id + generateQueryParams('', query))
    const docs = auctions_items?.docs || []

    if(docs.length <= 0){
        return (<NoItemsFound/>)
    }

    const auction = docs[0].auction || {}

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


    console.log(auctions_items)
    return <AuctionsPage aggs={aggs[0]} auction={auction} pagination={pagination} docs={docs} crumbs={_} />
}

export default Auctions