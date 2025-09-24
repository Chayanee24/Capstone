import { useAuth } from "../context/AuthContext";
import BottomNav from "../organs/BottomNav";
import { useLocation } from "react-router-dom";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  // path ที่ไม่ต้องการให้ BottomNav แสดง
  const hideBottomPaths = ["/", "/register", "/disease-info", "/riceVariety-info"];
  const hideBottom = hideBottomPaths.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      {/* Content */}
      <main className={`flex-1 overflow-auto ${user && !hideBottom ? "pb-10" : ""}`}>
        {children}
      </main>

      {/* Bottom Navigation */}
      {user && !hideBottom && (
        <div className="flex-shrink-0">
          <BottomNav />
        </div>
      )}
    </div>
  );
};

export default MainLayout;
