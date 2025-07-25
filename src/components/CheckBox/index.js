'use client'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const CheckBox = ({ title = "Check me", legend, onSelect, checked = null }) => {

    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const query = searchParams.getAll(legend.trim());

    useEffect(() => {
        if (!title) {
        }
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, [title, query]);

    const t = title
    const q = t.split("(")[0].trim();
    const isChecked = checked ? checked : query.includes(q)

    return (
        <div className='flex items-center space-x-2'>
            <input checked={isChecked ? true : false} disabled={loading} onChange={() => onSelect(legend.trim(), q)} type="checkbox" className='w-4 h-4 text-third bg-gray-100 border-background outline-none active:outline-none rounded-sm dark:bg-gray-700 dark:border-gray-600' />
            {loading ?
                <span className='w-24 h-2 bg-background-900 animate-pulse'></span>
                :
                <span className='text-sm capitalize text-secondary-400'>{t.split("_").join(" ").split("-").join(" ")}</span>}
        </div>
    )
}

export default CheckBox