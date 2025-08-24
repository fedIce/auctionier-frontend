'use client'
import RevolutCheckout from '@revolut/checkout'
import { useEffect, useState } from 'react'
import { use_get, use_post } from '../../../../lib/functions'

export const confirmOrder = async (ref) => {
    return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/revolut/comfirm/${ref}` })
}

export const MountRevolut = ({ data }) => {
    useEffect(() => {
        if (document) {
            init()
        }
    }, [])

    const createOrder = async (data) => {
        return await use_post({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/revolut/create-order`, data })
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
            redirectUrls: {
                success: `${process.env.NEXT_PUBLIC_APP_URL}/user/o/${data.order.slug}`,
                // failure: 'https://www.example.com/failure',
                // cancel: 'https://www.example.com/cancel'
            },

            createOrder: async () => {
                const order = await createOrder({
                    ...data,
                    amount: paymentOptions.totalAmount,
                    currency: paymentOptions.currency,
                    merchant_order_data: {
                        reference: data.orderRef
                    }
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

export const CheckoutWithPi = ({ amount = 1 }) => {

    const [piLoaded, setPiLoaded] = useState(false);


    useEffect(() => {

        let intervalId;

        const checkPi = async () => {
            if (typeof window !== "undefined" && window.Pi && !piLoaded) {
                window.Pi.init({ version: "2.0", sandbox: true });

                const scopes = ["payments", "username"];

                function onIncompletePaymentFound(payment) {

                    console.log("Found incomplete payment:", payment);
                    // if (payment?.transaction?.txid) {
                    //     return use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pipayments/complete/${payment.identifier}/${payment.transaction.txid}`, token: auth.user?.token }).then(res => {
                    //         console.log("Server complete response:", res);
                    //         return res
                    //     });

                    // }

                }



                const piAuth = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
                console.log('Polling PI', window.Pi)
                if (piAuth?.scopes?.includes("payments")) {
                    setPiLoaded(true);
                    clearInterval(intervalId); // 👈 stop polling once loaded
                }
                console.log('llllllllllllllllllllllllllllllllllllllll', piAuth)
            }

        }

        intervalId = setInterval(checkPi, 10000);

        return () => clearInterval(checkPi);

    }, [])



    const handlePay = async (e) => {
        e.preventDefault();
        if (typeof window === "undefined" || !window.Pi) return;

        const paymentData = {
            amount: amount, // Amount in USD
            memo: "Test purchase",
            metadata: { orderId: "ORDER-123" },
        };

        const paymentCallbacks = {
            onReadyForServerApproval: async (paymentId) => {
                return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pipayments/approve/${paymentId}` }).then(res => {
                    console.log("Server approval response:", res);
                    return res
                });
            },
            onReadyForServerCompletion: async (paymentId, txid) => {
                return await use_get({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/pipayments/complete/${paymentId}/${txid}` }).then(res => {
                    console.log("Server complete response:", res);
                    return res
                });
            },
            onCancel: (reason) => console.warn("Payment cancelled:", reason),
            onError: (err) => console.error("Payment error:", err),
        };

        try {
            const payment = await window.Pi.createPayment(paymentData, paymentCallbacks);
            console.log("createPayment ->", payment);
        } catch (e) {
            console.error("Payment failed:", e);
        }
    }

    return (<div>
        <button onClick={handlePay} className="px-4 py-2 bg-blue-600 text-white rounded">{piLoaded ? "Pay 1π" : "Loading Pi SDK..."}</button>
    </div>)
}
