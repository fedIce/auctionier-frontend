'use client'
import { forwardRef, useRef, useState } from 'react'
import policy from './_.json'
import { ChevronUpIcon } from '@heroicons/react/24/outline'

const { privacy_policy: p } = policy


const PrivacyPolicy = () => {
    const refs = p.sections.map(_ => useRef())
    return (
        <div className='w-full py-4 space-y-8 px-2 lg:px-0'>
            <div>
                <div className='w-full text-end'>Last updated {p.last_updated}</div>
                <div className='w-full space-y-4'>
                    <div className='w-full text-4xl font-bold uppercase'>Introduction</div>
                    <div>{p.introduction}</div>
                </div>
            </div>
            <div className='w-full left-0 flex items-start top-0 '>
                <div className='w-[30%] space-y-8 h-full hidden lg:block'>
                    {
                        p.sections.map((section, i) => {
                            return (
                                <div onClick={() => refs[i].current.scrollIntoView({ behavior: 'smooth', block: 'start' })} key={i} className='w-full hover:underline hover:text-third-200 hover:font-bold cursor-pointer'>
                                    {section.title}
                                </div>
                            )
                        })
                    }
                </div>
                <div className={`flex flex-1 flex-col w-full max-h-[80vh] h-full overflow-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']`}>
                    {
                        p.sections.map((section, i) => {
                            return (
                                <PBlock key={i} ref={refs[i]} section={section} />
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

    return (
        <div ref={ref} className='w-full py-4 space-y-2 px-2 lg:px-0 bg-secondary-900 lg:bg-transparent my-2 rounded border lg:border-none border-secondary/10'>
            <div className='w-full hidden lg:block capitalize font-extrabold text-2xl'>{section.title}</div>

            <div onClick={() => setShowBlock(!showBlock)} className='w-full flex lg:hidden justify-between items-center'>
                <div className='w-full capitalize font-extrabold max-w-[80%] text-2xl'>{section.title}</div>
                <ChevronUpIcon className={`w-5 h-5 stroke-2 transition-transform duration-150 ${!showBlock? 'rotate-180':'rotate-0'}`} />
            </div>
            <div className={`w-full overflow-y-hidden  ${showBlock ? 'h-auto lg:h-auto' : 'h-0 lg:h-auto'}`}>

                {
                    typeof section.content === 'string' ?
                        <div >{section.content}</div>
                        : !Array.isArray(section.content) && typeof section.content === 'object' ?
                            Object.keys(section.content).map((sec_c, i) => {
                                return (
                                    <div key={i} className='w-full py-4 space-y-2'>
                                        <div className='w-full capitalize font-bold text-lg'>
                                            {sec_c.split("_").join(' ')}
                                        </div>
                                        <div>
                                            {
                                                Array.isArray(section.content[sec_c]) ?
                                                    <ol className=' list-outside list-disc' >
                                                        {section.content[sec_c].map((c, i) => {
                                                            return (<div key={i}>{c}</div>)
                                                        })}
                                                    </ol>
                                                    : typeof section.content[sec_c] === 'object' ?
                                                        Object.keys(section.content[sec_c]).map((sec_item, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    <div className='w-full capitalize font-bold text-red-500 text-base'>
                                                                        {sec_item.split("_").join(' ')}
                                                                    </div>
                                                                    <div>
                                                                        {section.content[sec_c][sec_item]}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                        :
                                                        <div>
                                                            {section.content[sec_c]}
                                                        </div>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                            :
                            Array.isArray(section.content) ?
                                <ol className=' list-outside list-disc' >
                                    {section.content.map((text, i) => {
                                        return (<div key={i}>{text}</div>)
                                    })
                                    }
                                </ol>
                                : null
                }
            </div>

        </div>
    )
})
