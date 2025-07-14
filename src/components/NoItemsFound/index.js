import { FolderOpenIcon } from '@heroicons/react/24/solid'
import React from 'react'

const NoItemsFound = () => {
    return (
        <div className='w-full h-screen items-center justify-center flex flex-col text-foreground'>
            <FolderOpenIcon className='w-10 h-10' />
            <div className='font-medium text-lg text-foreground'>No Items Found</div>
            <div className='font-thin text-xs'>broaden your search and try again</div>
            <div className='font-thin text-xs'>go back </div>
        </div>
    )
}

export default NoItemsFound