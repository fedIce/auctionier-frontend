
export default async function sitemap() {
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

  const auctionsUrls = auctions.map((auction) => ({
    url: `${baseUrl}/auctions/${auction.slug}`,
    lastModified: new Date(auction.updatedAt).toISOString(),
    priority: 0.9,
    changeFrequency: "daily",
  }));


  const urls = [
    { url: '/', lastModified: new Date().toISOString(), priority: 1.0, changeFrequency: "daily"},
    ...auctionsUrls
  ];

  return urls;
}