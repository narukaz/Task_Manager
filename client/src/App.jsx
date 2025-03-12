import { Outlet } from "react-router-dom"
import Login_page from "./components/login/Login_page"
import Signup_page from "./components/signup/Signup_page"
import Header_layout from "./components/layout/Header_layout"
import Content_layout from "./components/layout/Content_layout"


function App() {
 

  return (
    <div className="bg-[#F6F6F6] overflow-hidden">
    {/* <Login_page/> */}
    {/* <Signup_page/> */}
    <Header_layout/>
    <Content_layout/>
    <Outlet/>
    </div>
  )
}

export default App
