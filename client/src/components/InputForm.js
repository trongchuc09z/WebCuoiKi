import React, { memo } from 'react'

const InputForm = ({ label, value, setValue, keyPayload, invalidFields, setInvalidFields, type }) => {
    return (
        <div className='animate-fade-in-up'>
            <label htmlFor={keyPayload} className='text-xs font-semibold text-gray-700 mb-1 block' >{label}</label>
            <input
                type={type || 'text'}
                id={keyPayload}
                className='outline-none bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-lg w-full border-2 border-transparent focus:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md'
                value={value}
                onChange={(e) => setValue(prev => ({ ...prev, [keyPayload]: e.target.value || '' }))}
                onFocus={() => setInvalidFields && setInvalidFields([])}
            />
            {invalidFields?.some(i => i.name === keyPayload) && <small className='text-red-500 italic animate-shake block mt-1' >{invalidFields.find(i => i.name === keyPayload)?.message}</small>}
        </div>
    )
}

export default memo(InputForm)