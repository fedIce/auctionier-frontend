import React, { useState } from 'react'
import { EyeIcon, BellIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import NotificationComponent from './NotificationComponent/index.js'
import { useNotification } from '@/contexts/Notifications/index.js'


const Account = ({ auth }) => {
    const email = auth.user ? auth.user.user?.email : null
    const name = auth.user ? auth.user.user?.fullname : null

    const [hidden, setHidden] = useState(true)
    const [notificationHidden, setNotificationHidden] = useState(true)

    const notification = useNotification()
    const notifications = notification.notifications

    return (
        <div className='w-full flex relative flex-row justify-end text-sm items-center gap-4'>
            <Link href={'/user/favourites'} className=' outline-none'>
                <EyeIcon className='w-5 h-5 text-bright' />
            </Link>
            <span onClick={() => setNotificationHidden(!notificationHidden)} className='relative w-10 h-10 flex items-center justify-center'>
                <BellIcon className='w-5 h-5 text-bright' />
                {notification.notificationsCount > 0 && <p className='w-4 h-4 aspect-square border border-white text-[9px] flex items-center justify-center bg-red-500 text-white rounded-full absolute top-1 right-1'>{notification.notificationsCount}</p>}
            </span>
            <div onClick={() => setHidden(!hidden)} className='bg-background text-foreground aspect-square cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center text-center font-mono text-2xl uppercase' >{name ? name[0] : email ? email[0] : ''}</div>
            <div onClick={() => setHidden(!hidden)} className={`w-screen lg:w-[350px] z-40 overflow-hidden transition-transform duration-150 ${hidden ? '-translate-y-full h-0' : `h-auto translate-y-0`} bg-secondary absolute divide-y divide-bright/10 top-14 -right-2 `}>
                {auth.isLoggedIn &&
                    <div className='flex items-center space-x-2 p-4'>
                        <div onClick={() => setHidden(!hidden)} className='bg-background text-foreground aspect-square cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center text-center font-mono text-2xl uppercase' >{name ? name[0] : email ? email[0] : ''}</div>
                        <div className=' overflow-hidden text-nowrap text-ellipsis w-full'>
                            <p>{name ? name : "Username"}</p>
                            <p className='text-xs line-clamp-1'>{email}</p>
                        </div>
                    </div>}
                {auth.isLoggedIn &&
                    <section className='space-y-2'>
                        <div className='py-4 hover:bg-background-600 hover:text-foreground cursor-pointer px-4 flex items-center justify-between'>
                            <p>Account</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </div>
                        <div className='py-4 hover:bg-background-600 hover:text-foreground cursor-pointer px-4 flex items-center justify-between'>
                            <p>Orders</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </div>
                        <div className='py-4 hover:bg-background-600 hover:text-foreground cursor-pointer px-4 flex items-center justify-between'>
                            <p>Payments</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </div>
                    </section>}
                {auth.isLoggedIn ?
                    <div onClick={() => auth.signout()} className='py-4 hover:bg-background-600 hover:text-foreground cursor-pointer px-4 flex items-center justify-between'>
                        <p>Sign Out</p>
                        <span>
                            <ChevronRightIcon className='w-4 h-4' />
                        </span>
                    </div> :
                    <section>
                        <Link href={'/auth/register'} className='py-4 hover:bg-background-600 hover:text-foreground cursor-pointer px-4 flex items-center justify-between'>
                            <p>Register</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </Link>
                        <Link href={'/auth/login'} className='py-4 hover:bg-background-600 hover:text-foreground cursor-pointer px-4 flex items-center justify-between'>
                            <p>Login</p>
                            <span>
                                <ChevronRightIcon className='w-4 h-4' />
                            </span>
                        </Link>
                    </section>
                }

            </div>

            <div onClick={() => setNotificationHidden(!notificationHidden)} className={`w-screen lg:w-[350px] overflow-hidden transition-transform duration-150 ${notificationHidden ? '-translate-y-full h-0' : `h-auto max-h-[70vh] overflow-y-auto translate-y-0`} bg-background-400 absolute divide-y divide-bright/10 top-14 -right-2 `}>
                <NotificationComponent notifications={notifications} n={notification} />
            </div>
        </div>
    )
}

export default Account