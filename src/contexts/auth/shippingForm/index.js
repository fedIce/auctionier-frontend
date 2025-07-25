'use client'
import React, { useEffect, useState } from 'react'
import AInput from '../../../lib/AInput'
import { LoaderSpinnerAnimation } from '../../../components/util/checker'

const AShippinForm = ({ hide, auth }) => {

    const user = auth.user?.user

    const [email, setEmail] = useState('')
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [phone, setPhone] = useState('')
    const [address_1, setAddress_1] = useState('')
    const [address_2, setAddress_2] = useState('')
    const [city, setCity] = useState('')
    const [region, setRegion] = useState('')
    const [postal, setPostal] = useState('')
    const [country, setCountry] = useState('Cyprus')
    const [loading, setLoading] = useState(false)
    const [shipping_doc_id, setShipping_doc_id] = useState(false)

    useEffect(() => {


        if (user) {
            auth.getShippingData(user.id).then((res) => {
                const data = res?.docs[0]
                setEmail(user.email)
                setFirstName(user.fullname.split(" ")[0])
                setLastName(user.fullname.split(" ")[1])
                setPhone(user.phone)

                if (data) {
                    setAddress_1(data.address.split("-")[0])
                    setAddress_2(data.address.split("-")[1])
                    setCity(data.city)
                    setCountry(data.country)
                    setRegion(data.region)
                    setPostal(data.postal)
                    setShipping_doc_id(data.id)
                    auth.setShippingInfo(data)
                }
            })
        }

        return () => null

    }, [])

    const handleSubmit = () => {
        const req = {
            user: user.id,
            phone: phone,
            address: `${address_1}-${address_2}`,
            city,
            region,
            postal,
            country
        }

        if (shipping_doc_id) {
            req.shipping_doc_id = shipping_doc_id
        }

        auth.setShippingInfo(req)

        setLoading(true)
        auth.saveShippingInfo(req).then((e) => {
            if (e == null) return
            setTimeout(() => {
                hide(false)
            }, 1000)
        }).finally(() => setLoading(false))
    }


    return (
        <div className='w-full  space-y-4 max-w-md bg-transparent py-4'>
            <div className='flex items-start space-x-4'>
                <div className='flex-1'><AInput disabled value={firstname} setvalue={setFirstName} label={"First Name"} /></div>
                <div className='flex-1'><AInput disabled value={lastname} setvalue={setLastName} label={"Last Name"} /></div>
            </div>
            <div className='flex items-start space-x-4'>
                <div className='flex-1'><AInput disabled value={email} setvalue={setEmail} label={"Email"} type='email' /></div>
                <div className='flex-1'><AInput value={phone} setvalue={setPhone} label={"Phone Number"} type='tel' /></div>
            </div>
            <div className='flex-1'><AInput value={address_1} setvalue={setAddress_1} label={"Address"} placeholder={`Street Address`} /></div>
            <div className='flex-1'><AInput value={address_2} setvalue={setAddress_2} label={""} placeholder={`Street Address Line 2`} /></div>
            <div className='flex items-start space-x-4'>
                <div className='flex-1'><AInput value={city} setvalue={setCity} label={""} placeholder={`City`} /></div>
                <div className='flex-1'><AInput value={region} setvalue={setRegion} label={""} placeholder={`Region`} /></div>
            </div>
            <div className='flex items-start space-x-4'>
                <div className='flex-1'><AInput value={postal} setvalue={setPostal} label={""} placeholder={`Postal / Zip Code`} /></div>
                <div className='flex-1'><AInput disabled value={country} setvalue={setCountry} label={""} placeholder={`Country`} /></div>
            </div>
            <div onClick={() => handleSubmit()} className='flex bg-secondary items-center mt-4 justify-center'>
                {loading ?
                    <LoaderSpinnerAnimation />
                    :
                    <p className=' text-background text-center py-4 cursor-pointer'>Save</p>
                }
            </div>
        </div>
    )
}

export default AShippinForm