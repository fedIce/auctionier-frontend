'use client'
import { use_del, use_patch } from '@/lib/functions'
import { BellSlashIcon, LinkIcon, TrashIcon } from '@heroicons/react/24/outline'
import moment from 'moment'
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

    const ncolor = () => {
        switch (data.type) {
            case 'error':
                return { read: '#cb4b32', unread: '#ff8e78' }
            case 'warning':
                return { read: '#c19f73', unread: '#80694c' }
            case 'info':
                return { read: '#86bbf7', unread: '#4b9bf5' }
            case 'success':
                return { read: '#c5edea', unread: '#052b28' }
            default:

        }
    }

    const bg = { backgroundColor: data.read ? ncolor().read : ncolor().unread }
    const textColor = { color: data.read ? ncolor().read : ncolor().unread }

    return (
        <div className={`w-full h-18 ${data.read ? 'text-secondary/40 bg-gray-200' : 'bg-background hover:bg-background/30 text-secondary'} flex  items-center`}>
            <div style={bg} className={`w-[2px] h-full`} />
            <div className='h-full w-full p-2 flex flex-col'>
                <div className='flex items-center justify-between'>
                    <div style={textColor} className={`text-sm ${data.read ? ' font-medium' : 'font-bold'}`}>{data.title}</div>
                    {data?.createdAt && <div className={`text-[10px] ${data.read?'text-gray-400/50':'text-gray-400'} text-end`}>{moment(data.createdAt).fromNow()}</div>}
                </div>
                <div style={textColor} className='text-[10px] font-light line-clamp-2'>{data.body}</div>
            </div>
            {link &&
                <div className='flex items-center h-full'>
                    <div className={`px-4 h-full  border-white flex items-center justify-center`}><LinkIcon onClick={() => handleClick()} className='w-5 h-5 cursor-pointer' /></div>
                    <div className={`px-4  h-full border-white flex items-center justify-center`}>
                        <TrashIcon onClick={() => handleDelete()} className='w-5 h-5 cursor-pointer' />
                    </div>
                </div>}
        </div>
    )
}   