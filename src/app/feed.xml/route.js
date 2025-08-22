import RSS from "rss";
import { getSiteMetadata } from "../../lib/site";

export async function GET() {
    const metadata = await getSiteMetadata();
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const auctions = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?limit=0`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async res => {
        if (!res.ok) {
            throw new Error('Failed to fetch auctions');
        }
        const json = await res.json();
        return json.docs || [];
    });

    const feed = new RSS({
        title: metadata.title,
        description: metadata.description,
        feed_url: `${baseUrl}/feed.xml`,
        site_url: baseUrl,
        copyright: `${new Date().getFullYear()} ${metadata.title}`,
        language: metadata.language,
        pubDate: new Date(),

    })


    auctions.forEach((auction) => {
        feed.item({
            title: auction.title,
            description: auction.description,
            url: `${baseUrl}/auction/${auction.slug}`,
            guid: `${baseUrl}/auction/${auction.slug}`,
            date: new Date(auction.updatedAt),
            description: auction.description,
            categories: [auction.category || {}, auction.sub_category || {}],
            enclosure: auction.image && auction.image.length > 0 ? { url: `${process.env.NEXT_PUBLIC_SERVER_URL}${auction.image[0]?.sizes?.thumbnail?.url || auction.image[0]?.url || '/default-image.png'}` } : undefined,
        })
    })

    return new Response(feed.xml(), {
        headers: {
            "Content-Type": "application/atom+xml; charset=utf-8",
        },
    })
}