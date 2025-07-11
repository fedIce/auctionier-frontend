'use client'
import React, { useState } from 'react'
import AInput from '../../../../lib/AInput'
import AButton from '../../../../lib/AButton'
import { useAuth } from '../../../../contexts/auth'

const LoginPage = () => {

    const auth = useAuth()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const handleLogin = async () => {
        setLoading(true)
        await auth.login({ email, password }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className='w-full px-4 lg:px-0 lg:max-w-[25vw]'>
            <section className='py-8'>
                <h3 className='font-bold text-2xl'>Login</h3>
            </section>
            <section className='space-y-4'>
                <section>
                    <AInput setvalue={setEmail} value={email} label="email" type="email" />
                </section>
                <section>
                    <AInput setvalue={setPassword} value={password} label="Password" type="password" />
                    <p className='text-xs underline text-bright py-2'>Forgot your password?</p>
                </section>
                <section>
                    <AButton loading={loading} text="Login" btn_action={() => handleLogin()} />
                </section>
            </section>
        </div>
    )
}

export default LoginPage