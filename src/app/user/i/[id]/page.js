import React from 'react'
import FilterBlock from '../../../../lib/FilterBlock'
import ListingCards from '../../../../components/ListingCardsSection/ListingCards'
import Pagination from '../../../../lib/Pagination'
import ListingCardsSection from '../../../../components/ListingCardsSection'
import BreadCrumbs from '../../../../components/BreadCrumbs'
import Image from 'next/image'


const ViewPayables = () => {
    return (
        <div className='w-full py-8 px-2'>
            <section>
                <BreadCrumbs />
            </section>

            <div className='w-full my-8 flex items-start'>
                <section className='w-2/3 space-x-4 flex items-start '>
                    <div className='w-[40%] aspect-square bg-third' />
                    <div className='flex-1'>
                        <h4 className='text-3xl font-medium'>No Reserve Price - 2 pcs Diamond (Colour-treated) - 1.48 ct - Round Black - Not specified in lab report - Gem Report Antwerp (GRA)</h4>
                     </div>
                    {/* <Image src={`http://localhost:3001/${data.thumbnail.url}`} alt={data.thumbnail.alt} className='h-full transition-transform duration-300 hover:scale-125 object-cover' height={data.thumbnail.height} width={data.thumbnail.width} /> */}
                </section>
                <section className='w-1/3 h-12 bg-fuchsia-200 '></section>
            </div>
            <section className='my-8 w-full'>
                <h4 className='font-bold text-xl text-nowrap my-4'>Section Title</h4>
                <section className=' grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {
                        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                            return (
                                <ListingCards key={i} />
                            )
                        })
                    }
                </section>
            </section>
            <section className='my-16'>
                <Pagination />
            </section>
            <section>
                <ListingCardsSection />
            </section>
        </div>
    )
}

export default ViewPayables
// zziqKiLsBX6h4Rfg