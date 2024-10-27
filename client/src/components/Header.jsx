import React from 'react'

export default function Header() {
  return (
    <section>
        <h1 className='text-gray-900 text-center flex flex-col justify-center items-center mt-8 relative'>
            <div className=' flex flex-col justify-center items-center absolute top-0 bg-white px-3 py-2 rounded-sm'>
            <span className='font-extrabold text-4xl uppercase'>Welcome to my</span>
            <span className='font-extrabold text-8xl uppercase'>Blog</span></div>
        </h1>
        <img className='w-screen object-cover h-96' src='https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' />
      
    </section>
  )
}
