'use client'
import React, { createRef, useEffect, useState } from 'react'
import ListingCards from './ListingCards'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { fetchWatches } from './../../app/category/[slug]/CategoryPage'
import { useAuth } from '@/contexts/auth';

const ListingCardsSection = ({ data, title = "Section Title" }) => {
    const [watches, setWatches] = useState([])


    useEffect(() => {
        fetchWatches(docs.map(i => i.id)).then(res => {
            setWatches(res)
        })
    }, [])


    const scrollRef = createRef()
    const auth = useAuth()
    const _user = auth?.user?.user || null
    const [scrollAmount, setScrollAmount] = useState(1)

    const docs = data?.docs || []

    if (docs.length <= 0) {
        return null
    }

    // const {
    //     hasNextPage,
    //     hasPrevPage,
    //     limit,
    //     nextPage,
    //     page,
    //     pagingCounter,
    //     prevPage,
    //     totalDocs,
    //     totalPages,
    // } = data

    // const pagination = {
    //     hasNextPage,
    //     hasPrevPage,
    //     limit,
    //     nextPage,
    //     page,
    //     pagingCounter,
    //     prevPage,
    //     totalDocs,
    //     totalPages,
    // }

    const scroll = (direction) => {
        const bgDropElement = document.getElementById("list_cards_sroll");
        const { width } = bgDropElement.getBoundingClientRect();
        

        if (direction <= 0) return scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        if (direction > (width + 500)) return
        scrollRef.current.scrollTo({ left: direction, behavior: "smooth" })
        setScrollAmount(direction)
    }

    const userWatches = new Set(watches.map(i => _user?.id == i.user && i.auction_item))

    return (
        <div className='flex space-y-4 flex-col w-full justify-start mt-8 lg:mt-16 mb-4 lg:mb-8 items-start px-2'>
            <div className='flex w-full items-center justify-between'>
                <h4 className='font-bold text-xl text-nowrap text-foreground'>{title}</h4>
                <div className='flex px-2 lg:px-0 w-full left-0 items-center justify-end space-x-2'>
                    {scrollAmount > 1 ? <div onClick={() => scroll(scrollAmount - 500)} className='rounded-full p-2 cursor-pointer'>
                        <ChevronLeftIcon className='w-4 h-4 text-primary-300' />
                    </div> : <div />}
                    <div onClick={() => scroll(scrollAmount + 500)} className='rounded-full p-2 cursor-pointer'>
                        <ChevronRightIcon className='w-4 h-4 text-primary-300' />
                    </div>
                </div>
            </div>
            <div id="list_cards_sroll" ref={scrollRef} className="w-full flex items-start space-x-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {
                    docs?.length > 0 ?
                        docs.map((doc, i) => {
                            return (
                                <div className='min-w-64' key={i}>
                                    <ListingCards watches={userWatches} watchCount={watches} data={doc} />
                                </div>
                            )
                        })
                        :
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                            return (
                                <ListingCards key={i} />
                            )
                        })
                }
            </div>

        </div>
    )
}

export default ListingCardsSection