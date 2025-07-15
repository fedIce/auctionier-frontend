import React, { Suspense } from 'react'
import ListingCardsSection from '../../components/ListingCardsSection'
import SearchEntryPage from './searchEntry.js'
import SearchPageloading from '../../components/SearchPageLoading/index.js'


const SearchPage = async ({ searchParams }) => {

    const { q = '' } = await searchParams

    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 mb-4 lg:my-8'>
                <h1 className='font-medium text-5xl'>Results for: {q}</h1>
            </section>
            <Suspense fallback={<SearchPageloading />}>
                <SearchEntryPage searchParams={searchParams} />
                <section>
                    <ListingCardsSection />
                </section>
            </Suspense>
            
        </div>

    )
}

export default SearchPage