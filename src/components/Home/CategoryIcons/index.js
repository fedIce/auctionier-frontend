'use client'
import React, { createRef, useEffect, useState } from 'react'
import { ShoppingBagIcon, ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";


const CategoryIcons = () => {

    const scrollRef = createRef()
    const [scrollAmount, setScrollAmount] = useState(1)


    useEffect(() => {

    }, [scrollAmount])


    const scroll = (direction) => {
        const bgDropElement = document.getElementById("sroll");
        const { width } = bgDropElement.getBoundingClientRect();

        console.log(direction, width)


        if (direction <= 0) return scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        if (direction > width) return
        scrollRef.current.scrollTo({ left: direction, behavior: "smooth" })
        setScrollAmount(direction)
    }


    return (
        <div className='flex w-full flex-col space-y-2 px-2'>
            <div id="sroll" ref={scrollRef} className="flex px-2 lg:px-0 items-center overflow-x-auto space-x-4 lg:space-x-8 my-8 w-full  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {
                    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        .map((cat, i) => {
                            return (
                                <div key={i} className='flex max-w-24 space-y-2 flex-col items-center text-center justify-center whitespace-nowrap'>
                                    <ShoppingBagIcon className='w-7 lg:w-10 h-7 lg:h-10' />
                                    <p>Category {i}</p>
                                </div>
                            )
                        })
                }

            </div>
            <div className='lg:flex hidden px-2 lg:px-0 w-full left-0 items-center justify-end space-x-2'>
                {scrollAmount > 1 ? <div onClick={() => scroll(scrollAmount - 500)} className='border border-primary-300 rounded-full p-2 cursor-pointer'>
                    <ArrowLeftIcon className='w-6 h-6 text-primary-300' />
                </div> : <div />}
                <div onClick={() => scroll(scrollAmount + 500)} className='border border-primary-300 rounded-full p-2 cursor-pointer'>
                    <ArrowRightIcon className='w-6 h-6 text-primary-300' />
                </div>
            </div>
        </div>
    )
}

export default CategoryIcons