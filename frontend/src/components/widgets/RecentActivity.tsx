import React from 'react'

const ActivityBox = () => {
    return (
        <div className='flex flex-col items-center border-2 border-purple-500 rounded-lg h-full bg-gray-900'>
            <p className='text-center'>Recent Activity</p>
            <small className='self-start ml-3'>Inquiry created at <small className='underline'>11:01 am</small></small>
            <small className='self-start ml-6'>- Call fielded by <small className='underline'>Sarah Secratary</small></small>
        </div>
    )
}

export default ActivityBox
