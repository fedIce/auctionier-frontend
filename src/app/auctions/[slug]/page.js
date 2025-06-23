import BreadCrumbs from '../../../components/BreadCrumbs'
import ImageAuctionItemview from '../../../components/ImageAuctionItemView'
import ActionArea from '../ActionArea'
import ListingCardsSection from '../../../components/ListingCardsSection'
import ImageCarouselSmallScreens from '../../../lib/ImageCarouselSmallScreens'
import { use_get } from '../../../lib/functions'
import { DetailsSection } from '../Details'
import { generate_crumbs } from '../../../lib/functions/util'




// export const metadata = {
//     title: `Auctioner | ${auction.title}`,
//     description: auction.description,
//     keywords: ['auction', ...auction.tag],
//     image: auction.image[0]
// }

async function fetchAuction(slug) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?where[slug][equals]=${slug}`, options: { cache: 'force-cache', next: { revalidate: 3600 } } })
    return res?.docs[0]
}

export default async function AuctionItem({ params }) {

    const { slug } = await params

    const auction = await fetchAuction(slug)

    if (!auction) return null

    const crumbs = generate_crumbs(auction.sub_category)


    return (
        <div className='w-full flex flex-col px-2 '>
            <BreadCrumbs crumbs={crumbs} />
            <div className='space-y-4  lg:px-0 pt-4 lg:pt-8 w-full'>
                <div className='text-3xl font-medium w-1/2 hidden lg:block'>{auction.title ?? ''}</div>
                <div className='flex flex-col lg:flex-row items-start flex-1 lg:space-x-4'>
                    <section className='flex-1 lg:w-1/2'>
                        <section className='w-full hidden lg:block'>
                            <ImageAuctionItemview images={auction.image} />
                        </section>
                        <section className='w-full block lg:hidden'>
                            <ImageCarouselSmallScreens images={auction.image} />
                        </section>
                        <DetailsSection data={auction} />
                    </section>
                    <section className='flex-1'>
                        <ActionArea data={auction} />
                    </section>
                </div>
            </div>
            <div className='w-full'>
                <ListingCardsSection />
            </div>

        </div>
    )
}


