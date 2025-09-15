import React from 'react'
import CategoryIcons from '../../components/Home/CategoryIcons'
import { use_get } from '../../lib/functions'
import SpecialCategoryCard from '../../components/SpecialCategoryCard'
import Link from 'next/link'

async function fetchAuctions() {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auctions` })
    return res
}

const Auctions = async () => {

    let auction = await fetchAuctions()
    const auctions = auction?.docs
    if (!auction) return null
    if (auctions?.docs?.length <= 0) return null


    return (
        <div className='w-full p-2'>
            <section className='space-y-2 lg:my-2'>
                <CategoryIcons />
            </section>
            <section className='space-y-4'>
                <h4 className='font-bold text-xl text-nowrap my-4'>{auction.totalDocs} Item(s)</h4>
                <div className='grid py-4 grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-4'>
                    {
                        auctions.map((sub, i) => {
                            const src = `${process.env.NEXT_PUBLIC_SERVER_URL}/${sub.verticalbannerImage?.sizes?.medium?.url}`
                            return (
                                <Link key={i} href={`/auctions/p/${sub.slug}`} className="w-full">
                                    <SpecialCategoryCard
                                        src={src}
                                        title={sub.title}
                                        slug={i.slug}
                                        endDate={sub.endDate}
                                        alt={sub.verticalbannerImage.alt}
                                    />
                                </Link>
                            )
                        })

                    }
                </div>
            </section>
        </div>

    )
}

export default Auctions