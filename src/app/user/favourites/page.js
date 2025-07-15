'use client'
import React, { useEffect, useState } from 'react'
import ListingCards from '../../../components/ListingCardsSection/ListingCards'
import ListingCardsSection from '../../../components/ListingCardsSection'
import BreadCrumbs from '../../../components/BreadCrumbs'
import { use_get } from '../../../lib/functions'
import { useAuth } from '../../../contexts/auth'
import { fetchWatches } from '../../category/[slug]/CategoryPage'
import { FilterItem } from '../../../lib/FilterBlock'


const SubCategoryPage = () => {

    const auth = useAuth()
    const user = auth.user?.user
    const [favs, setFavs] = useState([])
    const [watches, setWatches] = useState([])
    const [watched, setWatched] = useState([])
    const [page, setPage] = useState('bids')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) load().then(() => {
            setLoading(false)
        })
    }, [user])

    useEffect(() => { }, [favs, watched, loading])

    useEffect(() => {
        fetchWatches([...favs, ...watched]?.map(i => i.id)).then(res => {
            setWatches(res)
        })
    }, [favs, watched])




    const load = async () => {
        setLoading(true)
        const bids = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bid_item/watch-list/${user.id}`, options: { revalidate: 0 } })
        const watcs = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/watchers?where[user][equals]=${user.id}`, options: { revalidate: 0 } })
        const watc_docs = await await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?where[id][in]=${watcs.docs.map(i => i.auction_item.id)}`, options: { revalidate: 0 } })
        setFavs(bids.docs)
        setWatched(watc_docs.docs)
        return
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

    const userWatches = new Set(watches.map(i => user.id == i.user && i.auction_item))

    return (
        <div className='w-full py-8 px-2'>

            <section className='w-full'>
                <section>
                    <BreadCrumbs crumbs={breadcrumb} />
                </section>
                <div className='flex items-center my-4 space-x-2'>
                    <h1 className='font-semibold text-3xl lg:text-5xl'>Watch List</h1>
                </div>
                <section className='my-4 flex items-center space-x-2 lg:my-16 border-b border-bright/10 pb-8'>
                    <FilterItem active={page == 'bids'} onClick={() => setPage('bids')} text='Bids' ><p>{`(${favs?.length || 0})`}</p></FilterItem>
                    <FilterItem active={page == 'watch'} onClick={() => setPage('watch')} text={`Watched Items`} ><p>{`(${watched?.length || 0})`}</p></FilterItem>
                </section>
                {
                    loading ?
                        <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>

                            {[0, 0, 0, 0].map((_, i) => {
                                return (
                                    <ListingCards pulse key={i} />
                                )
                            })}

                        </section>
                        :
                        <section className='my-8 w-full'>
                            <h4 className='font-bold text-xl text-nowrap my-4'>{favs?.length ?? 0} Item(s)</h4>
                            {
                                page == 'bids' ? <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                    {
                                        favs?.length <= 0 ?
                                            <div>
                                                <span className='text-secondary'>No items found.</span>
                                            </div>
                                            :
                                            favs?.map((item, i) => {
                                                return (
                                                    <ListingCards watches={userWatches} watchCount={watches} key={i} data={item} user={user} />
                                                )
                                            })
                                    }
                                </section>
                                    :
                                    <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                                        {
                                            watched?.length <= 0 ?
                                                <div>
                                                    <span className='text-secondary'>No items found.</span>
                                                </div>
                                                :
                                                watched?.map((item, i) => {
                                                    return (
                                                        <ListingCards watches={userWatches} watchCount={watches} key={i} data={item} user={user} />
                                                    )
                                                })
                                        }
                                    </section>}
                        </section>
                }

                <section>
                    <ListingCardsSection />
                </section>
            </section>
        </div>
    )
}

export default SubCategoryPage