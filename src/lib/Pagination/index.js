import React from 'react'

const Pagination = () => {
    return (
        <div className='w-full flex items-center justify-center py-8'>
            <div className='max-w-xl flex w-full items-center justify-around text-sm'>
                <div className='underline font-bold'>1</div>
                <div className='text-secondary-600'>2</div>
                <div className='text-secondary-600'>3</div>
                <div className='text-secondary-600'>4</div>
                <div className='bg-bright text-background rounded-full py-2 px-4'>Next</div>
            </div>
        </div>
    )
}

export default Pagination