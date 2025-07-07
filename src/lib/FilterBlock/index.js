'use client'
import React, { use } from 'react'
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Block } from './Block';


const FilterBlock = () => {
    return (
        <div className="flex items-center space-x-3 max-w-[100%] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <FilterItem reverse >
                <XMarkIcon className='w-4 h-4' />
            </FilterItem>
            {
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => {
                    return <FilterItem key={i} >
                        <ChevronDownIcon className='w-4 h-4' />
                    </FilterItem>
                })
            }
        </div>
    )
}

export default FilterBlock

export const FilterItem = ({ children, text="Filter", reverse = false, onClick = () => null }) => {
    return (
        <div onClick={onClick} className={`flex min-w-24 bg-bright text-sm cursor-pointer text-background rounded-full space-x-2 py-2 px-4 items-center justify-between ${reverse ? 'flex-row-reverse' : ''}`}>
            <p>{text}</p>
            <div>
                {children}
            </div>
        </div>
    )
}

export const FilterControls = ({ aggs, query }) => {
    console.log(aggs)

    if (!aggs) return null;
    return (
        <div className="flex flex-col w-full max-w-[100%] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {/* Reserve Price */}
            {
                Object.keys(aggs).map((key, i) => {
                    return (
                        <Block key={i} title={key} data={aggs[key]} query={query} />
                    )
                })
            }
            {/* Auction End Date */}
            {/* Auction - */}
            {/* Category/ Sub Category - */}
            {/* Auction Type - */}
            {/* Brand - */}
            {/* Condition - */}
            {/* Condition Rating  - */}
            {/* Seller */}
        </div>
    )
}

