'use client'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../contexts/auth'
import AShippingForm from '../../../../contexts/auth/shippingForm'


const ShippinTo = () => {

    const [edit, setEdit] = useState(false)

    const auth = useAuth()

    useEffect(() => {

    }, [])


    return (
        <section className='w-full flex flex-col lg:flex-row  items-start space-x-4 py-8'>
            <div className='w-full lg:w-[25%] pb-4 lg:pb-0'>
                <h4 className='text-2xl font-medium'>Ship To</h4>
            </div>
            <div className='max-w-2xl w-full space-y-4 relative'>
                <h4 className='font-semibold'>ADDRESS</h4>
                {
                    !edit && auth.shippingInfo ?
                        <div>
                            <p>{auth.shippingInfo.user.fullname}</p>
                            <p>{auth.shippingInfo.address.split("-").join(",")}</p>
                            <p>{auth.shippingInfo.postal}, {auth.shippingInfo.city}</p>
                            <p></p>
                            <p>{auth.shippingInfo.country}.</p>
                            <div onClick={() => setEdit(!edit)} className='flex cursor-pointer items-center space-x-2 text-bright-400'>
                                <p>Edit</p>
                                <PencilSquareIcon className='w-4 h-4' />
                            </div>
                        </div>
                        :
                        <div className='w-full top-0 left-0'>
                            <AShippingForm hide={setEdit} auth={auth} />
                        </div>
                }
            </div>
        </section>
    )
}

export default ShippinTo