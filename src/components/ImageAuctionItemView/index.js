'use client'
import React, { createRef, useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from 'next/image';
import { NO_SCROLL } from '../../lib/functions/util';


const ImageAuctionItemview = ({ images }) => {

    if (!images?.length > 0) return <ImageAuctionItemviewLoader />

    const scrollRef = createRef()
    const miniscrollRef = createRef()
    const [scrollAmount, setScrollAmount] = useState(1)



    const scroll = (direction) => {

        if (direction <= 0) return scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        if (direction > (600 * images.length)) return
        scrollRef.current.scrollTo({ left: direction, behavior: "smooth" })
        miniscrollRef.current.scrollTo({ left: direction/6, behavior: "smooth" })
        setScrollAmount(direction)
    }

    return (
        <div className='w-full space-y-1 h-auto flex- flex-col'>
            <div className={`w-full h-[60vh] rounded-xl relative`}>
                <div id="list_cards_sroll" ref={scrollRef} className={`w-full h-full flex rounded-xl overflow-hidden items-center space-x-2  justify-start overflow-x-auto ${NO_SCROLL}`} >
                    {
                        images?.map((image, i) => {
                            return (
                                <div key={i} className='bg-secondary-400 h-full overflow-hidden min-w-[600px] rounded' >
                                    <Image className='w-full h-full object-cover' src={`http://localhost:3001/${image.url}`} width={image.width} height={image.height} alt={image.alt} />
                                </div>
                            )
                        })
                    }
                </div>
                <div className='p-2 bg-black/70 absolute top-5 right-5 text-sm'>{Math.floor(scrollAmount / 600) + 1}/{images.length}</div>
                <div className='flex absolute top-[50%] px-2 w-full left-0 items-center justify-between space-x-2'>
                    {scrollAmount > 1 ? <div onClick={() => scroll(scrollAmount - 500)} className='rounded-full p-2 cursor-pointer'>
                        <ChevronLeftIcon className='w-5 h-5 text-primary-300' />
                    </div> : <div />}
                    <div onClick={() => scroll(scrollAmount + 500)} className='rounded-full p-2 cursor-pointer'>
                        <ChevronRightIcon className='w-5 h-5 text-primary-300' />
                    </div>
                </div>

            </div>
            {
                images.length > 0 ?
                    <div ref={miniscrollRef} className={`flex w-full items-center overflow-x-auto space-x-1  ${NO_SCROLL}`}>
                        {
                            images.map((image, i) => {
                                return (
                                    <div key={i} className={`min-w-1/6 aspect-square border ${i == Math.floor(scrollAmount / 600) ? 'border-white': 'border-transparent'} overflow-hidden bg-secondary-400 rounded-xl`}>
                                        <Image className={`w-full h-full object-cover transition-all duration-300 ${i == Math.floor(scrollAmount / 600) ? '': 'blur-lg'} `} src={`http://localhost:3001/${image.url}`} width={image.width} height={image.height} alt={image.alt} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className='flex items-center space-x-1'>
                        <div className='w-1/4 aspect-square bg-secondary-400 rounded-xl'></div>
                        <div className='w-1/4 aspect-square bg-secondary-400 rounded-xl'></div>
                        <div className='w-1/4 aspect-square bg-secondary-400 rounded-xl'></div>
                        <div className='w-1/4 aspect-square bg-secondary-400 rounded-xl'></div>
                    </div>
            }
        </div>
    )
}

export default ImageAuctionItemview


const ImageAuctionItemviewLoader = () => {
    return (
        <div className='w-full space-y-1 h-auto flex- flex-col'>
            <div className='w-full h-[60vh] bg-secondary-400 animate-pulse rounded-xl'>

                <div className='flex relative top-[50%] px-2 w-full left-0 items-center justify-between space-x-2'>
                    <div className='rounded-full p-2 cursor-pointer'>
                        <ChevronLeftIcon className='w-5 h-5 text-primary-300' />
                    </div>
                    <div className='rounded-full p-2 cursor-pointer'>
                        <ChevronRightIcon className='w-5 h-5 text-primary-300' />
                    </div>
                </div>

            </div>
            <div className='flex items-center space-x-1'>
                <div className='w-1/4 aspect-square bg-secondary-400 animate-pulse rounded-xl'></div>
                <div className='w-1/4 aspect-square bg-secondary-400 animate-pulse rounded-xl'></div>
                <div className='w-1/4 aspect-square bg-secondary-400 animate-pulse rounded-xl'></div>
                <div className='w-1/4 aspect-square bg-secondary-400 animate-pulse rounded-xl'></div>

            </div>
        </div>
    )
}
