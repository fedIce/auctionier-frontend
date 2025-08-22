export const getSiteMetadata = () => {
  return {
    title: 'Garevl Bids',
    description: 'Garevl Bids is an online auction platform where you can buy and sell a wide variety of items, from electronics to collectibles. Join our community of bidders and sellers today!',
    siteurl: 'https://garvelbids.com',
    feedurl: 'https://garvelbids.com/feed.xml',
    copyright: '© 2023 Garvelbids',
    language: 'en-US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  }
}