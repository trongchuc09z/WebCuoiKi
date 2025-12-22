import React, { memo } from 'react'


const Button = ({ text, textColor, bgColor, IcAfter, onClick, fullWidth, px, IcBefore }) => {
    return (
        <button
            type='button'
            className={`py-2 ${px ? px : 'px-2'} ${textColor} ${bgColor} ${fullWidth && 'w-full'} outline-none rounded-md flex items-center justify-center gap-1 btn-primary font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0`}
            onClick={onClick}
        >
            {IcBefore && <span className="transition-transform duration-300"><IcBefore /></span>}
            <span className='text-center'> {text}</span>
            {IcAfter && <span className="transition-transform duration-300"><IcAfter /></span>}

        </button>
    )
}

export default memo(Button)