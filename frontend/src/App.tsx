import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { animateScroll } from "react-scroll";
import NavBar from "./components/organs/NavBar";
import Home from "./components/pages/Home";
import Diagnosis from "./components/pages/Diagnosis";
import DiseasePage from "./components/pages/DiseasePage";
import VarietyPage from "./components/pages/VarietyPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Report from "./components/pages/Report"

function App() {
  const location = useLocation();

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 });
  }, [location.pathname]);

  // ซ่อน NavBar ถ้าอยู่ที่ / หรือ /register
  const hideNavBar = location.pathname === "/" || location.pathname === "/register";

  return (
    <div className="w-full h-full bg-zinc-900 font-nunito relative">
      {!hideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/diagnosis" element={<Diagnosis />} />
        <Route path="/diseases" element={<DiseasePage />} />
        <Route path="/varieties" element={<VarietyPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;