'use client'
import React, { createRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';


const ImageCarouselSmallScreens = ({ images }) => {


    const scrollRef = createRef()
    const [scrollAmount, setScrollAmount] = useState(1)



    const scroll = (direction) => {

        if (direction <= 0) return scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        if (direction > (600 * images?.length)) return
        scrollRef.current.scrollTo({ left: direction, behavior: "smooth" })
        setScrollAmount(direction)
    }

    if (!images?.length > 0) return <ImageCarouselSmallScreensLoading />


    return (
        <div className='flex relative space-y-4 overflow-hidden w-full flex-col justify-start mt-8 lg:mt-16 mb-4 lg:mb-8 items-start'>
            <div className='flex absolute bottom-0 right-0 w-full items-center justify-between'>
                <div className='flex px-2 lg:px-0 w-full left-0 items-center justify-end space-x-2'>
                    {scrollAmount > 1 ? <div onClick={() => scroll(scrollAmount - 600)} className='rounded-full p-2 cursor-pointer'>
                        <ChevronLeftIcon className='w-4 h-4 text-primary-300' />
                    </div> : <div />}
                    <div onClick={() => scroll(scrollAmount + 600)} className='rounded-full p-2 cursor-pointer'>
                        <ChevronRightIcon className='w-4 h-4 text-primary-300' />
                    </div>
                </div>
            </div>
            <div className='p-2 bg-black/70 absolute top-5 right-5 text-sm'>{Math.floor(scrollAmount/600) + 1}/{images.length}</div>
            <div id="list_cards_sroll" ref={scrollRef} className="max-w-[98vw] flex flex-nowrap items-center space-x-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {
                    images?.map((image, i) => {
                        return (
                            <div key={i} style={{ minWidth: 600, maxHeight: 400 }} className='bg-third w-full h-full' >
                                <Image className='w-[600px] h-[400px] object-cover' src={`http://localhost:3001/${image.url}`} width={image.width} height={image.height} alt={image.alt} />
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default ImageCarouselSmallScreens


const ImageCarouselSmallScreensLoading = () => {

    const scrollRef = createRef()
    const [scrollAmount, setScrollAmount] = useState(1)



    const scroll = (direction) => {

        if (direction <= 0) return scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        if (direction > (600 * 5)) return
        scrollRef.current.scrollTo({ left: direction, behavior: "smooth" })
        setScrollAmount(direction)
    }


    return (
        <div className='flex relative space-y-4 overflow-hidden w-full flex-col justify-start mt-8 lg:mt-16 mb-4 lg:mb-8 items-start'>
            <div className='flex absolute bottom-0 right-0 w-full items-center justify-between'>
                <div className='flex px-2 lg:px-0 w-full left-0 items-center justify-end space-x-2'>
                    {scrollAmount > 1 ? <div onClick={() => scroll(scrollAmount - 500)} className='rounded-full p-2 cursor-pointer'>
                        <ChevronLeftIcon className='w-4 h-4 text-primary-300' />
                    </div> : <div />}
                    <div onClick={() => scroll(scrollAmount + 500)} className='rounded-full p-2 cursor-pointer'>
                        <ChevronRightIcon className='w-4 h-4 text-primary-300' />
                    </div>
                </div>
            </div>
            <div id="list_cards_sroll" ref={scrollRef} className="max-w-[98vw] flex flex-nowrap items-center space-x-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {
                    [0, 0, 0, 0, 0].map((_, i) => {
                        return (
                            <div key={i} style={{ minWidth: 600, minHeight: 400 }} className='bg-third animate-pulse' />
                        )
                    })
                }
            </div>

        </div>
    )
}