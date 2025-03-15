import React, { useEffect, useState } from "react";
import Todo from "../Todo";
import CardModal from "../CardModal";
import { useDispatch, useSelector } from "react-redux";
import { addCard, getAllCards,deleteCard, updateCard } from "../../slices/dashboard-slice";
import { GetUser } from "../../slices/login-slice";

function Content_layout() {
  const [isNewCard, setIsNewCard] = useState(false)
  const [isEditMode,setIsEditMode] = useState(false)
  const [editId, setEditId] = useState("")
  const dispatch = useDispatch()
  const [title , setTitle] = useState("")
  const [description , setDescription] = useState("")
  const [tags , setTags] = useState([])
  const [start , setStart] = useState("")
  const [end , setEnd] = useState("")
  const [err,setErr]=useState("")
  const {todo,inProcess,finished}= useSelector((state)=> state.tasks.tasks)
  console.log(tags)
  const handlestatusForward=(currentStatus,_id)=>{
    let status = ""
    if(currentStatus=="todo"){
      status="inProgress"
    }else if(currentStatus == "inProgress"){
      status="finished"
    }
    dispatch(updateCard({status,_id})).then(({payload})=>{
      if(payload.error){
        return
      }
      dispatch(getAllCards())
    })
  }

  const handleStatusBackward=(currentStatus,_id)=>{

    let status = ""
    if(currentStatus=="finished"){
      status="inProgress"
    }else if(currentStatus == "inProgress"){
      status="todo"
    }
    dispatch(updateCard({status,_id})).then(({payload})=>{
      if(payload.error){
        return
      }
      dispatch(getAllCards())
    })
  }
  
  

  
  const onCancel = ()=>{
        setEditId("")
        setIsEditMode(false)
        setIsNewCard(false)
        setTitle("")
        setDescription("")
        setTags([])
        setStart(new Date().toISOString().split("T")[0])
        setEnd(new Date().toISOString().split("T")[0])
  
  }
  const onAddCard = ()=>{
    setIsNewCard(true)
  }

  const submitCard=()=>{
    if(isEditMode){
      dispatch(updateCard({_id:editId,title,description,start,end,tags})).then(({payload})=>{
        if(payload.error){
          return
        }
      
        setIsEditMode(false)
        setEditId("")
        setIsNewCard(false)
        setTitle("")
        setDescription("")
        setTags([])
        setStart(new Date().toISOString().split("T")[0])
        setEnd(new Date().toISOString().split("T")[0])
        dispatch(getAllCards()).then(({payload})=>{
          if(payload.error){
            return
          }
         
        })

      })
      
      return
    }
   
    
    dispatch(addCard({title,description,tags,start,end})).then(({payload})=>{
      if(payload.error){
        setErr(payload.error)
        return
      }
      dispatch(getAllCards())
      
    })
      setTitle("")
      setDescription("")
      setTags([])
      setStart(new Date().toISOString().split("T")[0])
      setEnd(new Date().toISOString().split("T")[0])
      
      onCancel()
      
    return
  }

  useEffect(()=>{
    dispatch(getAllCards()).then((data)=>{
  
    })
  },[])
  useEffect(()=>{
    dispatch(getAllCards()).then((data)=>{
   
    })
  },[dispatch])

  const handleOnDelete=(id)=>{
    dispatch(deleteCard(id)).then(({payload})=>{
      if(!payload.error){
        dispatch(getAllCards())
      }
    })
   
    return
  }

  const handleCardClick = (item)=>{
   
    setIsEditMode(true)
    setIsNewCard(true)
    setTitle(item.title)
    setDescription(item.description)
    setStart(item.start)
    setEnd(item.end)
    setEditId(item._id)
    setTags(item.tags)

  }

  useEffect(()=>{
    dispatch(GetUser())
  },[])

  return (
    <div className="lg:p-10 pt-[34px] px-3 mt-[50px] lg:w-full w-[800px]  h-[100vh] flex justify-between gap-5 overflow-x-scroll">
      {isNewCard && <CardModal onCancel={onCancel} isEditMode={isEditMode} setIsEditMode ={setIsEditMode}
      title={title} setTitle={setTitle}
      description={description} setDescription={setDescription}
      tags={tags} setTags={setTags} setEnd={setEnd} setStart={setStart}
      submitCard={submitCard}
      setErr={setErr}
      err={err}
      
      
      />}
     <Todo name="TO-DO" addCardTrue={true} onAddCard={onAddCard} data={todo.slice().reverse()} handleOnDelete={handleOnDelete} handlestatusForward={handlestatusForward} handleStatusBackward={handleStatusBackward} handleCardClick={handleCardClick} />
     <Todo name="In Process" data = {inProcess.slice().reverse()} handleOnDelete={handleOnDelete} handlestatusForward={handlestatusForward} handleStatusBackward={handleStatusBackward} handleCardClick={handleCardClick} />
     <Todo name="Finished" data={finished.slice().reverse()} handleOnDelete={handleOnDelete} handlestatusForward={handlestatusForward} handleStatusBackward={handleStatusBackward} handleCardClick={handleCardClick}/>
    </div>
  );
}

export default Content_layout;
