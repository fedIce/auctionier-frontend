'use client'
import { forwardRef, useEffect, useRef, useState } from 'react'
import policy from './_.json'
import { PlusIcon } from '@heroicons/react/24/outline'

const { cookie_policy: p } = policy

const PrivacyPolicy = () => {
    const refs = useRef([])
    const [activeCategory, setActiveCategory] = useState(1);

    useEffect(() => {
        refs.current = refs.current.slice(0, p.categories.length);
    }, [p.categories.length]);


    return (
        <div k className='w-full py-4 space-y-8 px-2 lg:px-0 mb-40'>
            <div className='w-full my-4'>
                <div className='w-full text-end'>Last updated {p.last_updated}</div>
                <div className='w-full space-y-4'>
                    <div className='w-full text-4xl font-bold uppercase text-center'>FAQ</div>
                    <div>{p.introduction}</div>
                </div>
            </div>
            <div className='w-full left-0 flex items-start top-0 '>
                <div className='w-[30%] space-y-8 h-full block'>
                    {
                        p.categories.map((section, i) => {
                            return (
                                <div onClick={() => setActiveCategory(i + 1)} key={i} className={`w-full hover:underline hover:text-third-200 hover:font-bold cursor-pointer ${activeCategory == (i + 1) ? 'font-bold text-third-200 underline' : ''}`}>
                                    {section.title}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`flex flex-1 flex-col w-full max-h-[80vh] h-full overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
                    {
                        p.questions.filter(i => i.category_id == activeCategory).map((section, i) => {
                            return (
                                <PBlock key={i} ref={el => refs.current[i] = el} section={section} />
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default PrivacyPolicy


const PBlock = forwardRef(({ section }, ref) => {

    const [showBlock, setShowBlock] = useState(false);

    useEffect(() => {
        setShowBlock(false);
    }, [section])

    return (
        <div ref={ref} className='w-full py-4 space-y-2 px-2 lg:px-0 bg-secondary-900 lg:bg-transparent my-2 rounded border lg:border-none border-secondary/10 pr-2 md:pr-0'>
            {/* <div className='w-full hidden lg:block capitalize font-extrabold text-2xl'>{section.title.split('.')[1]}</div> */}

            <div onClick={() => setShowBlock(!showBlock)} className='w-full flex flex-col justify-between items-center'>
                <div className='w-full flex justify-between items-center'>
                    <div className='w-full capitalize font-extrabold max-w-[80%] text-lg lg:text-2xl'>{section.question}</div>
                    <PlusIcon className={`w-5 h-5 stroke-2 transition-transform duration-150 ${!showBlock ? 'rotate-0' : 'rotate-45'}`} />
                </div>
                <div className={`w-full text-justify overflow-hidden ${showBlock ? 'h-full' : 'h-0'}`}>{section.answer}</div>
            </div>


        </div>
    )
})

PBlock.displayName = 'PBlock'