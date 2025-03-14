import { LogOut,  UserCircleIcon } from 'lucide-react'
import { useSelector } from 'react-redux'
import React from 'react'
import { Navigate } from 'react-router-dom'

function Header_layout() {

  const name = useSelector((state)=> state.auth.user)
  const handleLogout = ()=>{
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    window.location.href = "/login"
    return
  }
 
  return (

    <div className='absolute h-[60px] py-4 w-full bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]
    px-9 gap-4
    flex items-center justify-end '>
      <div className='flex h-[50px] items-center justify-center gap-4 border px-2 rounded-xl '>
        <p className='font-bold'>{name}</p>
        <div className='w-15 h-15 rounded-full flex items-center justify-center m-0 p-0 '>
        <UserCircleIcon size={30}/>
        </div>

        
        </div>
        <div
        onClick={handleLogout}
        className='w-10 h-10 rounded-xl hover:text-blue-600 hover:border hover:border-blue-600 flex items-center justify-center  cursor-pointer'>
        <LogOut size={30}/>
        </div>
    </div>

  )
}

export default Header_layout
