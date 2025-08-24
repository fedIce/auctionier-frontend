import { Suspense } from "react"
import AuctionItemEntry, { fetchAuction } from "./AuctionItemEntry"
import AuctionItemLoadingPage from "./AuctionItemLoadingPage"


export const generateMetadata = async ({ params }) => {
    const { slug } = await params

    const auction = await fetchAuction(slug)
    if (!auction) return null

    return {
        title: auction.title,
        description: auction.description,
        openGraph: {
            title: auction.title,
            description: auction.description,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_SERVER_URL}${auction.image[0]?.sizes?.thumbnail?.url || auction.image[0]?.url || '/default-image.png'}`,
                    width: auction.image[0]?.sizes?.thumbnail?.width || auction.image[0]?.width || 600,
                    height: auction.image[0]?.sizes?.thumbnail?.height || auction.image[0]?.height || 600,
                    alt: auction.image[0]?.sizes?.thumbnail?.alt || auction.image[0]?.alt || 'Auction Image'
                }
            ],
            type: 'website',
            url: `${process.env.NEXT_PUBLIC_APP_URL}/auctions/${slug}`
        },
        twitter: {
            card: 'summary_large_image',
            title: auction.title,
            description: auction.description,
            images: [
                `${process.env.NEXT_PUBLIC_SERVER_URL}${auction.image[0]?.sizes?.thumbnail?.url || auction.image[0]?.url || '/default-image.png'}`,
            ]
        },
        robots: {
            index: true,
            follow: true
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_APP_URL}/auctions/${slug}`
        },

    }
}


export default async function AuctionItem({ params }) {

    const { slug } = await params

    return (
        <Suspense fallback={
            <AuctionItemLoadingPage />
        }>
            <AuctionItemEntry slug={slug} />
        </Suspense>
    )
}


