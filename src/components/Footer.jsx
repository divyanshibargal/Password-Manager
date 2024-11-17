import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center  w-full fixed bottom-0 '>
            <div className="logo font-bold text-white text-xl">
                <span className='text-green-500'> &lt;</span>

                <span>Pass</span><span className='text-green-500'>Hive/&gt;</span>


            </div>
            <div className='flex justify-center items-center'> Created with <img className='w-7 mx-2' src="icons/heart.png" alt="" /> by Divyanshi </div>
        </div>
    )
}

export default Footer