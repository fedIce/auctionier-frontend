'use client'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { login_user, refresh_user_token, register_user, signout_user } from '../../lib/functions/auth'
import { usePathname, useRouter } from 'next/navigation'
import { use_get, use_post } from '@/lib/functions'


const init = {
    isLoggedIn: false,
    user: null,
    history: [],
    login: () => null,
    register: () => null,
    signout: () => null,
    refresh_user: () => null,
    saveShippingInfo: async () => null,
    getShippingData: async () => null,
    shippingInfo: null,
    setShippingInfo: () => null
}

export const APP_STATES = {
    AUTH_STATE: 'auth-state',
    SEARCH_STATE: 'search-state',
    DARK_MODE: 'dark-mode',
}

const AuthContextProvider = createContext(init)

const AuthContext = ({ children }) => {

    const [user, setUser] = useState(null)
    const [history, setHistory] = useState([])
    const [shippingInfo, setShippingInfo] = useState(null)

    const isLoggedIn = user?.user ? true : false
    const path = usePathname()
    const router = useRouter()

    useEffect(() => {
        const active_user = localStorage.getItem(APP_STATES.AUTH_STATE)
        if (active_user) {
            const stored_user = JSON.parse(active_user)
            const timeDiff = new Date(new Date(stored_user.exp * 1000) - new Date())
            getShippingData(stored_user.user.id).then((res) => setShippingInfo(res?.docs[0]))

            // Refresh user token is time less than 30 minutes, if time passed logout user, else just setUser
            if (timeDiff.getHours() == 0 && (timeDiff.getMinutes() < 30 && timeDiff.getMinutes() > 0)) {
                refresh_user()
            } else if (new Date() > new Date(stored_user.exp * 1000)) {
                signout()
            } else {
                setUser(stored_user)
            }

        }
    }, [])

    useEffect(() => {
        if (path.includes('auth') && user) {
            const his = history.filter(i => !i.includes('auth'))
            router.push(his[his.length - 1] || '/')
        }

        if (path.includes('user') && !user) {
            router.push('/auth/login')
        }
    }, [user, history])

    useEffect(() => {
        const asPath = path;

        if (history[history.length - 1] !== asPath) {
            setHistory([...history, asPath]);
        }
    }, [path])



    const login = async ({ email, password }) => {
        const user = await login_user({ email, password })
        localStorage.setItem(APP_STATES.AUTH_STATE, JSON.stringify(user))
        setUser(user)
        return user
    }

    const signout = async () => {
        signout_user({ token: user.token }).then(() => {
            localStorage.removeItem(APP_STATES.AUTH_STATE)
            setUser(null)
        }).catch(e => console.error(e))
    }

    const register = async ({ fullname, email, password }) => {
        return await register_user({ fullname, email, password }).then(async () => {
            const user = await login({ email, password })
            localStorage.setItem(APP_STATES.AUTH_STATE, JSON.stringify(user))
            setUser(user)
            return user
        }).catch((e) => {
            console.log('REGISTER ERROR', e)
        })
    }

    const getShippingData = async (user) => {
        return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer-shipping-details?where[user][equals]=${user}` })
    }

    const saveShippingInfo = async (data) => {
        return await use_post({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer-shipping-details/shipping`, data: data })
    }


    const refresh_user = async () => {
        const user = await refresh_user_token()
        localStorage.setItem(APP_STATES.AUTH_STATE, JSON.stringify(user))
        setUser(user)
        return user
    }

    const value = { login, register, refresh_user, user, isLoggedIn, signout, saveShippingInfo, getShippingData, shippingInfo, setShippingInfo, history }

    return (
        <AuthContextProvider.Provider value={value} className='w-full h-full'>
            {children}
        </AuthContextProvider.Provider>
    )
}

export const useAuth = () => useContext(AuthContextProvider)

export default AuthContext