import React from 'react'
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";


const FilterBlock = () => {
    return (
        <div className="flex items-center space-x-3 max-w-[100%] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <FilterItem  reverse >
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

const FilterItem = ({ children, reverse = false }) => {
    return (
        <div className={`flex min-w-24 bg-bright text-background rounded-full py-2 px-4 items-center justify-between ${reverse ? 'flex-row-reverse' : ''}`}>
            <p>Filter</p>
            <div>
                {children}
            </div>
        </div>
    )
}