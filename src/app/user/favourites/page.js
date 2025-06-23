'use client'
import React, { useEffect, useState } from 'react'
import ListingCards from '../../../components/ListingCardsSection/ListingCards'
import ListingCardsSection from '../../../components/ListingCardsSection'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { use_get } from '../../../lib/functions'
import { useAuth } from '../../../contexts/auth'


const SubCategoryPage = () => {

    const auth = useAuth()
    const user = auth.user?.user
    const [favs, setFavs] = useState(null)

    useEffect(() => {
        if (user) load()
    }, [user])

    useEffect(() => { }, [favs])

    const load = async () => {
        const bids = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bid_item/watch-list/${user.id}` })
        setFavs(bids.docs)
    }

    const breadcrumb = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Favourites',
            link: '/favourites'
        }
    ]


    return (
        <div className='w-full py-8 px-2'>
            <section>
                <BreadCrumbs crumbs={breadcrumb} />
            </section>
            <div className='flex items-center my-4 space-x-2'>
                <h1 className='font-semibold text-3xl lg:text-5xl'>Watch List</h1>
            </div>
            {/* <section className='my-4 lg:my-16 border-b border-bright/10 pb-8'>
                <FilterBlock />
            </section> */}
            <section className='my-8 w-full'>
                <h4 className='font-bold text-xl text-nowrap my-4'>{favs?.length ?? 0} Item(s)</h4>
                <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {
                        favs?.length <= 0 ?
                            <div>
                                <span className='text-secondary'>No items found.</span>
                            </div>
                            :
                            favs?.map((item, i) => {
                                return (
                                    <ListingCards key={i} data={item} user={user} />
                                )
                            })
                    }
                </section>
            </section>
            <section>
                <ListingCardsSection />
            </section>
        </div>
    )
}

export default SubCategoryPage