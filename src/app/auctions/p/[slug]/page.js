import React from 'react'
import FilterBlock from '../../../../lib/FilterBlock'
import ListingCards from '../../../../components/ListingCardsSection/ListingCards'
import Pagination from '../../../../lib/Pagination'
import ListingCardsSection from '../../../../components/ListingCardsSection'
import CategoryIcons from '../../../../components/Home/CategoryIcons'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import { use_get } from '../../../../lib/functions'
import Image from 'next/image'
import { generate_crumbs } from '../../../../lib/functions/util'



const fetchAuctionItems = async (id) => {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?where[auction.slug][equals]=${id}&depth=2` })
    return res
}




const SubCategoryPage = async ({ params }) => {
    const id = await params?.slug
    const auctions_items = await fetchAuctionItems(id)
    const docs = auctions_items?.docs || []
    const auction = docs[0].auction || {}

    const _ = [
        {
            title: "Home",
            link: "/",
            description: "Auctionier home page"
        },
        {
            
            title: auction.title,
            link: `/auctions/p/${auction.slug}`,
            description: auction.description
        }
    ]


    console.log(auctions_items)
    return (
        <div className='w-full py-8 px-2'>
            <section className='space-y-2 lg:my-8'>
                <CategoryIcons />
            </section>
            <section>
                <BreadCrumbs crumbs={_} />
            </section>
            <section className='w-full py-4'>
                <div className='w-full h-64 rounded-2xl bg-third' >
                    <Image src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${auction.horizontalbannerImage?.url || ''}`} alt={auction.horizontalbannerImage?.alt || 'Auction Banner'} className='w-full h-full object-cover rounded-2xl' height={auction.horizontalbannerImage?.height || 400} width={auction.horizontalbannerImage?.width || 600} />
                </div>
            </section>
            <div className='flex items-center my-2 lg:my-4 space-x-2'>
                <h1 className='font-semibold text-3xl lg:text-5xl'>{auction.title}</h1>
            </div>
            <section className='my-8 lg:my-16 border-b border-bright/10 pb-8'>
                <FilterBlock />
            </section>
            <section className='my-8 w-full'>
                <h4 className='font-bold text-xl text-nowrap my-4'>{auctions_items.totalDocs} Item(s)</h4>
                <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
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

export default SubCategoryPage