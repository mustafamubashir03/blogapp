import React, { useContext } from 'react'
import { context } from '../../context/context'

export default function Button({label,type}) {
  const {dataFetching} = useContext(context)
  return (
    <button type={type}  className={`bg-blue-700 mt-6 ${dataFetching && "disabled:bg-blue-600"} text-white  font-bold border-none py-3 px-16  rounded-md    active:bg-blue-600  transition-all duration-300 ease-in-out hover:bg-blue-900`}>
    {dataFetching? "...":label}
  </button>
  )
}
