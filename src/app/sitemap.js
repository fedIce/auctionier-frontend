
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
    priority: 1,
    changeFrequency: "daily",
  }));

  const privacy_policy = {
    url: `${baseUrl}/help/privacy-policy`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "yearly"
  }

  const about = {
    url: `${baseUrl}/help/about`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "yearly"
  }

  const contact = {
    url: `${baseUrl}/help/contact`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "yearly"
  }

  const faq = {
    url: `${baseUrl}/help/faq`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "yearly"
  }

  const newest = {
    url: `${baseUrl}/search?q=all&amp;sort=newest-first`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 1,
    changeFrequency: "daily"
  }

  const terms = {
    url: `${baseUrl}/help/terms-and-conditions`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "yearly"
  }

  const cookies = {
    url: `${baseUrl}/help/cookies`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "yearly"
  }

  const tosell = {
    url: `${baseUrl}/help/how-to-sell`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "monthly"
  }

  const selltips = {
    url: `${baseUrl}/help/tips`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "monthly"
  }

  const guides = {
    url: `${baseUrl}/help/submittion-guidelines`,
    lastModified: '2025-08-24T18:11:05.616Z',
    priority: 0.5,
    changeFrequency: "monthly"
  }



  const urls = [
    { url: '/', lastModified: new Date().toISOString(), priority: 1.0, changeFrequency: "daily" },
    ...auctionsUrls,
    privacy_policy,
    about,
    contact,
    faq,
    newest,
    terms,
    cookies,
    tosell,
    selltips,
    guides
  ];

  return urls;
}