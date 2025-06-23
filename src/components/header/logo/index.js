import React from 'react'
import { CategoriesDrop } from '../SearchWithCategory'

const Logo = () => {
    return (
        <div className='flex w-full bg-primary-500 items-center gap-2'>
            <div className='bg-background w-[50px] h-[50px] rounded-md' />
            <div className='lg:grid hidden grid-rows-2 gap-0.5'>
                <h4 className='text-lg'>Auctioner</h4>
                <p className='text-xs'>finders keepers</p>
            </div>
            <CategoriesDrop className="lg:hidden" />
        </div>
    )
}

export default Logo