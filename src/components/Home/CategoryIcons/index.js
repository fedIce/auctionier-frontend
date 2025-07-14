'use client'
import React, { createRef, useEffect, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import * as Icons from "@heroicons/react/24/outline";
import { use_get } from '@/lib/functions';
import Link from 'next/link';


const get_categories = async () => {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?depth=1`, options: { cache: 'force-cache', revalidate: 3600 } });
    return res.docs || []
}

const CategoryIcons = () => {

    const scrollRef = createRef()
    const [scrollAmount, setScrollAmount] = useState(1)
    const [categories, setCategories] = useState([])

    useEffect(() => {
        get_categories().then((categories) => {
            setCategories(categories)
        }).catch((e) => {
            console.error("Error fetching categories:", e);
        })
    }, [])


    useEffect(() => {

    }, [scrollAmount])


    const scroll = (direction) => {
        const bgDropElement = document.getElementById("sroll");
        const { width } = bgDropElement.getBoundingClientRect();



        if (direction <= 0) return scrollRef.current.scrollTo({ left: 0, behavior: "smooth" })
        if (direction > width) return
        scrollRef.current.scrollTo({ left: direction, behavior: "smooth" })
        setScrollAmount(direction)
    }



    return (
        <div className='flex w-full flex-col space-y-2 px-2 text-foreground'>
            <div id="sroll" ref={scrollRef} className="flex px-2 lg:px-0 items-center justify-around overflow-x-auto space-x-4 lg:space-x-8 my-8 w-full  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {
                    categories?.length > 0 ?
                        categories.map((cat, i) => {
                            const Icon = Icons[cat.icon]
                            return (
                                <Link href={`/category/${cat.slug}`} key={i} className='flex max-w-24 min-w-24 space-y-2 flex-col items-center text-center justify-center'>
                                    <Icon className="w-7 h-7" />
                                    <p className='text-xs max-w-24 overflow-hidden truncate whitespace-nowrap'>{cat.category_name}</p>
                                </Link>
                            )
                        })
                        :
                        [0, 0, 0, 0, 0, 0, 0, 0]
                            .map((cat, i) => {
                                return (
                                    <div key={i} className='flex max-w-24 space-y-2 flex-col items-center text-center justify-center whitespace-nowrap'>
                                        <div className='w-7 lg:w-10 h-7 lg:h-10 bg-third/20 animate-pulse rounded-lg' />
                                        <div className='w-32 h-2 animate-pulse bg-third/20 rounded' />
                                    </div>
                                )
                            })
                }

            </div>
            {categories.length > 10 &&
                <div className='lg:flex hidden px-2 lg:px-0 w-full left-0 items-center justify-end space-x-2'>
                    {scrollAmount > 1 ? <div onClick={() => scroll(scrollAmount - 500)} className='border border-primary-300 rounded-full p-2 cursor-pointer'>
                        <ArrowLeftIcon className='w-6 h-6 text-primary-300' />
                    </div> : <div />}
                    <div onClick={() => scroll(scrollAmount + 500)} className='border border-primary-300 rounded-full p-2 cursor-pointer'>
                        <ArrowRightIcon className='w-6 h-6 text-primary-300' />
                    </div>
                </div>}
        </div>
    )
}

export default CategoryIcons