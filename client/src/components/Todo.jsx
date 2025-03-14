import React from "react";
import {
  MoveLeft,
  MoveRight,
  PenIcon,
  PlusCircleIcon,
  Trash,
  UserPlus,
} from "lucide-react";

function Todo({ name, addCardTrue, onAddCard, data ,handleOnDelete,handlestatusForward,handleStatusBackward, handleCardClick}) {
  return (
    <div className="w-[30%] bg-white rounded-t-2xl h-[85vh] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] cursor-pointer relative  gap-3 overflow-y-scroll  ">
      <div className="sticky flex w-full bg-gray-200  right-0 top-0  text-xl h-[6vh] items-center justify-between px-5 pt-2 rounded-t-2xl pb-1  ">
        <h3>{name}</h3>
        {addCardTrue && (
          <div
            onClick={onAddCard}
            className="group flex gap-3 items-center bg-gray-500 hover:bg-white text-white hover:text-black justify-center hover:outline-1 rounded-full px-4"
          >
            <span>Add task</span>
            <PlusCircleIcon className="transform group-hover:rotate-180  transition-all duration-300" />
          </div>
        )}
      </div>

      <div
        className={`flex flex-col mt-4 gap-5 h-auto w-full p-2  `}
      >
        {
          data.reverse().map(item=><div onClick={()=>handleCardClick(item)} key={item._id} className="w-full bg-white flex flex-col shadow-[0_1px_6px_-1px_rgba(0,0,0,0.4)] hover:outline-1 rounded-xl hover:shadow-[0_6px_12px_-1px_rgba(0,0,0,0.4)] ">
            <h1 className="my-2 text-xl px-4 font-bold ">
              {item.title}
            </h1>
            <div className="h-1 bg-gray-200 w-[60%] mx-4"></div>
            <p className="px-4 my-3 max-h-20 overflow-y-scroll ">
             {item.description}
            </p>
            <div className={`flex flex-row-reverse items-center px-4 py-2  ${item.status == "inProgress" ? "bg-yellow-500 text-black ": item.status == "finished" ? "bg-green-600 text-white" : "bg-gray-100 text-black"  } gap-2 rounded-xl`}>
              <div className={`w-10 h-10   ${item.status == "finished"? "hover:bg-green-800":"hover:bg-white" } rounded-full flex items-center justify-center hover:outline-1`} onClick={(e)=>{
                 e.stopPropagation()
                 handleCardClick(item)
              }}>
                {" "}
                <PenIcon size={20} />
              </div>
              
              { item.status !="finished" &&   <div className={`w-14 h-10  ${item.status == "finished"? "hover:bg-green-800":"hover:bg-white" } rounded-2xl flex items-center justify-center hover:outline-1`} onClick={(e)=>{
                 e.stopPropagation()
                 handlestatusForward(item.status,item._id)}
              }>
                {" "}
                <MoveRight size={20} />
              </div>}
              { item.status !="todo" &&   <div className={`w-14 h-10 rounded-2xl  ${item.status == "finished"? "hover:bg-green-800":"hover:bg-white" } flex items-center justify-center hover:outline-1`} onClick={(e)=>{
                 e.stopPropagation()
                handleStatusBackward(item.status,item._id)}}>
                {" "}
                <MoveLeft size={20} />
              </div>}

            
              
             
              <div
              onClick={(e)=>{
                e.stopPropagation()
                handleOnDelete(item._id)}}
              className={`w-10 h-10  rounded-full  ${item.status == "finished"? "hover:bg-green-800":"hover:bg-white" } flex items-center justify-center hover:outline-1`}>
                {" "}
                <Trash size={20} />
              </div>
            </div>
          </div>)
          
        }
        
        
      </div>
    </div>
  );
}

export default Todo;
