'use client';
import React from 'react'
import { Input } from '@/components/Input/index.js'
import { TextArea } from '@/components/TextArea/index.js'
import { DropMenu } from '@/components/DropMenu/index.js'
import DateTimePicker from '@/components/DateTimePicker/index.js'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import TagInput from '../../../../components/MultiInput';
import MultiImageUploader from '@/components/MultiImageUploader';


const NewLot = () => {
    return (
        <div>
            {/* Seller --HIDDEN */}
            {/* Status --HIDDEN */}
            {/* Authenticity Verified --HIDDEN */}
            {/* Bid ID --HIDDEN */}
            {/* Slug --HIDDEN */}
            {/* Active --HIDDEN */}

            {/* Title */}
            <InputBlock label={'Basic Information'}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <Input label={'Lot Title'} type='text' placeholder='Enter the title of your lot' className={` col-span-2`} />
                    <DropMenu label={'Lot Category'} type='text' placeholder='Enter the title of your lot' />
                    <DropMenu label={'Lot Sub Category'} type='text' placeholder='Enter the title of your lot' />
                    <DropMenu label={'Auction Type'} type='text' placeholder='Enter the title of your lot' />
                    <DropMenu label={'Brand'} type='text' placeholder='Enter the title of your lot' />
                    <TextArea label={'Description'} type='text' placeholder='Enter the title of your lot' />

                </div>
            </InputBlock>

            <InputBlock label={'Condition Information'}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <DropMenu label={'Condition'} type='text' placeholder='Enter the title of your lot' />
                    <DropMenu label={'Condition Rating'} type='text' placeholder='Enter the title of your lot' />
                    <TextArea label={'Condition Details'} type='text' placeholder='Enter the title of your lot' />
                </div>
            </InputBlock>

            <InputBlock label={'Item Deails'}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>

                </div>
            </InputBlock>

            <InputBlock label={'Pricing & Auction'}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-4'>
                    <Input label={'Reserve Price'} type='currency' placeholder='Enter the title of your lot' className={` col-span-2`} />
                    <Input label={'Starting Bid'} type='currency' placeholder='Enter the title of your lot' className={` col-span-2`} />
                    <DateTimePicker label={'Start'} />
                    <DateTimePicker label={'End'} />
                    <TagInput />
                </div>
            </InputBlock>
            <InputBlock label={'Images'}>
                <MultiImageUploader />
            </InputBlock>
            {/* Category */}

            {/* Sub Category */}
            {/* Auction Type */}
            {/* Brand */}
            {/* Condition */}
            {/* Condition / Condition Rating / Condition Details*/}
            {/* Description */}
            {/* Details */}
            {/* Reserve Price */}
            {/* Buy / Now */}
            {/* Starting Bid */}
            {/* Start Date */}
            {/* End Date */}
            {/* Tags */}
            {/* Images */}
        </div>
    )
}

export default NewLot

const InputBlock = ({ label, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className={`flex flex-col w-full divide-y  my-4 border border-secondary/10 ${isOpen ? 'divide-secondary/10' : ' divide-transparent'} `}>
            <div className={`flex px-6 py-4 items-center justify-between cursor-pointer`}>
                <label className='font-bold text-secondary' htmlFor={label}>{label}</label>
                <div onClick={() => setIsOpen(!isOpen)} className='p-2'><ChevronDownIcon className={`w-4 h-4 inline-block ml-2 ${isOpen ? 'rotate-180' : 'rotate-0'}`} /></div>
            </div>
            <div className={` bg-third w-full duration-150 transition-all  ${isOpen ? 'h-auto pt-4 p-2 min-h-40 p-4' : 'h-0 overflow-hidden'}`}>
                {children}
            </div>

        </div>
    )
}