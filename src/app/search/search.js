'use client'
import React, { useState } from 'react'
import { FilterControls, FilterItem } from '../../lib/FilterBlock'
import ListingCards from '../../components/ListingCardsSection/ListingCards'
import Pagination from '../../lib/Pagination'
import ListingCardsSection from '../../components/ListingCardsSection'
import { AdjustmentsHorizontalIcon,  XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'


const SearchPageCOntent = ({ docs, aggs, q, pagination }) => {

    const [hideFilter, setHideFilter] = useState(false)
    const router = useRouter();


    const onSelectFilter = (key, value) => {
        const params = new URLSearchParams(window.location.search);
        let a = params.toString()
        if (value === 'clear') {
            a = a.split('&').filter(param => !param.startsWith(`${key}=`)).join('&');
            // params.delete(key);
            router.push(`?${a}`);
            return;
        } else {
            a = a.split('&').filter(param => !param.startsWith(`${key}=`)).join('&');
            // params.delete(key);
            a = a.replace(/&$/, '').replace(/^\?/, '') + `&${key}=${value}`
        }

        router.push(`?${a}`);
    }

    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 mb-4 lg:my-8'>
                <h1 className='font-medium text-5xl'>Results for: {q}</h1>
                <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 items-center space-x-2 w-full justify-between'>
                    <div className="flex text-sm  text-nowrap overflow-x-auto items-center space-x-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        {/* <h4>Related search terms:</h4>
                        <p>juventus</p>
                        <p>|</p>
                        <p>juventus</p>
                        <p>|</p>
                        <p>juventus</p>
                        <p>|</p>
                        <p>juventus</p>
                        <p>|</p>
                        <p>juventus</p> */}
                    </div>
                    <div className='flex items-center space-x-2 self-end'>
                        <FilterItem onClick={() => setHideFilter(!hideFilter)} text='Hide Filters' >
                            <AdjustmentsHorizontalIcon className='w-5 h-5' />
                        </FilterItem>
                        <FilterItem text='Sort By:' >
                            {/* <ChevronDownIcon className='w-5 h-5' /> */}
                            <select onChange={(e) => onSelectFilter('sort', e.target.value)} className=' outline-none' >
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
                </div>
            </section>
            {/* <section className='my-16 border-b border-bright/10 pb-8'>
                <FilterBlock />
            </section> */}
            <section className='lg:my-8 w-full border-t border-bright/10'>
                <div className='w-full relative flex items-start'>
                    <div className={`${hideFilter ? 'w-0 border-background' : 'w-1/4 border-bright/10'} h-full hidden lg:block transition-all duration-300 ease-in-out border-r `} >
                        <FilterControls aggs={aggs} />
                    </div>
                    <div className={`${hideFilter ? 'w-full' : 'w-3/4'} transition-all duration-300 ease-in-out lg:ml-4`}>
                        <h4 className='font-bold text-xl text-nowrap my-4'>{docs.length} Item(s)</h4>

                        <section className={`w-full grid gap-4 grid-cols-2 ${hideFilter ? 'md:grid-cols-3 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-3'}`}>

                            {

                                docs.length > 0 ? docs.map((doc, i) => {
                                    return (
                                        <ListingCards key={i} data={doc} user={doc.user} auction={doc} />
                                    )
                                })
                                    :
                                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                                        return (
                                            <ListingCards key={i} />
                                        )
                                    })
                            }
                        </section>
                    </div>
                </div>
            </section>
            <section className='my-16'>
                <Pagination pagination={pagination} />
            </section>
            <section>
                <ListingCardsSection />
            </section>
            <div className={`fixed block lg:hidden top-0 left-0 w-screen h-full pt-[7vh] p-2 ${hideFilter ? ' translate-x-[100%]' : 'translate-x-[0%]'} bg-background block transition-all duration-300 ease-in-out border-r `} >
                <div className='flex items-center justify-between p-4 border-b border-bright/10 '>
                    <div>
                        <h4>Filter</h4>
                        <p className='text-[10px] text-bright-300'>Close filter to see {docs.length} results.</p>
                    </div>
                    <span onClick={() => setHideFilter(!hideFilter)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
                </div>
                <FilterControls aggs={aggs} />
            </div>
        </div>
    )
}

export default SearchPageCOntent