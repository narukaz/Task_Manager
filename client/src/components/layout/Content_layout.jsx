import React, { useEffect, useState } from "react";
import Todo from "../Todo";
import CardModal from "../CardModal";
import { useDispatch, useSelector } from "react-redux";
import { addCard, getAllCards, deleteCard, updateCard } from "../../slices/dashboard-slice";
import { GetUser } from "../../slices/login-slice";

function Content_layout() {
  const [isNewCard, setIsNewCard] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [start, setStart] = useState(new Date().toISOString().split("T")[0]);
  const [end, setEnd] = useState(new Date().toISOString().split("T")[0]);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const { todo, inProcess, finished } = useSelector((state) => state.tasks.tasks);

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

  const resetForm = () => {
    setEditId("");
    setIsEditMode(false);
    setIsNewCard(false);
    setTitle("");
    setDescription("");
    setTags([]);
    setStart();
    setEnd();
  };

  const submitCard = () => {
    const action = isEditMode ? updateCard({ _id: editId, title, description, start, end, tags }) : addCard({ title, description, tags, start, end });
    
    dispatch(action).then(({ payload }) => {
      if (payload.error) {
        setErr(payload.error);
        return;
      }
      dispatch(getAllCards());
      resetForm();
    });
  };

  useEffect(()=>{
    dispatch(GetUser()).then(()=>{
      dispatch(getAllCards())
    })
  },[])

  const handleOnDelete = (id) => {
    dispatch(deleteCard(id)).then(({ payload }) => {
      if (!payload.error) {
        dispatch(getAllCards());
      }
    });
  };

  const handleCardClick = (item) => {
    console.log(item)
    setIsEditMode(true);
    setIsNewCard(true);
    setTitle(item.title);
    setDescription(item.description);
    setStart(item.start);
    setEnd(item.end);
    setEditId(item._id);
    setTags(item.tags);
  };

  return (
    <div className="lg:p-10 pt-[34px] px-3 mt-[50px] lg:w-full w-[800px] h-[100vh] flex justify-between gap-5 overflow-x-scroll">
      {isNewCard && (
        <CardModal
          onCancel={resetForm}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          tags={tags}
          start={start}
          end={end}
          setTags={setTags}
          setEnd={setEnd}
          setStart={setStart}
          submitCard={submitCard}
          setErr={setErr}
          err={err}
        />
      )}
      <Todo name="Backlog" addCardTrue={true} onAddCard={() => setIsNewCard(true)} data={todo.slice().reverse()} handleOnDelete={handleOnDelete} handlestatusForward={handlestatusForward} handleStatusBackward={handleStatusBackward} handleCardClick={handleCardClick} />
      <Todo name="In Process" data={inProcess.slice().reverse()} handleOnDelete={handleOnDelete} handlestatusForward={handlestatusForward} handleStatusBackward={handleStatusBackward} handleCardClick={handleCardClick} />
      <Todo name="Finished" data={finished.slice().reverse()} handleOnDelete={handleOnDelete} handlestatusForward={handlestatusForward} handleStatusBackward={handleStatusBackward} handleCardClick={handleCardClick} />
    </div>
  );
}

export default Content_layout;
