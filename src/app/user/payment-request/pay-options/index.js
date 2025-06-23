'use client'
import React, { useRef, useState } from 'react'
import { RevolutePay } from '../../../../lib/AButton'
import { MountRevolut } from '../checkout'
import { useAuth } from '../../../../contexts/auth'

const options = {
    creditCard: 'credit-card',
    applePay: 'apple-pay',
    payPal: 'paypal',
    revolut: 'revolut'
}

const PayOptions = ({ data }) => {

    const [selected, setSelected] = useState(options.revolut)

    const myRef = useRef(null)
    const auth = useAuth()

    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })


    return (
        <section ref={myRef} className='w-full flex flex-col lg:flex-row items-start space-x-4 py-8'>
            <MountRevolut data={{ ...data, shipping: auth.shippingInfo }} />

            <div className='w-full lg:w-[25%] pb-4 lg:pb-0'>
                <h4 className='text-2xl font-medium'>Pay With</h4>

            </div>
            <div className='max-w-2xl w-full divide-y divide-bright/10 space-y-8'>
                {/* <CreditCardOption selectOption={setSelected} option={selected} />
                <PayPalOption selectOption={setSelected} option={selected} />
                <ApplePayOption selectOption={setSelected} option={selected} /> */}
                <RevolutPayOption selectOption={setSelected} option={selected} />
            </div>
            <section className='flex lg:hidden fixed left-0 bottom-0 w-screen items-center justify-start px-2 py-4 bg-background border-t border-third'>
                <div className='flex-1 px-2 overflow-hidden'>
                    <p onClick={() => executeScroll()} className='px-2 py-4 overflow-hidden bg-secondary h-full flex justify-center items-center'>
                        Pay
                    </p>
                </div>
            </section>
        </section>
    )
}

export default PayOptions

// const CreditCardOption = ({ selectOption, option }) => {
//     return (
//         <OptionBlock selectOption={selectOption} option={options.creditCard} active={options.creditCard === option}>
//             <div className="flex items-center space-x-2">
//                 <CreditCardIcon className="w-7 h-7" />
//                 <h4 className="font-semibold">Credit Card Payment</h4>
//             </div>
//             <div className='w-full space-y-2'>
//                 <div className="flex flex-col space-y-2 w-full bg-bright text-background p-2 px-4">
//                     <h4>CARD HOLDER&apos;S NAME</h4>
//                     <input placeholder='John Doe SMith' />
//                 </div>
//                 <div className="flex flex-col w-full space-y-2 bg-bright text-background p-2 px-4">
//                     <h4>CARD DETAILS</h4>
//                     <div className='flex w-full items-center justify-between'>
//                         <input placeholder='Card Number' />
//                         <input placeholder='MM/YY CVV' className='text-end text-sm' />
//                     </div>
//                 </div>
//                 <div>
//                     <p className='text-sm'>Always ready to bid</p>
//                     <p className='text-xs text-gray-400'>By saving this card, you agree to us charging this card for future payments, bid reservations and auction fees.</p>
//                 </div>
//             </div>
//         </OptionBlock>
//     )
// }

// const PayPalOption = ({ selectOption, option }) => {
//     return (
//         <OptionBlock selectOption={selectOption} option={options.payPal} active={options.payPal === option}>
//             <div className="flex items-center space-x-2">
//                 <PayPalIcon className="w-7 h-7" />
//                 <h4 className="font-semibold">PayPal</h4>
//             </div>
//             <div className='w-full space-y-2'>
//                 <div>
//                     <p className='text-xs text-gray-400'>You'll be redirected to the PayPal site to complete your payment.</p>
//                 </div>
//             </div>
//         </OptionBlock>
//     )
// }

// const ApplePayOption = ({ selectOption, option }) => {
//     return (
//         <OptionBlock selectOption={selectOption} option={options.applePay} active={options.applePay === option}>
//             <div className="flex items-center space-x-2">
//                 <ApplePayIcon className="w-7 h-7" />
//                 <h4 className="font-semibold">Apple Pay</h4>
//             </div>
//             <div className='w-full space-y-2'>
//                 <div>
//                     <p className='text-xs text-gray-400'>You'll be redirected to complete your payment.</p>
//                 </div>
//             </div>
//         </OptionBlock>
//     )
// }

const RevolutPayOption = ({ selectOption, option }) => {
    return (
        <OptionBlock selectOption={selectOption} option={options.revolut} active={options.revolut === option}>
            <div className="flex items-center space-x-2">
                <RevolutePay className="w-7 h-7" />
                <h4 className="font-semibold">Revolut Pay</h4>
            </div>
            <div id='revolut-pay' className='w-full space-y-2'>
            </div>
        </OptionBlock>
    )
}

const OptionBlock = ({ selectOption = () => null, option = null, active = true, children }) => {
    return (
        <div className='flex items-start w-full py-4'>
            <div className={`flex items-start space-x-4 w-full`}>
                <div onClick={() => selectOption(option)} className='w-5 h-5 cursor-pointer aspect-square  bg-bright rounded-full flex items-center justify-center'>
                    <div className={`w-3 aspect-square transition-colors duration-300 ${active ? 'bg-background' : 'bg-transparent'} h-3 rounded-full flex items-center justify-center`}>

                    </div>
                </div>
                <div className={`w-full space-y-4 transition-transform duration-300 overflow-hidden ${active ? 'max-h-max' : 'max-h-10'} `}>
                    {children}
                </div>
            </div>
        </div>
    )
}