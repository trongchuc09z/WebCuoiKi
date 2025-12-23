import React, { useEffect, useRef } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import {  Search } from './index'
import { Intro, Contact } from '../../components'
import Footer from './Footer'
import { path } from '../../ultils/constant'


const Home = () => {
    const location = useLocation()
    
    return (
        <div className='w-full flex gap-6 flex-col  items-center h-full bg-[#fdf5ed]'>
            <Header />
            
            {location.pathname !== `/${path.CONTACT}` && location.pathname !== `/${path.LOGIN}` && !location.pathname?.includes(path.DETAIL) && !location.pathname?.includes(path.WISHLIST) && <Search />}
            <div className='w-4/5 lg:w-3/5 flex flex-col items-start justify-start mt-3'>
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <div className='h-[100px]'></div>
            <Footer />
        </div>
    )
}

export default Home