import React from 'react'

import { use_get } from '../../../../lib/functions'
import SubCategoryPage from '../SubCategoryPage'
import { generateQueryParams } from '../../../search/func'



async function fetchCategoryItems(id) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories/t/sub_category?queryslug=${id}`, options: { revalidate: 0 } })
    return res
}

const SubCategory = async ({ params, searchParams }) => {

    const id = await params?.id
    const category = await params?.slug
    const query = await searchParams


    const category_auctions = await fetchCategoryItems(id + generateQueryParams('', query))
    const docs = category_auctions?.docs || []

    const aggs = category_auctions?.aggs || []

    const _ = [
        {
            title: "Home",
            link: "/",
            description: "Auctionier home page"
        },
        {

            title: category.split("-").join(" "),
            link: `/category/${category}`,
            description: ''
        },
        {

            title: id.split("-").join(" "),
            link: `/category/${category}/${id}`,
            description: ''
        }
    ]


    return <SubCategoryPage id={id} aggs={aggs[0]} docs={docs} category={category} crumbs={_} />
}

export default SubCategory