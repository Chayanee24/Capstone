import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { animateScroll } from "react-scroll";
// import NavBar from "./components/organs/NavBar";
import Home from "./components/pages/Home";
import Diagnosis from "./components/pages/Diagnosis";
import DiseasePage from "./components/pages/DiseasePage";
import VarietyPage from "./components/pages/VarietyPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Report from "./components/pages/Report"
import { AuthProvider, useAuth } from "./components/context/AuthContext";
import SplashScreen from "./components/organs/SplashScreen";
import BottomNav from "./components/organs/BottomNav";
import Profile from "./components/pages/Profile"
import MainLayout from "./components/atoms/MainLayout";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  const location = useLocation();

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); 
    return () => clearTimeout(timer);
  }, []);


  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 });
  }, [location.pathname]);

  // ซ่อน NavBar ถ้าอยู่ที่ / หรือ /register
  // const hideNavBar = location.pathname === "/" || location.pathname === "/register" || showSplash;
  const hideBottom = location.pathname === "/" || location.pathname === "/register" || showSplash ;

  return (
    <div className="w-full h-full bg-zinc-900 font-nunito relative">
      {/* {!hideNavBar && <NavBar />} */}
      <AuthProvider>
      <Routes>
        {showSplash ? (
            <Route path="*" element={<SplashScreen />} />
          ) : (
            <>
            <Route path="/" element={<Login />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/diseases" element={<DiseasePage />} />
            <Route path="/varieties" element={<VarietyPage />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/report" element={<Report />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
      </Routes>
      {!hideBottom && <BottomNav />}
      </AuthProvider>
    </div>
  );
}

export default App;