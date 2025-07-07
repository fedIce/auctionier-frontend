'use client'
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Pagination = ({ pagination }) => {

    const router = useRouter();
    const searchParams = useSearchParams()

    if (!pagination || !pagination.totalPages || pagination.totalPages <= 1) {
        return null; // No pagination needed
    }
    const { hasNextPage, hasPrevPage,  nextPage, page, totalPages } = pagination;
    const currentPage = page || 1; // Default to page 1 if not provided

    const gotonextPage = (next = false) => {
        if (typeof next == 'number') {
            const url = searchParams.toString();

            if (url.includes('page=')) {
                const updatedUrl = url.replace(/page=\d+/, `page=${next}`);
                router.push(`?${updatedUrl}`);
            } else {
                router.push(`?${url}&page=${nextPage}`);
            }
            return
        }

        if (hasNextPage && next) {
            // Logic to navigate to the next page
            // This could be a function that updates the state or navigates to a new URL
            const url = searchParams.toString();

            if (url.includes('page=')) {
                const updatedUrl = url.replace(/page=\d+/, `page=${nextPage}`);
                router.push(`?${updatedUrl}`);
            } else {
                router.push(`?${url}&page=${nextPage}`);
            }
            return
        }

        if (hasPrevPage && !next) {
            // Logic to navigate to the previous page
            const url = searchParams.toString();

            if (url.includes('page=')) {
                const updatedUrl = url.replace(/page=\d+/, `page=${currentPage - 1}`);
                router.push(`?${updatedUrl}`);
            } else {
                router.push(`?${url}&page=${currentPage - 1}`);
            }
            return
        }
    }

    return (
        <div className='w-full flex items-center justify-center py-8'>
            <div className='max-w-xl flex w-full justify-center items-center space-x-[5vw] text-sm'>
                {hasPrevPage && <div onClick={() => gotonextPage(false)} className='bg-bright cursor-pointer text-background rounded-full py-2 px-4'>Prev</div>}
                {currentPage > 3 && (
                    <div onClick={() => gotonextPage(1)} className='text-secondary-600 flex items-center space-x-[5vw] cursor-pointer'>
                        <span className='text-secondary-600'>1</span> <EllipsisHorizontalIcon className='w-7 h-7 inline' />
                    </div>)}
                {
                    currentPage <= 3 ?
                        Array.from({ length: 3 }, (_, i) => (
                            <div key={i} onClick={() => gotonextPage(i + 1)} className={currentPage == i + 1 ? 'underline font-bold' : 'text-secondary-600 cursor-pointer'}>{i + 1}</div>
                        ))
                        :
                        currentPage >= totalPages - 2 ?
                            Array.from({ length: 3 }, (_, i) => (
                                <div key={i} onClick={() => gotonextPage(totalPages - (2 - i))} className={currentPage == totalPages - (2 - i) ? 'underline font-bold' : 'text-secondary-600 cursor-pointer'}>{totalPages - (2 - i)}</div>
                            ))
                            :
                            Array.from({ length: totalPages }, (_, i) => (
                                <div key={i} onClick={() => gotonextPage(i + 1)} className={currentPage == i + 1 ? 'underline font-bold' : 'text-secondary-600 cursor-pointer'}>{i + 1}</div>
                            ))
                }

                {currentPage <= (totalPages - 2) && (
                    <div onClick={() => gotonextPage(totalPages)} className='text-secondary-600 space-x-[5vw] flex items-center cursor-pointer'>
                        <EllipsisHorizontalIcon className='w-7 h-7 inline' />  <span className='text-secondary-600 cursor-pointer'>{totalPages}</span>
                    </div>)}

                {hasNextPage && <div onClick={() => gotonextPage(true)} className='bg-bright cursor-pointer text-background rounded-full py-2 px-4'>Next</div>}
            </div>
        </div>
    )
}

export default Pagination