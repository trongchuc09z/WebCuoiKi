import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/Common/formatVietnameseToString'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { path } from '../../ultils/constant'


// non-active: keep background hover but change text color on hover to the requested accent
const notActive = 'hover: px-4 h-full flex items-center transition-all duration-300 transform hover:scale-105 relative overflow-hidden hover:text-[#E74F2C]'
// active nav item should show the accent color
const active = 'hover: px-4 h-full flex items-center transition-all duration-300 scale-105 text-[#E74F2C]'

const Navigation = ({ isAdmin }) => {

    const dispatch = useDispatch()
    const { categories } = useSelector(state => state.app)
    const { currentData } = useSelector(state => state.user)
    const location = useLocation()
    useEffect(() => {
        dispatch(actions.getCategories())
    }, [])
    // scroll to top on route change (covers clicks and programmatic navigation)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [location.pathname])
    return (
        <div className={`w-full flex ${isAdmin ? 'justify-start' : 'justify-center'} items-center h-[40px] bg-gradient-to-r from-secondary1 to-blue-600 text-[#58546A]  animate-slide-down`}>
            <div className='w-4/5 flex h-full items-center text-base font-semibold'>
                <NavLink
                    to={`/`}
                    className={({ isActive }) => isActive ? active : notActive}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Trang chủ
                </NavLink>
                {categories?.length > 0 && categories.map(item => {
                    return (
                        <div key={item.code} className='h-full flex justify-center items-center' >
                            <NavLink
                                to={`/${formatVietnameseToString(item.value)}`}
                                className={({ isActive }) => isActive ? active : notActive}
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                {item.value}
                            </NavLink>
                        </div>
                    )
                })}
                <NavLink
                    to={path.CONTACT}
                    className={({ isActive }) => isActive ? active : notActive}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Liên hệ
                </NavLink>
                {currentData.id && <NavLink
                    to={`/${path.WISHLIST}`}
                    className={({ isActive }) => isActive ? active : notActive}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Bài đăng yêu thích
                </NavLink>}
            </div>
        </div>
    )
}

export default Navigation