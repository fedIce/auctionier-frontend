import React from 'react'
import FilterBlock, { FilterControls } from '../../lib/FilterBlock'
import ListingCards from '../../components/ListingCardsSection/ListingCards'
import Pagination from '../../lib/Pagination'
import ListingCardsSection from '../../components/ListingCardsSection'
import { use_get } from '../../lib/functions'

const searchCall = async (query) => {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items/search?search=${query}` })
    if (!res) {
        throw new Error('Failed to fetch data')
    }
    return res
}

const SearchPage = async ({ params, searchParams }) => {

    const { q = '' } = await searchParams

    const searchResults = await searchCall(q)
    const docs = searchResults?.docs || []
    const aggs = searchResults?.aggs[0] || {}
    console.log(searchResults)

    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 my-8'>
                <h1 className='font-medium text-5xl'>{q}</h1>
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
            {/* <section className='my-16 border-b border-bright/10 pb-8'>
                <FilterBlock />
            </section> */}
            <section className='my-8 w-full border-t border-bright/10'>
                <div className='w-full relative flex items-start'>
                    <div className='w-1/4 h-full  border-r border-bright/10' >
                        <FilterControls aggs={aggs} />
                    </div>
                    <div className='w-3/4 hidden lg:block h-full  ml-4'>
                        <h4 className='font-bold text-xl text-nowrap my-4'>{docs.length} Item(s)</h4>

                        <section className='w-full grid gap-4 grid-cols-2 lg:grid-cols-3'>

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
                <Pagination />
            </section>
            <section>
                <ListingCardsSection />
            </section>
        </div>
    )
}

export default SearchPage