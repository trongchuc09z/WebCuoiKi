// client/src/components/RecentlyViewed.js
import React, { useState, useEffect } from 'react';
import { Sitem } from './index'; // Tận dụng component Sitem có sẵn để hiển thị cho đẹp

const RecentlyViewed = () => {
    const [viewedPosts, setViewedPosts] = useState([]);

    useEffect(() => {
        // Lấy dữ liệu từ LocalStorage khi component mount
        const storedPosts = JSON.parse(localStorage.getItem('recently_viewed_posts'));
        if (storedPosts) {
            setViewedPosts(storedPosts);
        }
    }, []);

    if (viewedPosts.length === 0) return null; // Không có gì thì không hiện

    return (
        <div className='w-full border p-4 rounded-md bg-white shadow-sm mt-4'>
            <h3 className='text-lg font-semibold mb-4 text-gray-700'>Tin đã xem gần đây</h3>
            <div className='grid grid-cols-1 gap-4'> 
                {/* Bạn có thể đổi grid-cols-1 thành grid-cols-3 nếu để ở trang chủ to */}
                {viewedPosts?.map(item => (
                    <Sitem
                        key={item.id}
                        title={item.title}
                        price={item?.attributes?.price}
                        image={JSON.parse(item?.images)} // Cần parse nếu ảnh lưu dạng chuỗi JSON
                        createdAt={item?.attributes?.published}
                        id={item.id}
                        star={item.star}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentlyViewed;