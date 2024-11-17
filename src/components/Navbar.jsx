import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800  text-white'>
      <div className='container mx-auto max-w-6xl flex justify-between items-center px-4 h-10'>
      <div className='logo font-bold text-xl'>
        <span className='text-green-700'> &lt;</span>
        Pass
        <span className='text-green-700'>Hive/&gt; </span>
        </div>
      <button className='text-white bg-green-700 my-4 mx-2 rounded-full flex  justify-between items-center ring-white ring-1 '> 
                    <img className='invert w-7  p-1' src="/icons/github.svg" alt="github logo" />
                    <span className='font-bold px-2'>GitHub</span>
                    
                </button>
      </div>
    </nav>
  )
}

export default Navbar
