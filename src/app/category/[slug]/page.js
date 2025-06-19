import React from 'react'
import FilterBlock from '../../../lib/FilterBlock'
import ListingCards from '../../../components/ListingCardsSection/ListingCards'
import Pagination from '../../../lib/Pagination'
import ListingCardsSection from '../../../components/ListingCardsSection'
import BreadCrumbs from '../../../components/BreadCrumbs'
import CategoryIcons from '../../../components/Home/CategoryIcons'
import { BookOpenIcon } from "@heroicons/react/24/outline";


const CategoryItemPage = () => {
    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 lg:my-8'>
                <CategoryIcons />
            </section>
            <section>
                <BreadCrumbs />
            </section>
            <section className='space-y-4'>
                <div className='flex items-center my-4 space-x-2'>
                    <BookOpenIcon className='w-12 h-12' />
                    <h1 className='font-semibold text-3xl lg:text-5xl'>Books Category</h1>
                </div>
                <div className='grid py-4 grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4'>
                    {
                        [0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                            return (
                                <div key={i} className='cursor-pointer transition-colors duration-300 border-white/10 hover:bg-bright-400 grid grid-rows-[1fr_30px] bg-bright text-background aspect-video p-2 pb-0 rounded-xl lg:rounded-2xl'>
                                    <div></div>
                                    <div className='text-end text-xs lg:text-sm text-nowrap px-2 font-medium'>Sub Category {i}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
            <section className='my-16 border-b border-bright/10 pb-8'>
                <FilterBlock />
            </section>
            <section className='my-8 w-full'>
                <h4 className='font-bold text-xl text-nowrap my-4'>Section Title</h4>
                <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                            return (
                                <ListingCards key={i} />
                            )
                        })
                    }
                </section>
            </section>
            <section className='my-16'>
                <Pagination />
            </section>
            <section>
                <ListingCardsSection />
            </section>
        </div>
    )
}

export default CategoryItemPage