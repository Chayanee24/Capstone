import BottomNav from "../organs/BottomNav";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-zinc-900">
      
      {/* เลเยอร์ Content หลัก */}
      <div className="flex-1 overflow-auto p-4 pb-20">
        {/* pb-20 เผื่อพื้นที่ด้านล่างให้ BottomNav */}
        {children}
      </div>

      {/* เลเยอร์ Bottom Navigation */}
      <div className="flex-shrink-0">
        <BottomNav />
      </div>
      
    </div>
  );
};

export default MainLayout;
