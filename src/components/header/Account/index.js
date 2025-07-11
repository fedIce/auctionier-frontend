import React, { useState } from 'react'
import { EyeIcon, BellIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'


const Account = ({ auth }) => {
    const email = auth.user ? auth.user.user?.email : null
    const name = auth.user ? auth.user.user?.fullname : null

    const [hidden, setHidden] = useState(true)
    return (
        <div className='w-full flex relative flex-row justify-end text-sm items-center gap-4'>
            <Link href={'/user/favourites'}>
                <EyeIcon className='w-5 h-5 text-bright' />
            </Link>
            <span>
                <BellIcon className='w-5 h-5 text-bright' />
            </span>
            <div onClick={() => setHidden(!hidden)} className='bg-background aspect-square cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center text-center font-mono text-2xl uppercase' >{name? name[0] : email ? email[0] : ''}</div>
            <div onClick={() => setHidden(!hidden)} className={`w-screen lg:w-[350px] overflow-hidden transition-transform duration-150 ${hidden ? '-translate-y-full h-0' : `h-auto translate-y-0`} bg-secondary absolute divide-y divide-bright/10 top-14 -right-2 `}>
                {auth.isLoggedIn &&
                    <div className='flex items-center space-x-2 p-4'>
                        <div onClick={() => setHidden(!hidden)} className='bg-background aspect-square cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center text-center font-mono text-2xl uppercase' >{name? name[0] : email ? email[0] : ''}</div>
                        <div className=' overflow-hidden text-nowrap text-ellipsis w-full'>
                            <p>{name ? name : "Username"}</p>
                            <p className='text-xs line-clamp-1'>{email}</p>
                        </div>
                    </div>}
                {auth.isLoggedIn &&
                    <section className='space-y-2'>
                        <div className='py-4 hover:bg-background-600 cursor-pointer px-4 flex items-center justify-between'>
                            <p>Account</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </div>
                        <div className='py-4 hover:bg-background-600 cursor-pointer px-4 flex items-center justify-between'>
                            <p>Orders</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </div>
                        <div className='py-4 hover:bg-background-600 cursor-pointer px-4 flex items-center justify-between'>
                            <p>Payments</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </div>
                    </section>}
                {auth.isLoggedIn ?
                    <div onClick={() => auth.signout()} className='py-4 hover:bg-background-600 cursor-pointer px-4 flex items-center justify-between'>
                        <p>Sign Out</p>
                        <span>
                            <ChevronRightIcon className='w-4 h-4' />
                        </span>
                    </div> :
                    <section>
                        <Link href={'/auth/register'} className='py-4 hover:bg-background-600 cursor-pointer px-4 flex items-center justify-between'>
                            <p>Register</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </Link>
                        <Link href={'/auth/login'} className='py-4 hover:bg-background-600 cursor-pointer px-4 flex items-center justify-between'>
                            <p>Login</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </Link>
                    </section>
                }

            </div>
        </div>
    )
}

export default Account