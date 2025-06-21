import React from 'react'

const Loader = () => {
  return (
      <div className='w-screen h-screen bg-black flex items-center justify-center fixed z-100'>
          <div className="loader text-5xl max-md:text-3xl text-white"></div>
    </div>
  )
}

export default Loader