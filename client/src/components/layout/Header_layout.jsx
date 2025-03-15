import { LogOut,   MoonIcon,  SunIcon,  UserCircleIcon } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import React from 'react'
import { Navigate } from 'react-router-dom'
import { changeTheme } from '../../slices/theme-slice'

function Header_layout() {
  const dispatch = useDispatch()
  const name = useSelector((state)=> state.auth.user)
  const {day} = useSelector((state)=> state.theme)
  
  const handleLogout = ()=>{
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("token");
    window.location.href = "/login"
    return
  }
 
  return (

    <div className={`absolute h-[60px] py-4 w-full ${day? "bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] text-black" : "bg-gray-700 shadow-[0_4px_6px_-1px_rgba(256,256,256,0.3)] text-white" } 
    lg:px-9 px-2 gap-4
    flex items-center justify-end`} >
      
      <div className='flex h-[50px] items-center justify-center gap-4 border px-2 rounded-xl '>
        <p className='font-bold'>{name}</p>
        <div className='w-15 h-15 rounded-full flex items-center justify-center m-0 p-0 '>
        <UserCircleIcon size={30}/>
        </div>

        </div>
        {day? <SunIcon onClick={()=>{dispatch(changeTheme())}} size={30} className='hover:text-yellow-500  cursor-pointer transform hover:rotate-180 duration-300'/> :
        <MoonIcon size={30} onClick={()=>{dispatch(changeTheme())}} className='hover:text-blue-500 cursor-pointer transform hover:rotate-180 duration-300'/>
        }
        <div
        onClick={handleLogout}
        className='w-10 h-10 rounded-xl hover:text-blue-600 hover:border hover:border-blue-600 flex items-center justify-center  cursor-pointer'>
        <LogOut size={30}/>
        </div>
    </div>

  )
}

export default Header_layout
