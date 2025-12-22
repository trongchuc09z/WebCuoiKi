import React, { memo } from 'react'
import { useNavigate, createSearchParams } from 'react-router-dom'
import { path } from '../ultils/constant'

const ProvinceBtn = ({ name, image, provinceCode }) => {

    const navigate = useNavigate()

    const handleOnClick = () => {
        const titleSearch = `Cho thuê ${name}, Phòng trọ giá rẻ`
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams({ provinceCode }).toString(),
        }, { state: { titleSearch } })
    }
    return (
        <div
            className='shadow-lg rounded-lg text-blue-700 cursor-pointer card-hover overflow-hidden bg-white transition-all duration-300 animate-scale-in'
            onClick={handleOnClick}
        >
            <div className='img-zoom overflow-hidden'>
                <img
                    src={image}
                    alt={name}
                    className='w-[190px] h-[110px] object-cover transition-transform duration-500'
                />
            </div>
            <div className='font-semibold p-3 text-center hover:text-orange-600 transition-colors duration-300 bg-gradient-to-t from-blue-50 to-white'>{name}</div>
        </div>
    )
}

export default memo(ProvinceBtn)