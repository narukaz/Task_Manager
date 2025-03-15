import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import Login_page from "./components/login/Login_page";
import Signup_page from "./components/signup/Signup_page";
import Header_layout from "./components/layout/Header_layout";
import Content_layout from "./components/layout/Content_layout";

import { useSelector } from "react-redux";

function App() {
  const {isAuthenticated} = useSelector(state=> state.auth)
  const {day}=useSelector((state)=>state.theme)
  return (
    <div className={` ${day? "bg-white":"bg-gray-900"} lg:h-[100vh] w-full lg:overflow-hidden overflow-x-scroll`}>
      <Routes>
        <Route path="/" element={<Login_page/>}/>
        <Route
          path="/login"
          element={
            document.cookie.includes("token=") ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login_page />
            )
          }
        />
        <Route path="/signup" element={ document.cookie.includes("token=") || isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (<Signup_page />)} />
        <Route
          path="/dashboard"
          element={
            document.cookie.split("=")[1] ? (
              <>
                <Header_layout />
                <Content_layout />
              </>
            ) : (
              <Login_page />
            )
          }
        />
      </Routes>

      {/* <Header_layout />
      <Content_layout /> */}
      <Outlet />
    </div>
  );
}

export default App;
