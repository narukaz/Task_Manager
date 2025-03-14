import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { UserSignup } from '../../slices/login-slice'

function Signup_page() {
  const [name,setName]=useState("")
  const [userId,setUserId]=useState("")
  const [password,setPassword]= useState("")
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRegister = ()=>{
    if(!name || !userId || !password){
      setError("please fill the form")
      setTimeout(() => {
        setError("")
    }, 4000);
      return
    }
    dispatch(UserSignup({name,userId,password})).then(({payload}) =>{
     
      if(payload.error){
        setError(payload.message)
        setTimeout(() => {
          setError("")
      }, 4000);
        return
      }
      navigate("/login")
    })
    
  }
  
  return (
    <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl grid grid-cols-2 gap-2
    w-[800px] h-[500px] bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
        <div className="bg-amber-300 px-auto rounded-2xl flex items-center justify-center">
        <h1 className="text-7xl font-bold ">
            Sign UP!

        </h1>
        </div>
       
    <div className="flex flex-col items-center gap-3 p-6 my-auto">
        <h1 className="text-2xl opacity-50">Sign Up </h1>
        <input type="text" value={name} onChange={({target})=>{setName(target.value)}} placeholder="username" className="w-[80%] h-[3rem] pl-4 pr-2 bg-gray-100 rounded-3xl"/>       
        <input type="text" value={userId} onChange={({target})=>{setUserId(target.value)}} placeholder="abcd@_domain.com" className="w-[80%] h-[3rem] pl-4 pr-2 bg-gray-100 rounded-3xl"/>       
        <input type="password" value={password} onChange={({target})=>{setPassword(target.value)}} placeholder="abcd@1234" className="w-[80%] h-[3rem] pl-4 pr-2 bg-gray-100 rounded-3xl "/>
        {error &&  <p className="text-red-500">{error}</p>}
        <button
        onClick={onRegister}
        className="bg-[#0b57d0] text-white w-[60%] px-8 py-2 font-medium justify-between cursor-pointer rounded-3xl hover:bg-blue-500 ">Register</button>
        <p>Already have an account?
        <Link to={"/login"} className="text-blue-600 underline">{"   Sign in"}</Link>
             </p>
    </div>
   </div>
  )
}

export default Signup_page
