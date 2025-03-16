import React, { useEffect, useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserLogin } from "../../slices/login-slice";
import { useSelector,useDispatch } from "react-redux";


function Login_page() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error,setError]= useState("")
    const [userId,setUserId] = useState("")
    const [password,setPassword] = useState("")
    const handleLogin=(e)=>{
       
        e.preventDefault()
        if(userId =="" || password == ""){
            setError("missing input!")
            setTimeout(() => {
                setError("")
            }, 4000);
            return
        }
       
            dispatch(UserLogin({userId,password})).then((data)=>{
              
                if(data.payload.error){
                    
                    setError(payload.message)
                    setTimeout(() => {
                        setError("")
                    }, 4000);
    
                    return
                }else{
                    console.log("reached dashbord")
                    navigate("/dashboard")
                }
            })
            
      .catch((error) =>
           console.log(error))
    }
  

  
  return (
 
    
   <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl grid lg:grid-cols-2  sm:grid-cols-1 gap-2
    lg:w-[800px] w-[400px] h-[500px]  lg:h-[400px] bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] sm:overflow-hidden">
        <div className="bg-amber-300 px-auto rounded-2xl lg:flex items-center justify-center hidden  ">
        <h1 className="text-7xl font-bold hidden lg:block   ">
            LOGIN

        </h1>
        </div>
       
    <div className="w-full flex flex-col items-center gap-3 p-6 my-auto">
        <h1 className="text-2xl opacity-50">login</h1>
        <input type="text" value={userId} onChange={({target})=>setUserId(target.value)} placeholder="abcd@_domain.com" className="w-[80%] h-[3rem] pl-4 pr-2 bg-gray-100 rounded-3xl"/>       
        <input type="password" value={password} onChange={({target})=>setPassword(target.value)} placeholder="abcd@1234" className="w-[80%] h-[3rem] pl-4 pr-2 bg-gray-100 rounded-3xl "/>
        {error &&  <p className="text-red-500">{error}</p>}
        <button 
        onClick={(e)=>
             handleLogin(e)
            
            } className="bg-[#0b57d0] text-white w-[60%] px-8 py-2 font-medium justify-between cursor-none lg:cursor-pointer rounded-3xl hover:bg-blue-500 ">Login</button>
           
        <p>Don't have an account?   
             <Link to={"/signup"} className="text-blue-600 underline">{"   SignUp"}</Link>
             </p>
             <p>Go to dashboard   
             <Link to={"/dashboard"} className="text-blue-600 underline">{"   Dasboard"}</Link>
             </p>
    </div>
   </div>
 
  );
}

export default Login_page;
