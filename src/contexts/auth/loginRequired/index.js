import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

const LoginRequired = ({ setOpen }) => {
    return (
        <div className='w-full h-screen bg-black/40 flex items-center justify-center fixed top-0 left-0 z-50'>
            <div className='bg-background  border border-third/10 backdrop-blur-md shadow-lg max-w-md w-full text-center'>
                <div className='flex items-center text-start justify-between p-4 border-b border-bright/10 '>
                    <div>
                        <h4>Login Required</h4>
                        <p className='text-[10px] text-bright-300'>You have to be logged in to perform this action</p>
                    </div>
                    <span onClick={() => setOpen(false)} className='cursor-pointer'><XMarkIcon className='w-7 h-7 text-secondary' /></span>
                </div>
                <div className='px-8 py-2.5 text-[10px]'>
                    <b>Kindly Reminder: </b> All bids are binding; if your bid is highest you agree to pay for this object. By bidding, you agree to our Terms of Use.
                </div>
                <Link onClick={() => setTimeout(() => setOpen(false), 500)} href={`/auth/login`} className='flex items-center mt-4 justify-between'>
                    <div className='flex-1 bg-secondary text-background text-center py-4 cursor-pointer'>Go to Login</div>
                    {/* <div className='flex-1  text-bright-300 py-4 bg-background-900 text-center cursor-pointer'>Cancel</div> */}
                </Link>
            </div>
        </div>
    )
}

export default LoginRequired