import { Outlet, Routes, Route, Navigate } from "react-router-dom";
import Login_page from "./components/login/Login_page";
import Signup_page from "./components/signup/Signup_page";
import Header_layout from "./components/layout/Header_layout";
import Content_layout from "./components/layout/Content_layout";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { day } = useSelector((state) => state.theme);


  const [token, setToken] = useState(document.cookie.includes("token="));

 
  useEffect(() => {
    const checkToken = () => setToken(document.cookie.includes("token="));
    window.addEventListener("storage", checkToken);
    return () => window.removeEventListener("storage", checkToken);
  }, []);

  return (
    <div className={`${day ? "bg-white" : "bg-gray-900"} lg:h-[100vh] w-full lg:overflow-hidden overflow-x-scroll`}>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login_page />} />

        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login_page />} />

        <Route path="/signup" element={token || isAuthenticated ? <Navigate to="/dashboard" /> : <Signup_page />} />

        <Route path="/dashboard" element={token ? (
            <>
              <Header_layout />
              <Content_layout />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>

      <Outlet />
    </div>
  );
}

export default App;
