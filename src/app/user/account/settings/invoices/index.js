'use client'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../../contexts/auth'
import { use_get } from '../../../../../lib/functions'
import { getShortCode, numberWithCommas } from '../../../../../lib/functions/util'
import moment from 'moment'
import Link from 'next/link'

const Invoices = () => {

    const auth = useAuth()
    const user = auth.user?.user
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user) {
            setLoading(true)
            use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders?where[user][equals]=${user?.id}&limit=0` }).then((res) => {
                console.log('____', res)
                setOrders(res.docs)
            }).finally(() => setLoading(false))
        }
    }, [user])

    const renderAction = (order) => {
        switch (order.status) {
            case 'pending':
                return <Link href={`/user/i/${order.auction.slug}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
            case 'shipped':
                return <Link href={`/user/i/${order.auction.slug}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Track</Link>
            default:
                return null
        }
    }

    return (


        <div className="relative w-full p-2 overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-secondary-500">
                <thead className="text-xs uppercase bg-secondary-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Order
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Edit</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        loading ?
                            [0,0,0,0].map((_, i) => {
                                return (
                                    <tr key={i} className=" border-b bg-transparent  border-secondary-200/10 hover:bg-secondary-50 dark:hover:bg-secondary-600">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-secondary-500">
                                            <div className='h-4 w-40 bg-secondary-900 animate-pulse' />
                                        </th>
                                        <td className="px-6 py-4">
                                            <div className='h-4 w-16 bg-secondary-900 animate-pulse' />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className='h-4 w-10 bg-secondary-900 animate-pulse' />
                                        </td>
                                        <td className={`px-6 py-4 text-xs p-2 `}>
                                            <div className='h-4 w-20 bg-secondary-900 animate-pulse' />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className='h-4 w-10 bg-secondary-900 animate-pulse' />
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            orders?.map((order, i) => {
                                return (
                                    <tr key={i} className=" border-b bg-transparent  border-secondary-200/10 hover:bg-secondary-50 dark:hover:bg-secondary-600">
                                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap text-secondary-500">
                                            {moment(order.createdAt).format('llll')}
                                        </th>
                                        <td className="px-6 py-4">
                                            #{getShortCode(order.id)}
                                        </td>
                                        <td className="px-6 py-4">
                                            € {numberWithCommas(parseFloat(order.amount).toFixed(2))}
                                        </td>
                                        <td className={`px-6 py-4 text-xs p-2 ${order.status == 'completed' ? 'bg-green-500' : order.status == 'pending' ? 'bg-orange-400' : order.status == 'cancelled' ? 'bg-red-400' : 'bg-blue-400'} `}>
                                            {order.status}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            {renderAction(order)}
                                        </td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
        </div>

    )
}

export default Invoices