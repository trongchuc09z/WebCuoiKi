import React from 'react'
import logo from '../../assets/logowithoutbg.png'
import { NavLink } from 'react-router-dom'
import { path } from '../../ultils/constant'

const Footer = () => {
    return (
        <footer className='w-full bg-[#fee39a] py-12'>
            <div className='w-4/5 mx-auto flex flex-col md:flex-row gap-8'>
                <div className='md:w-1/3 flex flex-col items-start gap-4'>
                    <img src={logo} alt='logo' className='w-24 h-24 object-contain' />
                    <p className='text-sm text-[#6B5B63]'>
                        Chúng tôi biết bạn có rất nhiều lựa chọn, nhưng PhongtroSinhVien tự hào là trang web đứng top google về các từ khóa: cho thuê căn hộ, cho thuê mặt bằng, cho thuê phòng trọ, nhà cho thuê, ...Vì vậy tin của bạn đăng trên website sẽ tiếp cận được với nhiều khách hàng hơn, do đó giao dịch nhanh hơn, tiết kiệm chi phí hơn.
                    </p>
                </div>

                <div className='md:w-1/3 flex flex-col items-start gap-4'>
                    <h4 className='text-[#E74F2C] font-semibold'>Khám phá</h4>
                    <ul className='flex flex-col gap-2 text-[#6B5B63]'>
                        <li>
                            <NavLink to='/' className='hover:text-[#E74F2C]' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}>Trang chủ</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${path.CHO_THUE_CAN_HO}`} className='hover:text-[#E74F2C]'
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            >Cho thuê căn hộ</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${path.CHO_THUE_MAT_BANG}`} className='hover:text-[#E74F2C]'
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            >Cho thuê mặt bằng</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${path.CHO_THUE_PHONG_TRO}`} className='hover:text-[#E74F2C]'
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            >Cho thuê phòng trọ</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${path.NHA_CHO_THUE}`} className='hover:text-[#E74F2C]'
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            >Nhà cho thuê</NavLink>
                        </li>
                        <li>
                            <NavLink to={`/${path.CONTACT}`} className='hover:text-[#E74F2C]'
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                            >Liên hệ</NavLink>
                        </li>
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
                </div>
            </div>
        </footer>
    )
}

export default Footer
