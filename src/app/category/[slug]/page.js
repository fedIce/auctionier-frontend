
import { Suspense } from 'react'
import { use_get } from '../../../lib/functions'
import CategoryPage from './CategoryPage'
import { generateQueryParams } from '../../search/func'
import SearchPageloading from '../../../components/SearchPageLoading'
import CategoryEntryItemPage from './CategoryEntryPage'




const CategoryItemPage = async ({ params, searchParams }) => {

    return (
        <Suspense fallback={
            <SearchPageloading category subcategory />
        }>
            <CategoryEntryItemPage params={params} searchParams={searchParams} />
        </Suspense>
    )
}

export default CategoryItemPage