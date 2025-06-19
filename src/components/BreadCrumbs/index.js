import Link from 'next/link'
import React from 'react'
import { NO_SCROLL } from '../../lib/functions/util'

const BreadCrumbs = ({ crumbs = [] }) => {

    if (crumbs.length <= 0) return <BreadCrumbsLoader />

    return (
        <div className={`flex items-center py-2 w-full overflow-x-auto text-nowrap text-secondary-400 text-xs ${NO_SCROLL}`}>
            {
                crumbs.map((c, i) => {
                    return <Link href={c.link} className=' space-x-2 pr-2' key={i}><span className='underline'>{c.title}</span> {!(i >= crumbs.length - 1) && <span>|</span>}</Link>
                })
            }

        </div>
    )
}

export default BreadCrumbs




export const BreadCrumbsLoader = () => {
    return (
        <div className='flex items-center py-2 space-x-2 text-secondary-400 text-xs'>
            <div className='underline w-24 h-2 bg-background-900 animate-pulse'></div> <span>/</span>
            <div className='underline w-24 h-2 bg-background-900 animate-pulse'></div> <span>/</span>
            <div className='underline w-24 h-2 bg-background-900 animate-pulse'> </div> <span>/</span>
            <div className='underline w-24 h-2 bg-background-900 animate-pulse'></div>
        </div>
    )
}
