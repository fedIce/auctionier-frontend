'use client'
import React, { useEffect, useState } from 'react'
import AInput from '../../../../lib/AInput'
import AButton from '../../../../lib/AButton'
import { useAuth } from '../../../../contexts/auth'
import { useAlert } from '../../../../contexts/Alert'

const RegisterPage = () => {

    const auth = useAuth()
    const alert = useAlert()
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [repassword, setRePassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let timeout = null
        if (error) {
            timeout = setTimeout(() => setError(null), 3000)
        }
        return () => timeout && clearTimeout(timeout)
    })

    const handleRegister = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!(password === repassword)) {
            setError("Passwords Mismatched")
            alert.setalert('error', 'Password Mismatched')
            return
        }
        if (!emailRegex.test(email)) return alert.setalert('error', `${email} is not a valid email`)
        if (!fullName || fullName == '') return alert.setalert('error', 'Full Name is required')
        if (!email || email == '') return alert.setalert('error', 'Email is required')
        setLoading(true)
        auth.register({ fullname: fullName, email, password }).finally(() => setLoading(false))
    }


    return (
        <div className='w-full px-4 lg:px-0 lg:max-w-[25vw]'>
            <section className='py-8'>
                <h3 className='font-bold text-2xl'>Register</h3>
            </section>
            <section className='space-y-4'>
                <section>
                    <AInput setvalue={setFullName} value={fullName} label="Full Name" type="email" />
                </section>
                <section>
                    <AInput setvalue={setEmail} value={email} label="Email" type="email" />
                </section>
                <section>
                    <AInput setvalue={setPassword} value={password} label="Password" type="password" />
                </section>
                <section>
                    <AInput setvalue={setRePassword} value={repassword} label="Re-Password" type="password" />
                    <p className={`text-xs underline transition-transform duration-150 text-red-400 py-2 ${error ? 'translate-y-0 h-0' : 'h-full -translate-y-full'}`}>{error}</p>
                </section>
                <section>
                    <AButton loading={loading} text="Register" btn_action={() => handleRegister()} />
                </section>
            </section>
        </div>
    )
}

export default RegisterPage