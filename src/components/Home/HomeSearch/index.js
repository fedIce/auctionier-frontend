import React from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";


const HomeSearch = () => {
    return (
        <div className='w-full h-full bg-secondary mx-4 lg:mx-0 flex space-x-2 items-center border border-bright/10 rounded-full px-4 py-2'>
            <MagnifyingGlassIcon className='w-5 h-5' />
            <input className='w-full' placeholder='Search...' />
        </div>
    )
}

export default HomeSearch