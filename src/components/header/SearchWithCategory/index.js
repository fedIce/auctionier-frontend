import React, { useEffect, useState } from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { use_get } from '@/lib/functions'
import * as Icons from "@heroicons/react/24/outline";
import Link from 'next/link';
import { useAuth } from '@/contexts/auth';



const SearchWithCategory = () => {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const [searchStrings, setSearchStrings] = useState([])


    return (
        <div>
            <div className='hidden lg:flex h-full items-center space-x-5 py-2 w-full'>
                <CategoriesDrop />
                <SearchBar closeModal={setOpen} router={router} searchStrings={searchStrings} setSearchStrings={setSearchStrings} />
            </div>
            <span className='lg:hidden'>
                <MagnifyingGlassIcon onClick={() => setOpen(!open)} className='w-5 h-5 text-bright' />
                <SearchModal router={router} setOpen={setOpen} open={open} setSearchStrings={setSearchStrings} searchStrings={searchStrings} />
            </span>

        </div>
    )
}

export default SearchWithCategory


export const CategoriesDrop = ({ className }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className='relative'>
            <div onClick={() => setOpen(!open)} className={`flex cursor-pointer items-center space-x-1 ${className}`}>
                <span>Categories</span>
                <span><ChevronDownIcon className='w-4 h-4' /></span>
            </div>
            <CategoryModal setOpen={setOpen} open={open} />
        </div>
    )
}

export const SearchBar = ({ router, closeModal = null, focus = false, searchStrings = ['car', 'home'], setSearchStrings = () => null }) => {
    const [search, setSearch] = useState('')

    const auth = useAuth()

    useEffect(() => {

    }, [searchStrings])


    var typingTimer;                //timer identifier
    const doneTypingInterval = 800;

    const onSearch = (s = null) => {
        const _search = s ? s : search
        if (_search.trim() === '') return
        // Perform search action here, e.g., redirect to search results page
        router.replace('/search?q=' + encodeURIComponent(_search.trim()))
        setSearch('')
        if (closeModal) {
            closeModal(false)
            setSearchStrings([])
        }
    }

    const handleKeyDown = (e) => {
        clearTimeout(typingTimer);
        if (e.key === 'Enter') {
            if (search == '') return
            onSearch()
            auth.save_search_strings(search.trim())
        }

    }

    const handleKeyUp = () => {
        if (search == '') return
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => auth.get_search_strings(search.trim()).then(e => setSearchStrings(e.data)), doneTypingInterval);
    }

    return (
        <div className='w-full h-full relative bg-background text-foreground flex items-center gap-2 rounded-full px-4 py-2'>
            <MagnifyingGlassIcon className='w-5 h-5' />
            <input
                className='w-full ring-0 outline-0 placeholder:text-foreground-700 text-foreground'
                placeholder='Search...'
                value={search}
                autoFocus={focus}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
            />
            <div className={`hidden lg:flex overflow-hidden transition-transform duration-150 ${searchStrings?.length <= 0 ? '-translate-y-full h-0' : `h-auto translate-y-0`} max-w-2xl w-full absolute bg-foreground shadow-2xl z-[99999] top-[55px] -left-0 `}>
                <div className='w-full h-full flex divide-y divide-secondary/10 flex-col '>
                    {
                        searchStrings?.map((s, i) => {
                            return (
                                <div onClick={() => onSearch(s)} key={i} className='w-full p-2 py-2 px-6 hover:bg-foreground text-background cursor-pointer'>{s}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export const SearchModal = ({ setOpen, open, router, searchStrings, setSearchStrings }) => {

    useEffect(() => { }, [searchStrings])

    const onSearch = (search) => {
        if (search.trim() === '') return
        router.replace('/search?q=' + encodeURIComponent(search.trim()))
        if (setOpen) {
            setOpen(false)
        }
    }


    if (!open) return null
    return (
        <div className='w-screen h-screen fixed flex items-start justify-center bg-background left-0 top-0 z-50'>
            <div className='flex  max-w-3xl w-full items-center flex-col'>
                <div className='flex w-full text-foreground items-center justify-between p-4 border-b border-foreground/10 '>
                    <div>
                        <h4>Search</h4>
                        <div className='text-[10px] flex items-center space-x-1 text-bright-300'>
                            <span>Enter search words eg. laptop, phone, camera etc.</span>
                        </div>
                    </div>
                    <span onClick={() => setOpen(!open)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
                </div>
                <div className='w-full'>
                    <SearchBar router={router} closeModal={setOpen} focus={true} searchStrings={searchStrings} setSearchStrings={setSearchStrings} />
                </div>
                <div className='w-full flex divide-y divide-secondary/10 flex-col '>
                    {
                        searchStrings?.map((s, i) => {
                            return (
                                <div onClick={() => onSearch(s)} key={i} className='w-full p-2 py-2 px-6 hover:bg-foreground hover:text-background cursor-pointer'>{s}</div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

const CategoryModal = ({ setOpen, open }) => {
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
        <div className='w-screen h-screen fixed flex items-start justify-center bg-background text-foreground left-0 top-0 z-50'>
            <div className='flex  max-w-3xl w-full items-center flex-col'>
                <div className='flex items-center justify-between p-4 border-b w-full border-foreground/10 '>
                    <div>
                        <h4>Categories</h4>
                        <div className='text-[10px] flex items-center space-x-1 text-bright-300'>
                            <span>Select a category.</span>
                        </div>
                    </div>
                    <span onClick={() => setOpen(!open)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
                </div>
                <div className='w-full'>
                    {
                        categories?.length > 0 &&
                        categories.map((cat, i) => {
                            const Icon = Icons[cat.icon]
                            return (
                                <Link href={`/category/${cat.slug}`} onClick={() => setOpen(false)} key={i} className='flex p-4 hover:bg-foreground hover:text-background items-center space-x-2 '>
                                    <Icon className="w-7 h-7" />
                                    <p className='text-xs overflow-hidden truncate whitespace-nowrap'>{cat.category_name}</p>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}