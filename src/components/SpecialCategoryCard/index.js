import Image from 'next/image'
import React from 'react'

const SpecialCategoryCard = ({ src }) => {
    return (
        <div className='bg-third-400 relative rounded-xl min-w-52 w-full h-80 lg:h-[50vh] overflow-hidden'>
            <Image className='w-full h-full object-cover'
                src={src}
                height={466}
                width={200}
                priority
                alt='FILL WITH SLUG!!'
            />
            <div className='absolute bg-gradient-to-t flex p-4 space-y-4 flex-col justify-end from-40% from-black/70 to-transparent inset-0 rounded-xl outline-1 -outline-offset-1 outline-gray-950/10 dark:outline-white/10 ' >
                <p className='border-b text-sm lg:text-base border-white w-fit'>Ends in 5 days, 3 hours</p>
                <h3 className='font-semibold line-clamp-3 text-lg lg:text-3xl lg:line-clamp-4'>Skin care, Face wash, folicle removal special auction monday</h3>
            </div>
        </div>
    )
}

export default SpecialCategoryCard