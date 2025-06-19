import React from 'react'
import FilterBlock from '../../../../lib/FilterBlock'
import ListingCards from '../../../../components/ListingCardsSection/ListingCards'
import Pagination from '../../../../lib/Pagination'
import ListingCardsSection from '../../../../components/ListingCardsSection'
import CategoryIcons from '../../../../components/Home/CategoryIcons'
import BreadCrumbs from '../../../../components/BreadCrumbs'

const SubCategoryPage = () => {
    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 lg:my-8'>
                <CategoryIcons />
            </section>
            <section>
                <BreadCrumbs />
            </section>
            <div className='flex items-center my-4 space-x-2'>
            <h1 className='font-semibold text-3xl lg:text-5xl'>Books Category</h1>
            </div>
            <section className='my-4 lg:my-16 border-b border-bright/10 pb-8'>
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

export default SubCategoryPage