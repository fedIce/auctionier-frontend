import React from 'react'
import SpecialCartegoryCard from '../../SpecialCategoryCard'
import Link from 'next/link'
import { use_get } from '@/lib/functions'

async function fetchAuctions() {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auctions` })
    return res
}

const Specialcategories = async () => {

    let auctions = await fetchAuctions()
    console.log(auctions)
    auctions = auctions?.docs
    if (!auctions) return null
    if (auctions?.docs?.length <= 0) return null

    return (

        <div className="mt-12 lg:mt-18 space-y-4 w-full px-2 lg:px-0">
            <div className="font-bold text-2xl text-foreground">Auctions</div>
            <div className=" flex space-x-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] lg:overflow-y-hidden items-center lg:grid lg:grid-cols-4 lg:gap-4">
                {
                    auctions?.length > 0 ?
                        auctions.map((i, index) => {
                            return (
                                <Link key={index} href={`/auctions/p/${i.slug}`} className="w-full">
                                    <SpecialCartegoryCard

                                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/${i.verticalbannerImage?.sizes?.medium?.url}`}
                                        title={i.title}
                                        slug={i.slug}
                                        endDate={i.endDate}
                                        alt={i.verticalbannerImage.alt}
                                    />
                                </Link>
                            )
                        })
                        :
                        [
                            "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            "https://images.pexels.com/photos/4210339/pexels-photo-4210339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            "https://images.pexels.com/photos/30758149/pexels-photo-30758149/free-photo-of-professional-video-camera-held-against-orange-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                            "https://images.pexels.com/photos/3550484/pexels-photo-3550484.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        ].map((i, index) => {
                            return (
                                <SpecialCartegoryCard key={index} src={i} />
                            )
                        })
                }
            </div>
        </div>

    )
}

export default Specialcategories