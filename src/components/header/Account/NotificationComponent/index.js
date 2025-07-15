'use client'
import { use_del, use_patch } from '@/lib/functions'
import { BellSlashIcon, LinkIcon, TrashIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import React from 'react'

const NotificationComponent = ({ notifications, n }) => {

    return (
        <div className='w-full divide-y text-secondary/60 divide-secondary/10'>
            <div className='py-4 uppercase font-thin w-full text-center'>
                UPDATES
            </div>
            <div className='w-full'>
                {
                    notifications.length <= 0 ?
                        <div className='w-full flex text-center items-center flex-col py-8'>
                            <BellSlashIcon className='w-5 h-5' />
                            <h4 className='font-bold text-sm'>No Updates</h4>
                            <p className='text-xs text-secondary/50'>You have no updates at this time.</p>
                        </div>
                        :
                        <div className='w-full flex px-1 flex-col divide-y divide-foreground/50'>
                            {
                                notifications.map((data, i) => {
                                    return <NotiCard n={n} key={i} data={data} />
                                })
                            }
                        </div>

                }
            </div>
        </div>
    )
}

export default NotificationComponent

const NotiCard = ({ data, n }) => {

    const router = useRouter()
    const link = data.extra.find(i => i.key == 'link')

    const handleClick = async () => {
        if (link) {
            router.push(link.value)
        }
        handleRead()
        n.reduceCount(data.id)
    }

    const handleRead = async () => {
        return await use_patch({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/notifications?where[id][equals]=${data.id}`, data: { read: true } })
    }

    const handleDelete = async () => {
        return await use_del({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/notifications?where[id][equals]=${data.id}` }).then(() => {
            n.deleteNotifications([data.id])
            n.reduceCount(data.id)

        })
    }

    return (
        <div className={`w-full h-14 ${data.read ? 'text-secondary/40' : 'text-secondary'} bg-background flex hover:bg-background/30 cursor-pointer items-center`}>
            <div className={`w-[2px] h-full ${data.read ? 'bg-green-600/50' : 'bg-green-600'}`} />
            <div className='h-full w-full p-2 flex flex-col'>
                <div className='text-sm font-bold'>{data.title}</div>
                <div className='text-xs font-light'>{data.body}</div>
            </div>
            {link &&
                <div className='flex items-center h-full'>
                    <div onClick={() => handleClick()} className={`px-4 bg-foreground h-full cursor-pointer hover:bg-foreground/40 border-r border-white flex items-center justify-center`}><LinkIcon className='w-5 h-5' /></div>
                    <div onClick={() => handleDelete()} className={`px-4 bg-red-400 h-full cursor-pointer hover:bg-red-400/40 border-white flex items-center justify-center`}>
                        <TrashIcon className='w-5 h-5' />
                    </div>
                </div>}
        </div>
    )
}   