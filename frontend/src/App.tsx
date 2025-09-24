import { Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState, type JSX } from "react";
import { animateScroll } from "react-scroll";
import Home from "./components/pages/Home";
import Diagnosis from "./components/pages/Diagnosis";
import DiseasePage from "./components/pages/DiseasePage";
import VarietyPage from "./components/pages/VarietyPage";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Report from "./components/pages/Report";
import Profile from "./components/pages/Profile";
import SplashScreen from "./components/organs/SplashScreen";
import BottomNav from "./components/organs/BottomNav";
import { ArrowLeft } from "@phosphor-icons/react";
import { useAuth } from "./components/context/AuthContext";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    animateScroll.scrollToTop({ duration: 0 });
  }, [location.pathname]);

  // ตรวจ path ที่ต้องซ่อน BottomNav
  const infoPaths = ["/disease-info", "/riceVariety-info"];
  const showBackButton = infoPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  const hideBottom =
    showBackButton ||
    location.pathname === "/" ||
    location.pathname === "/register";

  return (
    <div className="w-full h-full bg-zinc-900 font-nunito relative">
      {/* Back button สำหรับ info pages */}
      {showBackButton && (
        <button
          onClick={() => navigate(-1)}
          className="fixed top-4 left-4 flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg z-50 transition-colors duration-200"
        >
          <ArrowLeft size={20} weight="bold" />
          <span className="font-medium text-sm">ย้อนกลับ</span>
        </button>
      )}

      <Routes>
        {showSplash ? (
          <Route path="*" element={<SplashScreen />} />
        ) : (
          <>
            {/* Public pages */}
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/disease-info" element={<DiseasePage />} />
            <Route path="/riceVariety-info" element={<VarietyPage />} />

            {/* Protected pages */}
            <Route
              path="/home"
              element={<ProtectedRoute><Home /></ProtectedRoute>}
            />
            <Route
              path="/diagnosis"
              element={<ProtectedRoute><Diagnosis /></ProtectedRoute>}
            />
            <Route
              path="/diseases"
              element={<ProtectedRoute><DiseasePage /></ProtectedRoute>}
            />
            <Route
              path="/varieties"
              element={<ProtectedRoute><VarietyPage /></ProtectedRoute>}
            />
            <Route
              path="/profile"
              element={<ProtectedRoute><Profile /></ProtectedRoute>}
            />
            <Route
              path="/report"
              element={<ProtectedRoute><Report /></ProtectedRoute>}
            />
          </>
        )}
      </Routes>

      {/* BottomNav แสดงเฉพาะเมื่อ login แล้ว และไม่อยู่ในหน้า hideBottom */}
      {user && !hideBottom && <BottomNav />}
    </div>
  );
}
