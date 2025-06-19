import React from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'


const SearchWithCategory = () => {
    return (
        <div>
            <div className='hidden lg:flex h-full items-center space-x-5 py-2 w-full'>
                <CategoriesDrop />
                <SearchBar />
            </div>
            <span className='lg:hidden'>
                <MagnifyingGlassIcon className='w-5 h-5 text-bright' />
            </span>
        </div>
    )
}

export default SearchWithCategory


export const CategoriesDrop = ({ className }) => {
    return (
        <div className={`flex items-center space-x-1 ${className}`}>
            <span>Categories</span>
            <span><ChevronDownIcon className='w-4 h-4' /></span>
        </div>
    )
}

export const SearchBar = () => {
    return (
        <div className='w-full h-full bg-background flex items-center gap-2 rounded-full px-4 py-2'>
            <MagnifyingGlassIcon className='w-5 h-5' />
            <input className='w-full' placeholder='Search...' />
        </div>
    )
}