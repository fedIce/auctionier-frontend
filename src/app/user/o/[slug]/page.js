import React, { Suspense } from 'react'
import Reciept from './Reciept'
import { LoaderBlockAnimation } from "../../../../components/util/checker"
import { use_get } from '../../../../lib/functions'
import Link from 'next/link'
// import Image from 'next/image'


export const confirmOrder = async (ref) => {
    return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/revolut/comfirm/${ref}` })
}

async function fetchAuction(slug) {
    const res = await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auction-items?where[slug][equals]=${slug}` })
    return res?.docs[0]
}

const PaymentReciept = async ({ params, searchParams }) => {
    const query = await params
    const searchQuery = await searchParams

    const auction = await confirmOrder(searchQuery['_rp_oid']).then(async () => {
        return await fetchAuction(query.slug)
    })


    return (
        <Suspense fallback={
            <div className=' w-screen h-[50vh] bg-transparent flex items-center justify-center'>
                <LoaderBlockAnimation width={50} height={50} />
            </div>
        }>
            <div className='w-full h-full flex flex-col pt-8 items-center'>
                <div className='max-w-5xl w-full flex flex-col space-y-4 items-center p-4'>
                    <div className='flex items-center space-x-2 text-lg'>
                        <div className='font-bold uppercase'>LOT #{auction?.lotId?.split("-")[1] ?? ''}</div>
                        <div>is yours!</div>
                    </div>
                    <div className='text-sm'>We're preparing your order for shipping...</div>
                    <Link href={`/user/favourites`} className='px-4 py-2 cursor-pointer bg-secondary text-background'>
                        Continue
                    </Link>
                    <Reciept auction={auction} />
                </div>
                {/* <Image src={'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXZzZHJoazUzaWZ3MGh5eTA2aXp3bHdiYjE5MjN4OGJtcnhjaWFsYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/DzhpZDEQij5UrMYk5u/giphy.gif'}
                    className='fixed w-screen h-screen z-[9999999999999] top-0 left-0 object-cover' width={1000} height={1000} /> */}
            </div>
        </Suspense>
    )
}

export default PaymentReciept


