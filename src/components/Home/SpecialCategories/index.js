import React from 'react'
import SpecialCartegoryCard from '../../SpecialCategoryCard'
import Link from 'next/link'

const Specialcategories = () => {
    return (
        <Link href='/auctions/1'>
            <div className="mt-12 lg:mt-18 space-y-4 w-full px-2 lg:px-0">
                <div className="font-bold text-2xl">Categories</div>
                <div className=" flex space-x-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] lg:overflow-y-hidden items-center lg:grid lg:grid-cols-4 lg:gap-4">
                    {
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
        </Link>
    )
}

export default Specialcategories