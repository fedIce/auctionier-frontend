import React, { Suspense } from 'react'

import { use_get } from '../../../../lib/functions'
import AuctionsPage from './AuctionsPage'
import { generateQueryParams } from '../../../search/func'
import AuctionsEntryPage from './AuctionsEntryPage'
import SearchPageloading from '../../../../components/SearchPageLoading'



const Auctions = async ({ params, searchParams }) => {

    return (
        <Suspense fallback={
            <SearchPageloading category auction />
        }>
            <AuctionsEntryPage params={params} searchParams={searchParams} />
        </Suspense>
    )
}

export default Auctions