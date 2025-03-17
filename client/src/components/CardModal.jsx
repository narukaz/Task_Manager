import React, { useState } from "react";
import { PlusSquare, Target, UserPlus2, XSquare } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

function CardModal({onCancel,title,setTitle,description,setDescription,setTags,submitCard,setStart,setEnd,end,start,err,setErr,isEditMode}) {
 const {day} = useSelector((state)=> state.theme)
 
  const [currTag,setCurrTag] = useState("")
  const handleAddUser = ()=>{
    if(!currTag){
      return
    }
    setTags((tags)=>[...tags,currTag])
    setCurrTag("")
    return
  }



  const handleAddCard=()=>{
    if(!title ){
      setErr("title is needed")
      setTimeout(() => {
        setErr("")
      }, 4000);
      return
    }
   
    submitCard()
  }
  
  return (
    <>
      <div className="z-10 lg:opacity-15 opacity-50 absolute right-0 top-0 w-full bg-black h-full"></div>
      <div
        className={`z-11 translate  absolute 
-translate-x-1/2 -translate-y-1/2 rounded-2xl
lg:w-[90vh] w-[45vh] lg:h-[65vh] h-[40vh]  ${day? "bg-white text-black":"bg-gray-600 text-white"} left-1/2 top-1/2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col gap-4 p-8`}
      >
        <input
        value={title} onChange={({target}) => setTitle(target.value)}
          type="text"
          placeholder="Add title to the card"
          className="px-6 w-full h-12 text-[25px] border-1 outline-0 rounded-2xl py-2 hover:border-blue-400"
        />
        <textarea
        value={description} onChange={({target}) => setDescription(target.value)}
          className="w-full p-3  rounded-2xl hover:border-blue-400 border-[1.5px] outline-0"
          placeholder="Enter Description....... "
        />
        <div className="flex justify-start gap-5 items-center">
          <input type="date"
          onChange={({target})=>{
            let date = target.value
            setStart(date)
           
          }}
          value={start}
          
          className="p-3 rounded-2xl border-1 cursor-pointer hover:border-blue-700 "
          />
           <input type="date" 
           onChange={({target})=>{
            let date = target.value
            setEnd(date)}}
           value={end}
          className="p-3  rounded-2xl border-1 cursor-pointer hover:border-blue-700 "
          />
        </div>

        <div className="w-full h-[50px]  flex   items-center justify-between">
          <input
          value={currTag} onChange={({target})=>setCurrTag(target.value)}
            type="text"
            placeholder="add user email"
            className="w-full h-[50px] pl-5 border-1 outline-0 rounded-l-2xl hover:border-blue-400 "
          />
          <button
          onClick={handleAddUser}
          className="bg-blue-600 w-[170px] h-[50px] flex justify-center items-center gap-3 text-white rounded-r-2xl hover:bg-blue-400 cursor-pointer px-3">
            <UserPlus2 />
            Add User
          </button>
        </div>
        <div className="flex gap-4">
         
          <div onClick={onCancel} className="w-[50%] h-[50px] bg-red-700 hover:outline-1 hover:border-blue-400 hover:bg-white hover:text-black flex items-center justify-center gap-3 text-white rounded-full cursor-pointer">
            Cancel
            <XSquare />
          </div>
          <div onClick = {handleAddCard}className="w-[50%] h-[50px] bg-blue-700 hover:outline-1 hover:bg-white  hover:text-black flex items-center gap-3 justify-center text-white rounded-full cursor-pointer">
           { isEditMode  ? "Update card":"Create card"}
            <PlusSquare />
          </div>
         
        </div>
        {err && <p className="text-red-500 text-end">{err}</p> }
      </div>
    </>
  );
}

export default CardModal;
