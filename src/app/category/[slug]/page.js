
import { Suspense } from 'react'
import { use_get } from '../../../lib/functions'
import CategoryPage from './CategoryPage'
import { generateQueryParams } from '../../search/func'

async function fetchCategoryItems(id) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/t/category?queryslug=${id}` }).catch(e => {
        console.error('Error fetching search results:', e)
        return { docs: [], aggs: [] }
    })
    return res
}

async function fetchSubCategories(id) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sub_categories?where[category.slug][equals]=${id}` })
    return res
}




const CategoryItemPage = async ({ params, searchParams }) => {
    const p = await params
    const id = await p?.slug
    const query = await searchParams



    const category_auctions = await fetchCategoryItems(id + generateQueryParams('', query))
    const sub_catgeories = await fetchSubCategories(id)

    const docs = category_auctions?.docs || []


    const sub_catgeories_docs = sub_catgeories?.docs || []
    const aggs = category_auctions?.aggs || []

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
    } = category_auctions

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

    const _ = [
        {
            title: "Home",
            link: "/",
            description: "Auctionier home page"
        },
        {

            title: id.split("-").join(" "),
            link: `/category/${id}`,
            description: ''
        }
    ]

    // const Icon = Icons[]

    return (
        <Suspense fallback={
            <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

                {[0, 0, 0, 0].map((_, i) => {
                    return (
                        <div key={i} className={`w-full min-w-64 min-h-80 bg-third-300 rounded-lg animate-pulse`} >
                            {/* Section Card */}
                        </div >
                    )
                })}

            </section>
        }>
            <CategoryPage id={id} sub_catgeories_docs={sub_catgeories_docs} docs={docs} aggs={aggs[0]} crumbs={_} pagination={pagination} />
        </Suspense>
    )
}

export default CategoryItemPage