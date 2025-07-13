
import NoItemsFound from '../../../components/NoItemsFound'
import { use_get } from '../../../lib/functions'
import { generateQueryParams } from '../../search/page'
import CategoryPage from './CategoryPage'

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



    const category_auctions = await fetchCategoryItems(id + generateQueryParams('',query))
    const sub_catgeories = await fetchSubCategories(id)

    const docs = category_auctions?.docs || []


    if (docs.length <= 0) {
        return (<NoItemsFound/>)
    }


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

    return <CategoryPage id={id} sub_catgeories_docs={sub_catgeories_docs} docs={docs} aggs={aggs[0]} crumbs={_} pagination={pagination} />
}

export default CategoryItemPage