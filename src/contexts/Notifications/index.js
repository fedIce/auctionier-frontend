'use client'
import React, { createContext, useContext } from 'react'
import Pusher from 'pusher-js';


const init = {}
const NotificationContextProvider = createContext(init)

const NotificationsContext = ({ children }) => {

    var pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER
    });

    var channel = pusher.subscribe('gavel-app');
    channel.bind('app-events', function (data) {
        console.log(JSON.stringify(data));
    });

    const value = {}
    return (
        <NotificationContextProvider.Provider value={value}>
            {children}
        </NotificationContextProvider.Provider>
    )
}

export default NotificationsContext
export const useNotification = () => useContext(NotificationContextProvider)