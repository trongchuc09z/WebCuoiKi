import React from 'react'
import logo from '../../assets/logowithoutbg.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className='w-full bg-[#FDECEC] py-12'>
            <div className='w-4/5 mx-auto flex flex-col md:flex-row gap-8'>
                <div className='md:w-1/3 flex flex-col items-start gap-4'>
                    <img src={logo} alt='logo' className='w-24 h-24 object-contain' />
                    <p className='text-sm text-[#6B5B63]'>
                        Chuyên kết nối người yêu động vật với thú cưng. Cam kết mang đến những cơ hội để mỗi động vật có thể tìm được một ngôi nhà yêu thương.
                    </p>
                </div>

                <div className='md:w-1/3 flex flex-col items-start gap-4'>
                    <h4 className='text-[#E74F2C] font-semibold'>Khám phá</h4>
                    <ul className='flex flex-col gap-2 text-[#6B5B63]'>
                        <li><Link to='/' className='hover:text-[#E74F2C]'>Trang chủ</Link></li>
                        <li><button type='button' className='text-left hover:text-[#E74F2C]'>Nhận nuôi</button></li>
                        <li><button type='button' className='text-left hover:text-[#E74F2C]'>Tin tức</button></li>
                        <li><button type='button' className='text-left hover:text-[#E74F2C]'>Hướng dẫn</button></li>
                        <li><button type='button' className='text-left hover:text-[#E74F2C]'>Về chúng tôi</button></li>
                        <li><button type='button' className='text-left hover:text-[#E74F2C]'>Ủng hộ</button></li>
                    </ul>
                </div>

                <div className='md:w-1/3 flex flex-col items-start gap-4'>
                    <h4 className='text-[#E74F2C] font-semibold'>Liên hệ</h4>
                    <div className='flex items-center gap-2 text-sm text-[#6B5B63]'>
                        <span>📞</span>
                        <span>(+84)12 345 6789</span>
                    </div>
                    <div className='flex items-center gap-2 text-sm text-[#6B5B63]'>
                        <span>✉️</span>
                        <span>nguyentrongchuc2k4.@gmail.com</span>
                    </div>
                    <div className='flex items-start gap-2 text-sm text-[#6B5B63]'>
                        <span>📍</span>
                        <span>Km 10 đường Nguyễn Trãi, phường Mộ Lao, quận Hà Đông, Hà Nội, Việt Nam</span>
                    </div>
                    <div className='flex items-center gap-3 mt-4'>
                        <button aria-label='facebook' className='w-8 h-8 rounded bg-white flex items-center justify-center text-[#6B5B63] shadow-sm'>f</button>
                        <button aria-label='instagram' className='w-8 h-8 rounded bg-white flex items-center justify-center text-[#6B5B63] shadow-sm'>in</button>
                        <button aria-label='youtube' className='w-8 h-8 rounded bg-white flex items-center justify-center text-[#6B5B63] shadow-sm'>yt</button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
