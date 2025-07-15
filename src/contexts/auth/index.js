'use client'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { login_user, refresh_user_token, register_user, signout_user } from '../../lib/functions/auth'
import { usePathname, useRouter } from 'next/navigation'
import { use_get, use_post } from '@/lib/functions'
import { useAlert } from '../Alert'
import LoginRequired from './loginRequired'

export const parseError = async (e) => {
    let error = null

    if (e?.json?.error && typeof e?.json?.error == 'string') {
        return e.json.error
    }
    if (e?.json?.message && typeof e?.json?.message == 'string') {
        return e.json.message
    }
    if (Array.isArray(e?.json?.errors)) {
        error = e?.json?.errors[0] ?? { message: 'Something went wrong, please try again later.' }
    } else if (typeof e?.json?.error == 'object') {
        if (e?.json?.error) {
            error = e?.json?.error?.message ? { message: e?.json?.error.message } : { message: e?.json?.error }
        }
    } else if (typeof e?.json?.error == 'string') {
        error = { message: e?.json?.error }
    }
    error = error.data ? error.data.errors[0].message : error.message
    if (!error) error = e.message

    return String(error)
}

const init = {
    isLoggedIn: false,
    user: null,
    history: [],
    login: async () => null,
    register: async () => null,
    signout: () => null,
    refresh_user: () => null,
    saveShippingInfo: async () => null,
    getShippingData: async () => null,
    shippingInfo: null,
    setShippingInfo: () => null,
    userLoggedIn: () => null
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
    const [loginRequired, setOpenLoginRequired] = useState(false)

    const isLoggedIn = user?.user ? true : false
    const path = usePathname()
    const router = useRouter()
    const alert = useAlert()

    useEffect(() => {
        const active_user = localStorage.getItem(APP_STATES.AUTH_STATE)
        if (active_user) {
            const stored_user = JSON.parse(active_user)
            const timeDiff = new Date(new Date(stored_user.exp * 1000) - new Date())
            getShippingData(stored_user.user.id, user?.token).then((res) => setShippingInfo(res?.docs[0]))

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
        const user = await login_user({ email, password }).catch(async e => {
            const error = await parseError(e)
            alert.setalert('error', error)
            return null
        })
        if (!user.error) {
            localStorage.setItem(APP_STATES.AUTH_STATE, JSON.stringify(user))
            setUser(user)
            return user
        }
    }

    const signout = async () => {
        signout_user({ token: user?.token }).finally(() => {
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
        }).catch(async (e) => {
            const error = await parseError(e)
            alert.setalert('error', error)
            return null
        })
    }

    const getShippingData = async (user, token = user?.token) => {
        return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer-shipping-details?where[user][equals]=${user}`, token }).catch(async e => {
            const error = await parseError(e)
            alert.setalert('error', error)
        })
    }

    const saveShippingInfo = async (data, token = user?.token) => {
        return await use_post({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/customer-shipping-details/shipping`, data: data, token })
            .then((e) => {
                alert.setalert('success', 'Shipping Address Saved!')
                return e
            }).catch(async e => {
                const error = await parseError(e)
                alert.setalert('error', error)
                return null
            })
    }

    const userLoggedIn = () => {
        if (!user) {
            setOpenLoginRequired(true)
            return false
        }
        return true
    }


    const refresh_user = async () => {
        const _user = await refresh_user_token(user?.token)
        localStorage.setItem(APP_STATES.AUTH_STATE, JSON.stringify(_user))
        setUser(_user)
        return _user
    }

    const value = { login, register, refresh_user, user, isLoggedIn, signout, saveShippingInfo, getShippingData, shippingInfo, setShippingInfo, history, userLoggedIn }

    return (
        <AuthContextProvider.Provider value={value} className='w-full h-full'>
            {children}
            {loginRequired && <LoginRequired setOpen={setOpenLoginRequired} />}
        </AuthContextProvider.Provider>
    )
}

export const useAuth = () => useContext(AuthContextProvider)

export default AuthContext