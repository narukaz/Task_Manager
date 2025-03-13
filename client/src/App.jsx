import { Outlet } from "react-router-dom";
import Login_page from "./components/login/Login_page";
import Signup_page from "./components/signup/Signup_page";
import Header_layout from "./components/layout/Header_layout";
import Content_layout from "./components/layout/Content_layout";

function App() {
  return (
    <div className="bg-[#F6F6F6] h-[100vh] overflow-hidden">
      {/* <Login_page/> */}
      {/* <Signup_page/> */}
      <div className="z-10 opacity-15 absolute w-full bg-black h-full"></div>

      <div
        className="z-11 translate  absolute 
    -translate-x-1/2 -translate-y-1/2 rounded-2xl
    w-[90vh] h-[65vh] bg-white left-1/2 top-1/2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-col gap-4 p-8"
      >
        <input
          type="text"
          placeholder="Add title to the card"
          className="px-6 w-full h-12 text-[25px] border-1 outline-0 rounded-2xl py-2 hover:border-blue-400"
        />
        <textarea
          className="w-full p-3  rounded-2xl hover:border-blue-400 border-[1.5px] outline-0"
          placeholder="Enter Description....... "
        />
        <div className="w-full h-[50px]  flex   items-center justify-between">
          <input
            type="text"
            placeholder="add user email"
            className="w-full h-[50px] pl-5 border-1 outline-0 rounded-l-2xl hover:border-blue-400 "
          />
          <button className="bg-blue-600 w-[150px] h-[50px] text-white rounded-r-2xl hover:bg-blue-400 cursor-pointer">
            Add User
          </button>
        </div>
        <div className="flex gap-4">
          <div className="w-[50%] h-[50px] bg-red-700 hover:outline-1 hover:border-blue-400 hover:bg-white hover:text-black flex items-center justify-center text-white rounded-full cursor-pointer">
            <button className="text-inherit text-center font-bold cursor-pointer">
              Cancel
            </button>
          </div>
          <div className="w-[50%] h-[50px] bg-blue-700 hover:outline-1 hover:bg-white  hover:text-black flex items-center justify-center text-white rounded-full cursor-pointer">
            <button className="text-inherit text-center font-bold cursor-pointer">
              Create card
            </button>
          </div>
        </div>
      </div>

      <Header_layout />
      <Content_layout />
      <Outlet />
    </div>
  );
}

export default App;
