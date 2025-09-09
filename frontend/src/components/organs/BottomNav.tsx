import { House, ClipboardText, Leaf, User, MagnifyingGlass } from "@phosphor-icons/react";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { name: "หน้าแรก", path: "/home", icon: <House size={24} /> },
    { name: "วินิจฉัย", path: "/diagnosis", icon: <ClipboardText size={24} /> },
    { name: "โรคข้าว", path: "/diseases", icon: <MagnifyingGlass size={24} /> },
    { name: "พันธุ์ข้าว", path: "/varieties", icon: <Leaf size={24} /> },
    { name: "บัญชี", path: "/profile", icon: <User size={24} /> },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 shadow-md z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex flex-col items-center justify-center text-sm transition-colors ${
                isActive ? "text-green-600" : "text-gray-500"
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
