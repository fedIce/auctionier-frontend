'use client'
import React, { useEffect, useState } from 'react'
import { FilterControls, FilterItem } from '../../../../lib/FilterBlock'
import ListingCards from '../../../../components/ListingCardsSection/ListingCards'
import Pagination from '../../../../lib/Pagination'
import ListingCardsSection from '../../../../components/ListingCardsSection'
import CategoryIcons from '../../../../components/Home/CategoryIcons'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { onSelectFilter } from '../../../search/search'
import { fetchWatches } from '../../../category/[slug]/CategoryPage'
import { useAuth } from '../../../../contexts/auth'
import NoItemsFound from '../../../../components/NoItemsFound'


const AuctionsPage = ({ auction, docs, aggs, crumbs, pagination }) => {
    const [hideFilter, setHideFilter] = useState(false)
    const [hideMobileFilter, setHideMobileFilter] = useState(true)
    const [watches, setWatches] = useState([])


    const router = useRouter()
    const auth = useAuth()
    const _user = auth?.user?.user || {}

    useEffect(() => {
        fetchWatches(docs.map(i => i.id)).then(res => {
            setWatches(res)
        })
    }, [docs])

    const userWatches = new Set(watches.map(i => _user.id == i.user && i.auction_item))


    return (
        <div className='w-full p-2 relative'>
            <section className='space-y-2 lg:my-2'>
                <CategoryIcons />
            </section>
            <section>
                <BreadCrumbs crumbs={crumbs} />
            </section>
            <section className='w-full my-4'>
                <div className='w-full h-64 rounded-2xl bg-third relative overflow-hidden' >
                    <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${auction.horizontalbannerImage?.url || ''}`} alt={auction.horizontalbannerImage?.alt || 'Auction Banner'} className='w-full h-full object-cover rounded-2xl' height={auction.horizontalbannerImage?.height || 400} width={auction.horizontalbannerImage?.width || 600} />
                    <div className='flex text-bright flex-col items-start py-4 px-4 bg-gradient-to-t w-full from-black to-transparent absolute -bottom-0 space-y-2 left-0 space-x-2'>
                        <h1 className='font-semibold text-3xl lg:text-5xl'>{auction.title}</h1>
                        <p className='text-xs line-clamp-2'>{auction.description}</p>
                    </div>
                </div>
            </section>

            <section className='flex items-center justify-end'>
                <div className='flex items-center space-x-2 self-end'>
                    <FilterItem className='lg:flex hidden' onClick={() => setHideFilter(!hideFilter)} text='Hide Filters' >
                        <AdjustmentsHorizontalIcon className='w-5 h-5' />
                    </FilterItem>
                    <FilterItem className='flex lg:hidden' onClick={() => setHideMobileFilter(!hideMobileFilter)} text='Hide Filters' >
                        <AdjustmentsHorizontalIcon className='w-5 h-5' />
                    </FilterItem>
                    <FilterItem text='Sort By:' >
                        {/* <ChevronDownIcon className='w-5 h-5' /> */}
                        <select onChange={(e) => onSelectFilter('sort', e.target.value, router)} className=' outline-none' >
                            <option value="ending-soon">Ending Soon</option>
                            <option value="ending-later">Ending Later</option>
                            <option value="newest-first">Newst First</option>
                            <option value="oldest-first">Oldest First</option>
                            <option value="clear" className='flex items-center space-x-4'>Clear All </option>
                            {/* <option value="most-viewed">Most Viewed</option>
                                <option value="most-bids">Most Bids</option>
                                <option value="most-favorites">Most Favorites</option> */}
                        </select>
                    </FilterItem>
                </div>
            </section>
            <section className='my-4 w-full border-t border-bright/10'>
                <div className='w-full relative flex items-start'>
                    <div className={`${hideFilter ? 'w-0 border-background' : 'w-1/4 border-bright/10'} h-full hidden lg:block transition-all duration-300 ease-in-out border-r `} >
                        <FilterControls aggs={aggs} />
                    </div>
                    <div className={`${hideFilter ? 'w-full' : 'w-full lg:w-3/4'} transition-all duration-300 ease-in-out lg:ml-4`}>
                        <h4 className='font-bold text-xl text-nowrap my-4'>{docs.length} Item(s)</h4>

                        {
                            docs.length <= 0 ?
                                <NoItemsFound />
                                :
                                <section className={`w-full grid gap-4 grid-cols-2 ${hideFilter ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>

                                    {

                                        docs.length > 0 ? docs.map((doc, i) => {
                                            return (
                                                <ListingCards watches={userWatches} watchCount={watches} key={i} data={doc} user={doc.user} auction={doc} />
                                            )
                                        })
                                            :
                                            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                                                return (
                                                    <ListingCards key={i} />
                                                )
                                            })
                                    }
                                </section>}
                    </div>
                </div>
            </section>
            <section className='my-16'>
                <Pagination pagination={pagination} />
            </section>
            <section>
                <ListingCardsSection />
            </section>
            <div className={`fixed block lg:hidden top-0 left-0 w-screen h-full pt-[7vh] p-2 ${hideMobileFilter ? ' translate-x-[100%]' : 'translate-x-[0%]'} bg-background block transition-all duration-300 ease-in-out border-r `} >
                <div className='flex items-center justify-between p-4 border-b border-bright/10 '>
                    <div>
                        <h4>Filter</h4>
                        <p className='text-[10px] text-bright-300'>Close filter to see {docs.length} results.</p>
                    </div>
                    <span onClick={() => setHideMobileFilter(!hideMobileFilter)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
                </div>
                <FilterControls aggs={aggs} />
            </div>
        </div>
    )
}

export default AuctionsPage