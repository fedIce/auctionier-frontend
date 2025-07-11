'use client'
import React, { useState } from 'react'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SearchModal } from '@/components/header/SearchWithCategory';
import { useRouter } from 'next/navigation';


const HomeSearch = () => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    return (
        <div className=' relative w-full h-fit'>
            <div onClick={() => setOpen(!open)} className='w-full h-full bg-secondary mx-4 lg:mx-0 flex space-x-2 items-center border border-bright/10 rounded-full px-4 py-2'>
                <MagnifyingGlassIcon className='w-5 h-5' />
                <input className='w-full' placeholder='Search...' />
            </div>
            <SearchModal router={router} setOpen={setOpen} open={open} />
        </div>
    )
}

export default HomeSearch