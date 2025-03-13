import React from 'react'
import {
    Bolt,
    Camera,
    Check,
    CheckCheckIcon,
    Delete,
    DeleteIcon,
    Ellipsis,
    LucideMenu,
    Menu,
    MoveLeft,
    MoveRight,
    PilcrowSquareIcon,
    Plus,
    PlusCircleIcon,
    PlusIcon,
    PlusSquareIcon,
    SquareMenuIcon,
    ThermometerIcon,
    Trash,
    UserPlus,
  } from "lucide-react";
  

function Todo({name,addCardTrue}) {
  return (
    <div className="w-[30%] bg-white rounded-t-2xl hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] cursor-pointer relative p-2 gap-3 ">

        <div className="absolute flex w-full right-0 top-0 bg-gray-200 text-xl h-[6vh] items-center justify-between px-5 pt-2 rounded-t-2xl pb-1 ">
         <h3>{name}</h3>
         { addCardTrue && <div className='flex gap-2 items-center justify-center bg-gray-300  hover:bg-white hover:outline-1 rounded-full px-4'>Add task<PlusCircleIcon/></div>}
        </div>
        
        <div className={`flex flex-col mt-12 gap-5 h-auto w-full shadow-[0_2px_3px_-1px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] hover:outline-1 rounded-xl`}>
          <div className="w-full bg-white flex flex-col ">
            <h1 className="my-2 px-4   text-xl font-bold after:content-[''] after:w-[80%] after:bg-gray-200 after:absolute after:h-[3px] after:-ml-65 after:mt-8 ">
              Creating the best scenarios
            </h1>
            <p className="px-4 my-3 ">
              I am the best penguine out there , and i am going to be the best
              one no matter what
            </p>
            <div className="flex flex-row-reverse items-center px-4 py-2 bg-gray-100 gap-2">
                <div className="w-10 h-10 hover:bg-white rounded-full flex items-center justify-center hover:outline-1"> <Ellipsis size={20}  /></div>
                <div className="w-10 h-10 hover:bg-white rounded-full flex items-center justify-center hover:outline-1"> <UserPlus size={20}  /></div>
                <div className="w-14 h-10 hover:bg-white rounded-2xl flex items-center justify-center hover:outline-1"> <MoveRight size={20} /></div>
                <div className="w-10 h-10 hover:bg-white rounded-full flex items-center justify-center hover:outline-1">  <Trash size={20} /></div>
            </div>
          </div>
      
          </div>
         

          
         
      </div>
  )
}

export default Todo
