import React from 'react'

const CheckBox = ({ title = "Check me" }) => {
    return (
        <div className='flex items-center space-x-2'>
            <input type="checkbox" className='w-4 h-4 accent-bright rounded-sm' />
            <span className='text-sm capitalize text-secondary-400'>{title.split("_").join(" ").split("-").join(" ")}</span>
        </div>
    )
}

export default CheckBox