import Image from 'next/image'
import React from 'react'
import CountdownTimer from '../Counter'

const SpecialCategoryCard = ({ src, title, alt, endDate }) => {
    return (
        <div className='bg-third-400 relative rounded-xl min-w-52 w-full h-80 lg:h-[50vh] overflow-hidden'>
            <Image className='w-full h-full object-cover'
                src={src}
                height={466}
                width={200}
                priority
                alt={alt}
            />
            <div className='absolute bg-gradient-to-t flex p-4 space-y-1 flex-col justify-end from-40% from-black/70 to-transparent inset-0 rounded-xl outline-1 -outline-offset-1 outline-gray-950/10 dark:outline-white/10 ' >
                <div className='flex items-center space-x-1'><p className='border-b text-sm lg:text-base border-white w-fit'>Ends in </p><span className='font-bold'>{endDate && <CountdownTimer targetDate={endDate} />}</span></div>
                <h3 className='font-semibold line-clamp-3 text-lg lg:text-3xl lg:line-clamp-4'>{title}</h3>
                <p className='text-sm lg:text-base font-light underline hover:font-bold duration-300 transition-all'>Explore Now</p>
            </div>
        </div>
    )
}

export default SpecialCategoryCard