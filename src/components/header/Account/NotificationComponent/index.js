import { BellSlashIcon } from '@heroicons/react/24/outline'
import React from 'react'

const NotificationComponent = () => {
    return (
        <div className='w-full divide-y text-secondary/60 divide-secondary/10'>
            <div className='py-4 uppercase font-thin w-full text-center'>
                UPDATES
            </div>
            <div className='w-full'>
                <div className='w-full flex text-center items-center flex-col py-8'>
                    <BellSlashIcon className='w-5 h-5'/>
                    <h4 className='font-bold text-sm'>No Updates</h4>
                    <p className='text-xs text-secondary/50'>You have no updates at this time.</p>
                </div>
            </div>
        </div>
    )
}

export default NotificationComponent