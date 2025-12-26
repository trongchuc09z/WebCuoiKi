import React, { useEffect, useState } from 'react'
import { Button, Item } from '../../components'
import Loading from '../../components/Loading'
import { getPostsLimit } from '../../store/actions/post'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const List = ({ categoryCode }) => {
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const { posts } = useSelector(state => state.post)
    const { currentData } = useSelector(state => state.user)
    const [sort, setSort] = useState(0)
    const [update, setUpdate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Bước 1: Lấy tất cả params từ URL
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);// [['page', '1'], ['priceCode', 'P01'], ...]
        }

        // Bước 2: Chuyển thành object
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                // Nếu key đã tồn tại → gộp thành mảng
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                // Key mới → thêm vào object
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        // Bước 3: Thêm các filter từ props và state
        if (categoryCode) searchParamsObject.categoryCode = categoryCode
        if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC']
        if (sort === 0) searchParamsObject.order = ['title', 'DESC']
        // Bước 4: Gọi API
        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams, categoryCode, sort, update])

    return (
        <div className='w-full p-2 bg-white shadow-md rounded-md px-6'>
            <div className='flex items-center justify-between my-3'>
                <h4 className='text-xl font-semibold'>Danh sách tin đăng</h4>
            </div>
            <div className='flex items-center gap-2 my-2'>
                <span>Sắp xếp:</span>
                <span onClick={() => { setLoading(true); setSort(0); setTimeout(() => setLoading(false), 600); }} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'text-red-500'}`}>Mặc định</span>
                <span onClick={() => { setLoading(true); setSort(1); setTimeout(() => setLoading(false), 600); }} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'text-red-500'}`}>Mới nhất</span>
            </div>
            <div className='items'>
                {loading ? (
                    <div className='flex justify-center py-6'>
                        <Loading />
                    </div>
                ) : (
                    posts?.length > 0 && posts.map(item => {
                        return (
                            <Item
                                key={item?.id}
                                address={item?.address}
                                attributes={item?.attributes}
                                description={JSON.parse(item?.description)}
                                images={JSON.parse(item?.images?.image)}
                                star={+item?.star}
                                title={item?.title}
                                user={item?.user}
                                id={item?.id}
                                islover={item.lovers?.uid === currentData?.id}
                                setUpdate={setUpdate}
                            />
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default List