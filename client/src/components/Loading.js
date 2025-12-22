import React from 'react'
import { ColorRing } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div className='animate-pulse'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#1266dd', '#f73859', '#1266dd', '#f73859', '#1266dd']}
            />
        </div>
    )
}

export default Loading