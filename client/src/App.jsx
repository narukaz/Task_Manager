
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, Routes,Route } from "react-router-dom";
import Login_page from "./components/login/Login_page"
import Signup_page from "./components/signup/Signup_page";
import Header_layout from "./components/layout/Header_layout";
import Content_layout from "./components/layout/Content_layout";






function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { day } = useSelector((state) => state.theme);
  const [token, setToken] = useState(false);

  useEffect(() => {
    setToken(document.cookie.includes("token="));
  }, []);

  return (
    <div className={`${day ? "bg-white" : "bg-gray-900"} lg:h-[100vh] w-full lg:overflow-hidden overflow-x-scroll`}>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login_page />} />
        <Route path="/login" element={token ? <Navigate to="/dashboard" /> : <Login_page />} />
        <Route path="/signup" element={token ? <Navigate to="/dashboard" /> : <Signup_page />} />
        <Route
          path="/dashboard"
          element={token ? (
            <>
              <Header_layout />
              <Content_layout />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
