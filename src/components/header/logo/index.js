import React from 'react'
import { CategoriesDrop } from '../SearchWithCategory'
import Link from 'next/link'

const Logo = () => {
    return (
        <Link href={'/'} className='flex outline-none w-full bg-primary-500 items-center gap-2'>
            <div className='bg-background w-[50px] h-[50px] rounded-md' />
            <div className='lg:grid hidden grid-rows-2 gap-0.5'>
                <h4 className='text-lg'>{process.env.NEXT_PUBLIC_SITE_NAME}</h4>
                <p className='text-xs'>finders keepers</p>
            </div>
            <CategoriesDrop className="lg:hidden" />
        </Link>
    )
}

export default Logo