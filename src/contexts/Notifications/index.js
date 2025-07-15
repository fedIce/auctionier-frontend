'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import Pusher from 'pusher-js';
import { use_get } from '@/lib/functions';
import { useAuth } from '../auth';

var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
});

const init = {
    notificationsCount: 0,
    notifications: [],
    addNotifications: async () => null,
    deleteNotifications: async () => null,
    reduceCount: async () => null,
}
const NotificationContextProvider = createContext(init)

const NotificationsContext = ({ children }) => {

    const [notifications, setNotifications] = useState([])
    const [notificationsCount, setNotificationsCount] = useState(0)
    const auth = useAuth()
    const user = auth?.user?.user ?? null

    useEffect(() => {
        var channel = pusher.subscribe('gavel-app');
        channel.bind('app-events', function (data) {
            console.log(data);
            addNotifications(data)
        });

        return () => {
            channel.unsubscribe()
        }
    }, [])

    useEffect(() => {

        user && use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/notifications?where[user]=${user.id}&limit=0` }).then((res) => {
            setNotifications(res.docs)
            setNotificationsCount(res.docs.filter(i => i.read == false).length)
        })
    }, [user])

    useEffect(() => {

    }, [notifications])

    const addNotifications = async (data) => {
        const exists = notifications.find(i => i.id == data.id)
        if (exists) {
            return
        }
        setNotifications(n => [...n, data])
        setNotificationsCount(i => i + 1)

        return
    }

    const reduceCount = (id) => {
        setNotificationsCount(i => i - 1)
        setNotifications(n => [...n.map(i => i.id == id ? { ...i, read: true } : i)])
    }

    const deleteNotifications = async (ids) => {
        const _ids = Array.isArray(ids) ? ids : [ids]
        setNotifications(n => [...n.filter(i => !_ids.includes(i.id))])
        return
    }



    const value = { notifications, addNotifications, deleteNotifications, notificationsCount, reduceCount }
    return (
        <NotificationContextProvider.Provider value={value}>
            {children}
        </NotificationContextProvider.Provider>
    )
}

export default NotificationsContext
export const useNotification = () => useContext(NotificationContextProvider)