import React from 'react'
import { GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";


const helpfulLinks = [

    {
        title: 'About us',
        link: '#',
        slug: 'about_us'
    },
    {
        title: 'Contact us',
        link: '#',
        slug: 'contact_us'
    },
    {
        title: 'Help/FQAs',
        link: '#',
        slug: 'help'
    },
    {
        title: 'Newest lots',
        link: '#',
        slug: 'newest_lots'
    },
    {
        title: 'Popular Lots',
        link: '#',
        slug: 'popular_lots'
    }

]

const Policy_links = [
    {
        title: 'Terms and conditions',
        link: '#',
        slug: 'terms'
    },
    {
        title: 'Privacy Ploicy',
        link: '#',
        slug: 'privacy_policy'
    },
    {
        title: 'Cookie Ploicy',
        link: '#',
        slug: 'cookie_policy'
    }

]

const sell_links = [
    {
        title: 'How to Sell on Auctionier',
        link: '#',
        slug: 'how_to_sell'
    },
    {
        title: 'Sellers Tips',
        link: '#',
        slug: 'sellers tips'
    },
    {
        title: 'Submission Guidelines',
        link: '#',
        slug: 'submition_guidelines'
    }

]

const Footer = () => {
    return (
        <footer className="w-screen flex flex-col justify-center items-center pt-8 bg-secondary">
            <div className='max-w-7xl w-full grid grid-cols-2 justify-start items-start px-2 py-16 lg:grid-cols-4'>
                <div className='flex w-full items-center gap-2 mb-8'>
                    <div className='bg-background w-[40px] h-[40px] rounded-lg' />
                    <div className='grid grid-rows-2 gap-0.5'>
                        <h4 className='text-lg'>Auctioner</h4>
                        <p className='text-xs'>finders keepers</p>
                    </div>
                </div>
                <div className='space-y-2 mb-8'>
                    <h4 className='font-medium text-lg'>Helpful Links</h4>
                    <div className='flex flex-col space-y-1'>
                        {
                            helpfulLinks.map((link, i) => {
                                return <span key={i}>{link.title}</span>
                            })
                        }
                    </div>
                </div>
                <div className='space-y-2 mb-8'>
                    <h4 className='font-medium text-lg'>Policies</h4>
                    <div className='flex flex-col space-y-1'>
                        {
                            Policy_links.map((link, i) => {
                                return <span key={i}>{link.title}</span>
                            })
                        }
                    </div>
                </div>
                <div className='space-y-2 mb-8'>
                    <h4 className='font-medium text-lg'>Sell</h4>
                    <div className='flex flex-col space-y-1'>
                        {
                            sell_links.map((link, i) => {
                                return <span key={i}>{link.title}</span>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='w-full h-16 flex justify-center  border-t px-2 border-white/10 bg-secondary-800'>
                <div className='max-w-7xl h-full w-full flex items-center justify-between'>
                    <div className='flex items-center h-full space-x-1'>
                        <GlobeEuropeAfricaIcon className='w-5 h-5' />
                        <span className='underline'>English</span>
                    </div>
                    <div>
                        <span className=' text-nowrap'>© 2025</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer