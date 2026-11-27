import React from 'react'

const Skeleton = ({ className = '' }) => {
    return (
        <div
            aria-hidden="true"
            className={`animate-pulse rounded-md bg-gray-200/80 ${className}`}
        >

        </div>
    )
}

export default Skeleton
