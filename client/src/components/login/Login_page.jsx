import React from "react";
import { Link } from "react-router-dom";

function Login_page() {
  return (
   <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-2xl grid grid-cols-2 gap-2
    w-[800px] h-[400px] bg-white shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)]">
        <div className="bg-amber-300 px-auto rounded-2xl flex items-center justify-center">
        <h1 className="text-7xl font-bold ">
            LOGIN

        </h1>
        </div>
       
    <div className="flex flex-col items-center gap-3 p-6 my-auto">
        <h1 className="text-2xl opacity-50">login</h1>
        <input type="text" placeholder="abcd@_domain.com" className="w-[80%] h-[3rem] pl-4 pr-2 bg-gray-100 rounded-3xl"/>       
        <input type="password" placeholder="abcd@1234" className="w-[80%] h-[3rem] pl-4 pr-2 bg-gray-100 rounded-3xl "/>
        <button className="bg-[#0b57d0] text-white w-[60%] px-8 py-2 font-medium justify-between cursor-pointer rounded-3xl hover:bg-blue-500 ">Login</button>
        <p>Don't have an account?
             {/* <Link>SignUp</Link> */}
             </p>
    </div>
   </div>
  );
}

export default Login_page;
