import React, { useState } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'


const SearchWithCategory = () => {

    const router = useRouter()

    return (
        <div>
            <div className='hidden lg:flex h-full items-center space-x-5 py-2 w-full'>
                <CategoriesDrop />
                <SearchBar router={router} />
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

export const SearchBar = ({ router }) => {
    const [search, setSearch] = useState('')

    const onSearch = () => {
        if (search.trim() === '') return
        // Perform search action here, e.g., redirect to search results page
        router.replace('/search?q=' + encodeURIComponent(search.trim()))
        setSearch('')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch()
        }
    }

    return (
        <div className='w-full h-full bg-background flex items-center gap-2 rounded-full px-4 py-2'>
            <MagnifyingGlassIcon className='w-5 h-5' />
            <input
                className='w-full ring-0 outline-0'
                placeholder='Search...'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}