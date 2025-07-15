import React from 'react'

import { use_get } from '../../lib/functions'
import SearchPageCOntent from './search'
import { generateQueryParams } from './func.js'
import Pagination from '../../lib/Pagination/index.js'

const searchCall = async (query) => {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items/search?search=${query}` })
    if (!res) {
        throw new Error('Failed to fetch data')
    }
    return res
}

const SearchEntryPage = async ({ searchParams }) => {

    const { q = '' } = searchParams
    const query = searchParams





    const searchResults = await searchCall(q + generateQueryParams(`&q=${q}`, query)).catch(() => {
        return { docs: [], aggs: [] }
    })

    const docs = searchResults?.docs || []


    const aggs = searchResults?.aggs[0] || {}
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
    } = searchResults

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



    return (
        <div className='w-full'>
            <SearchPageCOntent docs={docs} aggs={aggs} q={q} query={query} pagination={pagination} />
            <section className='my-16'>
                <Pagination pagination={pagination} />
            </section>
        </div>
    )
}

export default SearchEntryPage