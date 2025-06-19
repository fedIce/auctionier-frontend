import React from 'react'
import FilterBlock from '../../lib/FilterBlock'
import ListingCards from '../../components/ListingCardsSection/ListingCards'
import Pagination from '../../lib/Pagination'
import ListingCardsSection from '../../components/ListingCardsSection'

const SearchPage = () => {
    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 my-8'>
                <h1 className='font-medium text-5xl'>iphone</h1>
                <div className="flex text-sm  text-nowrap overflow-x-auto items-center space-x-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                    <h4>Related search terms:</h4>
                    <p>juventus</p>
                    <p>|</p>
                    <p>juventus</p>
                    <p>|</p>
                    <p>juventus</p>
                    <p>|</p>
                    <p>juventus</p>
                    <p>|</p>
                    <p>juventus</p>
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

export default SearchPage