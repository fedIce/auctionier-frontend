import React from 'react'

const Payment = () => {



    
    return (
        <section  className='w-full flex flex-col lg:flex-row items-start space-x-4 py-8'>
            <div className='w-full lg:w-[25%] pb-4 lg:pb-0'>
                <h4 className='text-2xl font-medium'>Total Payment</h4>
            </div>
            <div className='max-w-2xl w-full space-y-4'>
                <div className='flex flex-col  w-full py-4 text-sm divide-y divide-dashed divide-bright/10  font-light'>
                    <div className='flex items-center justify-between py-4'>
                        <p>Hammer Price</p>
                        <p>€ 1</p>
                    </div>
                    <div className='flex items-center justify-between py-4'>
                        <p>Auction Fees (20%)</p>
                        <p>€ 1</p>
                    </div>
                    <div className='flex items-center justify-between py-4'>
                        <p>VAT</p>
                        <p>€ 1</p>
                    </div>
                    <div className='flex items-center justify-between py-4'>
                        <p>Delivery / Shipping</p>
                        <p>€ 1</p>
                    </div>
                    <div className='flex items-center text-base font-medium justify-between py-4'>
                        <p>Total Price</p>
                        <p>€ 5</p>
                    </div>
                </div>
                <div className='flex items-center mt-4 justify-between'>
                    <p className='flex-1 bg-bright text-background text-center py-4 cursor-pointer'>Pay</p>
                </div>
            </div>
           
        </section>
    )
}

export default Payment