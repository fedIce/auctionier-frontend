'use client'
import React, { useContext, createContext, useState, useEffect } from 'react'
import { GrayInfoAlertDialog, GreenSuccessAlertDialog, RedDangerAlertDialog } from './components'

const init = {
    setalert: () => null,
    closealert: () => null
}

const AlertProvider = createContext(init)

const AlertContext = ({ children }) => {

    const [_alert, setAlert] = useState(null)

    useEffect(() => {
        if (_alert !== null) {
            setTimeout(() => {
                setAlert(null)
            }, 5000)
        }
    }, [_alert])

    const renderAlert = () => {
        if (_alert == null || _alert == undefined || typeof _alert !== 'object') return null
        switch (_alert?.type) {
            case 'success':
                return <GreenSuccessAlertDialog text={_alert.text} close={closealert} />
            case 'error':
                return <RedDangerAlertDialog text={_alert.text} close={closealert} />
            case 'info':
                return <GrayInfoAlertDialog text={_alert.text} close={closealert} />
            default:
                return null

        }
    }

    const setalert = (type, text) => {
        // types => info, error, success
        setAlert({ type, text })
    }

    const closealert = () => {
        setAlert(null)
    }

    const value = {
        setalert,
        closealert
    }
    return (
        <AlertProvider.Provider value={value}>
            <div className='w-screen h-screen inset-0 relative'>
                {children}
                {_alert && <div className='bg-transparent flex items-center justify-end pr-[5%] fixed w-96 h-44 right-0 bottom-0'>
                    {renderAlert()}
                </div>}
            </div>
        </AlertProvider.Provider>
    )
}

export const useAlert = () => useContext(AlertProvider)

export default AlertContext