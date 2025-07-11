import React, { useEffect, useState } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { use_get } from '@/lib/functions'
import * as Icons from "@heroicons/react/24/outline";
import Link from 'next/link';



const SearchWithCategory = () => {

    const router = useRouter()
    const [open, setOpen] = useState(false)

    return (
        <div>
            <div className='hidden lg:flex h-full items-center space-x-5 py-2 w-full'>
                <CategoriesDrop />
                <SearchBar router={router} />
            </div>
            <span className='lg:hidden'>
                <MagnifyingGlassIcon onClick={() => setOpen(!open)} className='w-5 h-5 text-bright' />
                <SearchModal router={router} setOpen={setOpen} open={open} />
            </span>

        </div>
    )
}

export default SearchWithCategory


export const CategoriesDrop = ({ className }) => {
    const router = useRouter()
    const [open, setOpen] = useState(false)
    return (
        <div className='relative'>
            <div onClick={() => setOpen(!open)} className={`flex cursor-pointer items-center space-x-1 ${className}`}>
                <span>Categories</span>
                <span><ChevronDownIcon className='w-4 h-4' /></span>
            </div>
            <CategoryModal router={router} setOpen={setOpen} open={open} />
        </div>
    )
}

export const SearchBar = ({ router, closeModal = null, focus = false }) => {
    const [search, setSearch] = useState('')

    const onSearch = () => {
        if (search.trim() === '') return
        // Perform search action here, e.g., redirect to search results page
        router.replace('/search?q=' + encodeURIComponent(search.trim()))
        setSearch('')
        if (closeModal) {
            closeModal(false)
        }
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
                autoFocus={focus}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}

export const SearchModal = ({ setOpen, open, router }) => {
    if (!open) return null
    return (
        <div className='w-screen h-screen fixed bg-background left-0 top-0 z-50'>
            <div className='flex items-center justify-between p-4 border-b border-bright/10 '>
                <div>
                    <h4>Search</h4>
                    <div className='text-[10px] flex items-center space-x-1 text-bright-300'>
                        <span>Enter search words eg. laptop, phone, camera etc.</span>
                    </div>
                </div>
                <span onClick={() => setOpen(!open)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
            </div>
            <div className='w-full'>
                <SearchBar router={router} closeModal={setOpen} focus={true} />
            </div>
        </div>
    )
}

const CategoryModal = ({ setOpen, open, router }) => {
    const [categories, setCategories] = useState(null)
    const get_categories = async () => {
        const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/categories?depth=1`, options: { cache: 'force-cache', revalidate: 3600 } });
        return res.docs || []
    }
    useEffect(() => {
        get_categories().then(res => {
            setCategories(res)
        })

    }, [])


    if (!open || !categories) return null
    return (
        <div className='w-screen h-screen fixed bg-background left-0 top-0 z-50'>
            <div className='flex items-center justify-between p-4 border-b border-bright/10 '>
                <div>
                    <h4>Categories</h4>
                    <div className='text-[10px] flex items-center space-x-1 text-bright-300'>
                        <span>Select a category.</span>
                    </div>
                </div>
                <span onClick={() => setOpen(!open)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
            </div>
            <div className=''>
                {
                    categories?.length > 0 &&
                    categories.map((cat, i) => {
                        const Icon = Icons[cat.icon]
                        return (
                            <Link href={`/category/${cat.slug}`} onClick={() => setOpen(false)} key={i} className='flex p-4 hover:bg-bright/10 items-center space-x-2 '>
                                <Icon className="w-7 h-7" />
                                <p className='text-xs overflow-hidden truncate whitespace-nowrap'>{cat.category_name}</p>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}