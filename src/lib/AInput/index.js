import React from 'react'

const AInput = (props) => {
    const { label = "Input Label", type = "text", id = "button", placeholder = "Enter text here", required = false, is_text_area = null, value = '', setvalue = () => null, className = "bg-secondary border-gray-300 text-gray-900 focus:border-third-500 focus:ring-third-500", error = null } = props
    return (
        <div className="m-0">
            {label && <label className={`block mb-2 text-sm font-medium ${error ? 'text-red-900' : 'text-gray-900'} `}>{label}</label>}
            {error && <p className='text-xs text-red-500 pb-1'>{error}</p>}
            {
                !is_text_area ?
                    <input {...props} value={value} onChange={(e) => setvalue(e.target.value)} type={type} id={id} className={`border text-sm rounded-lg block w-full p-2.5 ${className}`} placeholder={placeholder} required={required} />
                    :
                    <textarea  {...props} value={value} onChange={(e) => setvalue(e.target.value)} type={type} id={id} className={`border text-sm rounded-lg w-full p-2.5 ${className}`} placeholder={placeholder} required={required} />

            }
        </div>
    )
}

export default AInput