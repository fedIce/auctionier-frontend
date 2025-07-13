'use client'
import React, { useState } from 'react'
import  { FilterControls, FilterItem } from '../../../lib/FilterBlock'
import ListingCards from '../../../components/ListingCardsSection/ListingCards'
import Pagination from '../../../lib/Pagination'
import ListingCardsSection from '../../../components/ListingCardsSection'
import BreadCrumbs from '../../../components/BreadCrumbs'
import CategoryIcons from '../../../components/Home/CategoryIcons'
import { AdjustmentsHorizontalIcon,  XMarkIcon } from "@heroicons/react/24/outline";
import * as Icons from "@heroicons/react/24/outline";
import Link from 'next/link'
import { onSelectFilter } from '../../search/search'
import { useRouter } from 'next/navigation'


const CategoryPage = ({ id, sub_catgeories_docs, docs, aggs, crumbs, pagination }) => {
    const [hideFilter, setHideFilter] = useState(false)
    const [hideMobileFilter, setHideMobileFilter] = useState(true)
    const router = useRouter()
    const _icon = docs[0].category.icon
    const Icon = Icons[_icon]

    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 lg:my-8'>
                <CategoryIcons />
            </section>
            <section>
                <BreadCrumbs crumbs={crumbs} />
            </section>
            <section className='space-y-4'>
                <div className='flex items-center my-4 space-x-2'>
                    <Icon className='w-12 h-12' />
                    <h1 className='font-semibold text-3xl capitalize lg:text-5xl'>{id.split("-").join(" ")}</h1>
                </div>
                <div className='grid py-4 grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4'>
                    {
                        sub_catgeories_docs.length > 0 ? sub_catgeories_docs.map((sub, i) => {
                            return (
                                <Link href={`/category/${id}/${sub.slug}`} key={i} className='cursor-pointer transition-colors duration-300 border-white/10 hover:bg-bright-500  grid grid-rows-[1fr_50px] bg-bright-300 text-foreground aspect-video p-2 pb-0 rounded-xl lg:rounded-2xl'>
                                    <div></div>
                                    <div className='flex items-end py-2 text-start text-xs lg:text-sm px-2 font-medium'>{sub.title}</div>
                                </Link>
                            )
                        })
                            :
                            [0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                                return (
                                    <div key={i} className='cursor-pointer transition-colors duration-300 border-white/10 hover:bg-bright-200 grid grid-rows-[1fr_30px] bg-bright-400 text-background aspect-video p-2 pb-0 rounded-xl lg:rounded-2xl'>
                                        <div></div>
                                        <div className='text-end text-xs lg:text-sm text-nowrap px-2 font-medium'>Sub Category {i}</div>
                                    </div>
                                )
                            })
                    }
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
            <section className='my-8 w-full'>
                <section className='lg:my-8 w-full border-t border-bright/10'>
                    <div className='w-full relative flex items-start'>
                        <div className={`${hideFilter ? 'w-0 border-background' : 'w-1/4 border-bright/10'} h-full hidden lg:block transition-all duration-300 ease-in-out border-r `} >
                            <FilterControls aggs={aggs} />
                        </div>
                        <div className={`${hideFilter ? 'w-full' : 'lg:w-3/4'} transition-all duration-300 ease-in-out lg:ml-4`}>
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

export default CategoryPage