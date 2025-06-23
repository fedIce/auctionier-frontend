'use client'
import RevolutCheckout from '@revolut/checkout'
import { useEffect } from 'react'
import { use_get, use_post } from '../../../../lib/functions'

export const MountRevolut = ({ data }) => {
    useEffect(() => {
        if (document) {
            init()
        }
    }, [])

    const createOrder = async (data) => {
        return await use_post({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/revolut/create-order`, data })
    }

    const confirmOrder = async (ref) => {
        return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/revolut/comfirm/${ref}`})
    }

    const init = async () => {
        const { revolutPay } = await RevolutCheckout.payments({
            publicToken: 'pk_RMUKzZBHgafCFB33iXHg6AS0jT9FRjAbgjCOPj1DIGip3B31',
            mode: 'sandbox'
        })

        // 2. Configure payment options with redirects
        const paymentOptions = {
            currency: data.currency,
            totalAmount: data.totalAmount,
            // redirectUrls: {
            //     success: 'https://www.example.com/success',
            //     failure: 'https://www.example.com/failure',
            //     cancel: 'https://www.example.com/cancel'
            // },

            createOrder: async () => {
                const order = await createOrder({
                    ...data,
                    amount: paymentOptions.totalAmount,
                    currency: paymentOptions.currency,
                })
                return { publicId: order.token }
            },

            // You can put other optional parameters here
        }

        console.log('MOUNTING REVOLUTE')

        // 3. Mount the button
        revolutPay.mount(document.getElementById('revolut-pay'), paymentOptions)
        const div = document.getElementById('revolut-pay');

        if (div && div.children.length > 1) {
            // Hide the third child (index 2, as it's zero-based)
            div.children[1].style.display = 'none';
        }

        revolutPay.on('payment', (event) => {
            switch (event.type) {
                case 'cancel': {
                    if (event.dropOffState === 'payment_summary') {
                        console.log('what a shame, please complete your payment')
                    }
                    break
                }

                case 'success':
                    console.log(`Event success orderId `, event)
                    confirmOrder(event.orderId)
                    break

                case 'error':
                    console.error('CHECKOUt ERROR; ', event.error)
                    break
            }
        })

        return (<div className='w-full h-32 bg-amber-950'></div>)
    }
}
