'use client'

import moment from "moment/moment"
import { useState } from "react"

export const DetailsSection = ({data}) => {

    const [showAll, setShowAll] = useState(false)

    return (
        <section onClick={() => setShowAll(!showAll)} className={` relative w-full sh transition-[max-height] ${showAll ? ' max-h-[2000px] lg:max-h-max' : 'max-h-[200px] lg:max-h-max'} duration-500 ease-in-out overflow-hidden`}>

            <section className='w-full pt-4 lg:hidden text-sm'>
                <div className='text-secondary-100/40 font-extralight pr-2 flex items-center justify-between'>
                    <p>CURRENT BID</p>
                    <p>#3393912</p>
                </div>
            </section>
            <div className='text-xl mt-4 font-medium block lg:hidden'>{data.title}</div>

            <section className=' space-y-4  py-8'>
                <p>{data.description}</p>
            </section>
            <section className='border-t space-y-8 font-normal border-bright/10 py-8'>
                <h4 className='font-medium text-lg'>SHIPPING</h4>
                <section>
                    <h6 className='font-bold pb-1'>Shipping costs</h6>
                    <p>Shipping to Cyprus: € 55</p>
                    <p className='underline'>other destinations</p>
                </section>
                <section>
                    <p>Shipping costs are for mainland destinations only.</p>
                    <p className='underline'>More information</p>
                </section>
                <section>
                    <h6 className='font-bold pb-1'>Estimated delivery time</h6>
                    <p>Once you make your payment, the seller is required to ship your order within 3 working days.
                        Shipping to your location (Cyprus) from The Netherlands usually takes 4-25 days.
                        Can't be shipped with other objects
                        You're not able to combine shipping if you buy more than one object from the same seller in this auction.</p>
                </section>

                <section>
                    <h6 className='font-bold pb-1'>Return Policy</h6>
                    <p>We always recommend inspecting your object when it arrives. If it does not meet your expectations, please inform us within 3 calendar days of delivery and we’ll help find a solution. The delivery day counts as day 1.
                        If you buy from a professional seller, you can return your object for any reason within 14 calendar days after your object is delivered if you’re an EU, EEA or UK consumer.</p>
                    <p className='underline'>Read more about our return policy</p>

                </section>
                <section>
                    <h6 className='font-bold pb-1'>Collection Times</h6>
                    <p>All collections should be pre-booked.</p>
                </section>

                <section>
                    <h6 className='font-bold pb-1'>Payment Terms</h6>
                    <p>Payment needs to be paid within 24 hours of auction closing.</p>
                </section>

                <section>
                    <h6 className='font-bold pb-1'>Auction Information</h6>
                    <p>Designer Upholstery and Furniture Auction.</p>
                </section>

                <section>
                    <h6 className='font-bold pb-1'>Auction Terms & Conditions</h6>
                    <p>★ Premium Auction ★</p>
                </section>

                <section>
                    <h6 className='font-bold pb-1'>Auction Date</h6>
                    <p>Starts:{moment(data.startDate).format('llll')} <br />
                        Ends: {moment(data.endDate).format('llll')}</p>
                </section>
            </section>
            <div className={`w-full lg:hidden text-white font-sm h-32 bg-gradient-to-t ${showAll ? 'from-transparent' : 'from-background'} p-2 to-transparent absolute bottom-0 left-0 underline flex justify-start items-end`} >
                {showAll ? "Hide" : " show all"}
            </div>
        </section>

    )
}