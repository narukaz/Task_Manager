import { User2Icon, UserCheckIcon, UserCircleIcon } from 'lucide-react'
import React from 'react'

function Header_layout() {
  return (

    <div className='absolute h-[60px] w-full bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]
    px-9 gap-4
    flex items-center justify-end'>
        <p>Name of the user</p>
        <div className='w-10 h-10 rounded-full hover:bg-amber-400 flex items-center justify-center cursor-pointer'>
        <UserCircleIcon size={35}/>
        </div>
    </div>

  )
}

export default Header_layout
