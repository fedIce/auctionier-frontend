import React from 'react'
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import CheckBox from '../../components/CheckBox';


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

export const FilterControls = ({ aggs }) => {
    console.log(aggs)

    if (!aggs) return null;
    return (
        <div className="flex flex-col w-full max-w-[100%] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            {/* Reserve Price */}
            {
                Object.keys(aggs).map((key, i) => {
                    return (
                        <Block key={i} title={key} data={aggs[key]} />
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

const Block = ({ title, data }) => {

    console.log(title, data)
    return (
        <div className='w-full py-4'>
            <div className='flex items-center my-2 lg:my-4 space-x-2'>
                <h1 className='font-semibold text-lg capitalize'>{title.split('_').join(" ")}</h1>
            </div>
            <div className='flex flex-col space-y-2'>
                {
                    data?.map((item, i) => {
                        return (
                            <CheckBox key={i} title={`${title == 'reserve_price' ? String(item._id) : item.slug || item.condition} (${item.count})`} />

                        )
                    })
                }
            </div>
        </div>
    )
}