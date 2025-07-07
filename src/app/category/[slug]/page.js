import React from 'react'
import FilterBlock from '../../../lib/FilterBlock'
import ListingCards from '../../../components/ListingCardsSection/ListingCards'
import Pagination from '../../../lib/Pagination'
import ListingCardsSection from '../../../components/ListingCardsSection'
import BreadCrumbs from '../../../components/BreadCrumbs'
import CategoryIcons from '../../../components/Home/CategoryIcons'
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { use_get } from '../../../lib/functions'

async function fetchCategoryItems(id, page = 1) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?where[category.slug][equals]=${id}`+ page > 1 ? `&page=${page}` : '' })
    return res
}

async function fetchSubCategories(id) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/sub_categories?where[category.slug][equals]=${id}` })
    return res
}


const CategoryItemPage = async ({ params }) => {
    const id = await params?.slug

    const category_auctions = await fetchCategoryItems(id)
    const sub_catgeories = await fetchSubCategories(id)

    const docs = category_auctions?.docs || []
    const sub_catgeories_docs = sub_catgeories?.docs || []


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

    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 lg:my-8'>
                <CategoryIcons />
            </section>
            <section>
                <BreadCrumbs />
            </section>
            <section className='space-y-4'>
                <div className='flex items-center my-4 space-x-2'>
                    <BookOpenIcon className='w-12 h-12' />
                    <h1 className='font-semibold text-3xl capitalize lg:text-5xl'>{id.split("-").join(" ")}</h1>
                </div>
                <div className='grid py-4 grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4'>
                    {
                        sub_catgeories_docs.length > 0 ? sub_catgeories_docs.map((sub, i) => {
                            return (
                                <div key={i} className='cursor-pointer transition-colors duration-300 border-white/10 hover:bg-bright-400 grid grid-rows-[1fr_50px] bg-bright text-background aspect-video p-2 pb-0 rounded-xl lg:rounded-2xl'>
                                    <div></div>
                                    <div className='flex items-end py-2 text-start text-xs lg:text-sm px-2 font-medium'>{sub.title}</div>
                                </div>
                            )
                        })
                            :
                            [0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                                return (
                                    <div key={i} className='cursor-pointer transition-colors duration-300 border-white/10 hover:bg-bright-400 grid grid-rows-[1fr_30px] bg-bright text-background aspect-video p-2 pb-0 rounded-xl lg:rounded-2xl'>
                                        <div></div>
                                        <div className='text-end text-xs lg:text-sm text-nowrap px-2 font-medium'>Sub Category {i}</div>
                                    </div>
                                )
                            })
                    }
                </div>
            </section>
            <section className='my-16 border-b border-bright/10 pb-8'>
                <FilterBlock />
            </section>
            <section className='my-8 w-full'>
                <h4 className='font-bold text-xl text-nowrap my-4'>{category_auctions.totalDocs} Item(s)</h4>
                <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {

                        docs.length > 0 ? docs.map((doc, i) => {
                            return (
                                <ListingCards key={i} data={doc} user={doc.user} auction={doc} />
                            )
                        })
                            :
                            [0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                                return (
                                    <ListingCards key={i} />
                                )
                            })
                    }
                </section>
            </section>
            <section className='my-16'>
                <Pagination pagination={pagination} />
            </section>
            <section>
                <ListingCardsSection />
            </section>
        </div>
    )
}

export default CategoryItemPage