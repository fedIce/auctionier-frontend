import React from 'react'

const AInput = (props) => {
    const { label = "Input Label", type = "text", id = "button", placeholder = "Enter text here", disabled=false, required = false, is_text_area = null, value = '', setvalue = () => null, className = "bg-secondary-900 border-gray-300 focus:border-secondary-500 focus:ring-secondary-500", error = null } = props
    return (
        <div className="m-0">
            {label && <label className={`block mb-2 text-sm font-medium ${error ? 'text-red-900' : 'text-secondary-500'} `}>{label}</label>}
            {error && <p className='text-xs text-red-500 pb-1'>{error}</p>}
            {
                !is_text_area ?
                    <input {...props} value={value} onChange={(e) => setvalue(e.target.value)} type={type} id={id} disabled={disabled} className={`border text-sm ${disabled?'text-secondary-700 cursor-not-allowed':'text-secondary'}  block w-full placeholder:text-secondary-200 p-2.5 ${className}`} placeholder={placeholder} required={required} />
                    :
                    <textarea  {...props} value={value} onChange={(e) => setvalue(e.target.value)} type={type} id={id} disabled={disabled} className={`border text-sm ${disabled?'text-secondary-700 cursor-not-allowed':'text-secondary'}  w-full placeholder:text-secondary-200 p-2.5 ${className}`} placeholder={placeholder} required={required} />

            }
        </div>
    )
}

export default AInput