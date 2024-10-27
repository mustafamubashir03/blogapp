import React from 'react'

export default function ButtonSecondary({label}) {
  return (
    <button className="bg-white  mt-2  border-2 border-gray-700 text-gray-700  font-bold  py-3 px-14 rounded-md  hover:text-blue-700  active:border-blue-500 hover:border-blue-700 transition-all duration-300 ease-in-out">
    {label}
  </button>
  )
}
