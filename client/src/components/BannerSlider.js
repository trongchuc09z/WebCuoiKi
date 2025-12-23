import React, { memo } from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { path } from '../ultils/constant';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerData = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&h=400&fit=crop',
        title: 'Cho thuê căn hộ',
    description: 'Hàng nghìn căn hộ chất lượng, từ studio tới căn hộ cao cấp; đa dạng mức giá và vị trí thuận tiện gần trung tâm, nhiều tiện ích xung quanh — phù hợp cho sinh viên, cặp đôi hoặc gia đình tìm chỗ ở lâu dài.',
        link: `/${path.CHO_THUE_CAN_HO}`
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=400&fit=crop',
        title: 'Cho thuê mặt bằng',
    description: 'Mặt bằng kinh doanh mặt tiền, vị trí đắc địa và lưu lượng khách cao; nhiều lựa chọn diện tích, hỗ trợ thủ tục thuê nhanh chóng và các phương án thuê phù hợp với cửa hàng, quán cafe hoặc văn phòng.',
        link: `/${path.CHO_THUE_MAT_BANG}`
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=400&fit=crop',
        title: 'Cho thuê phòng trọ',
    description: 'Phòng trọ giá phải chăng, sạch sẽ và đầy đủ nội thất cơ bản; an ninh đảm bảo, nhiều lựa chọn gần trường học và khu công nghiệp, thông tin được cập nhật liên tục kèm hình ảnh và liên hệ rõ ràng.',
        link: `/${path.CHO_THUE_PHONG_TRO}`
    },
    {
        id: 4,
        image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&h=400&fit=crop',
        title: 'Nhà cho thuê',
    description: 'Nhà nguyên căn cho thuê với nhiều lựa chọn từ nhà phố tới biệt thự nhỏ; thông tin minh bạch, giá cả hợp lý và phù hợp cho gia đình hoặc doanh nghiệp nhỏ cần không gian riêng.',
        link: `/${path.NHA_CHO_THUE}`
    },
    {
        id: 5,
        image: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=400&fit=crop',
        title: 'Liên hệ',
    description: 'Liên hệ để được tư vấn 24/7, hỗ trợ đăng tin nhanh và tối ưu hiển thị, giúp kết nối người thuê và chủ nhà hiệu quả; đội ngũ hỗ trợ luôn sẵn sàng giải đáp mọi thắc mắc.',
        link: `/${path.CONTACT}`
    }
];

const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    fade: true,
    cssEase: 'linear'
};

const BannerSlider = () => {
    return (
    <div className='relative left-1/2 right-1/2 -translate-x-1/2 w-screen mb-6 rounded-lg overflow-hidden shadow-lg'>
            <Slider {...settings}>
                {bannerData.map((banner) => (
                    <div key={banner.id} className='relative'>
                        <div className='h-[300px] md:h-[400px] relative'>
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className='w-full h-full object-cover'
                            />
                            {/* Overlay */}
                            <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-black/20'></div>
                            
                            {/* Content */}
                            <div className='absolute inset-0 flex flex-col justify-center items-start px-14 md:px-56'>
                                <h2 className='text-white text-3xl md:text-5xl font-bold mb-4 animate-fadeIn'>
                                    {banner.title}
                                </h2>
                                <p className='text-white text-lg md:text-xl mb-6 animate-fadeIn'>
                                    {banner.description}
                                </p>
                                {/* <Link 
                                    to={banner.link}
                                    className='bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105'
                                >
                                    Xem ngay
                                </Link> */}
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default memo(BannerSlider)
