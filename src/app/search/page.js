import React from 'react'

import { use_get } from '../../lib/functions'
import SearchPageCOntent from './search'

export const generateQueryParams = (base = '', query) => {
    let _query = ''
    Object.keys(query).forEach(key => {
        if (Array.isArray(query[key]) && query[key].length > 1) {
            query[key].forEach((val) => {
                _query += `&${key}=${val}`
                console.log(`&${key}=${val}`)
            })
        } else {
            _query += `&${key}=${query[key]}`
        }
    })
    return _query.split(base).join('')
}

const searchCall = async (query) => {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items/search?search=${query}` })
    if (!res) {
        throw new Error('Failed to fetch data')
    }
    return res
}

const SearchPage = async ({ searchParams }) => {

    const { q = '' } = await searchParams
    const query = await searchParams




    console.log('Search Query:', generateQueryParams(`&q=${q}`, query))

    const searchResults = await searchCall(q + generateQueryParams(`&q=${q}`, query)).catch(e => {
        console.error('Error fetching search results:', e)
        return { docs: [], aggs: [] }
    })

    const docs = searchResults?.docs || []
    const aggs = searchResults?.aggs[0] || {}
    console.log('Search Results:', searchResults)
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

    console.log(searchResults)


    return <SearchPageCOntent docs={docs} aggs={aggs} q={q} query={query} pagination={pagination} />
}

export default SearchPage