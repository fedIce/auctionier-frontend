import React from 'react'
import { BreadCrumbsLoader } from '../BreadCrumbs'

const SearchPageloading = ({ category = false, subcategory = false, auction = false }) => {
    return (
        <section className='space-y-2 mb-4 px-2 lg:my-8'>
            {category &&
                <section className='space-y-2 lg:my-8'>
                    <div className="flex px-2 lg:px-0 items-center justify-around overflow-x-auto space-x-4 lg:space-x-8 my-8 w-full  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                        {

                            [0, 0, 0, 0, 0, 0, 0, 0]
                                .map((_, i) => {
                                    return (
                                        <div key={i} className='flex max-w-32 w-full space-y-2 flex-col items-center text-center justify-center whitespace-nowrap'>
                                            <div className='w-10 h-10 bg-foreground animate-pulse rounded-lg' />
                                            <div className='w-32 h-4 animate-pulse bg-foreground rounded' />
                                        </div>
                                    )
                                })
                        }

                    </div>
                </section>}
            <section>
                <BreadCrumbsLoader />
            </section>
            {auction &&
                < div className='w-full h-64 rounded-2xl my-4 bg-foreground animate-pulse relative overflow-hidden' >

                </div>}
            <section className='space-y-4'>
                {(category && !auction) &&
                    <div className='flex items-center my-4 space-x-2'>
                        <div className='w-12 h-12 animate-pulse bg-foreground rounded' />
                        <div className='w-52 h-10 animate-pulse bg-foreground rounded' />
                    </div>}
                {subcategory &&
                    <div className='grid py-4 grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-4'>

                        {
                            [0, 0].map((_, i) => {
                                return (
                                    <div key={i} className='cursor-pointer transition-colors duration-300 border-white/10 hover:bg-bright-200 grid grid-rows-[1fr_30px] bg-foreground animate-pulse text-background aspect-video p-2 pb-0 rounded-xl lg:rounded-2xl'>
                                        <div></div>
                                        <div className='text-end text-xs lg:text-sm text-nowrap px-2 font-medium'></div>
                                    </div>
                                )
                            })
                        }
                    </div>}
            </section>

            <div className='flex flex-col lg:flex-row space-y-4 lg:space-y-0 items-center space-x-2 w-full justify-between'>
                <div className="flex text-sm  text-nowrap overflow-x-auto items-center space-x-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                </div>
                <div className='flex items-center space-x-2 self-end'>
                    <div className='w-32 h-4 py-4 bg-foreground animate-pulse rounded-full' />
                    <div className='w-32 h-4 py-4 bg-foreground animate-pulse rounded-full' />
                </div>
            </div>

            <section className='lg:my-8 w-full border-t border-bright/10'>
                <div className='w-full relative flex items-start'>
                    <div className={`w-0 space-y-6 py-4 border-background lg:w-1/4 lg:border-bright/10 h-full hidden lg:block transition-all duration-300 ease-in-out border-r `} >

                        <div className='w-44 h-7 rounded bg-foreground animate-pulse' />

                        {
                            [0, 0, 0, 0, 0, 0].map((_, i) => {
                                return (
                                    <div key={i} className='flex items-center space-x-2'>
                                        <div className='w-5 h-5 rounded bg-foreground animate-pulse' />
                                        <div className='w-32 h-4 rounded bg-foreground animate-pulse' />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <section className={`w-full py-4 grid gap-4 grid-cols-2 md:grid-cols-2 lg:grid-cols-3`}>

                        {[0, 0, 0, 0, 0, 0].map((_, i) => {
                            return (
                                <div key={i} className={`w-full lg:min-w-64 min-h-80 bg-foreground rounded-lg animate-pulse`} >
                                    {/* Section Card */}
                                </div >
                            )
                        })
                        }
                    </section>
                </div>
            </section>
        </section >
    )
}

export default SearchPageloading