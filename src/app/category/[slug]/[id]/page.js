import React, { Suspense } from 'react'
import SubCategoryEntry from './SubCategoryEntry'
import SearchPageloading from '../../../../components/SearchPageLoading'

const SubCategory = async ({ params, searchParams }) => {
    return (
        <Suspense fallback={
            <SearchPageloading category />
        }>
            <SubCategoryEntry params={params} searchParams={searchParams} />
        </Suspense>
    )
}

export default SubCategory