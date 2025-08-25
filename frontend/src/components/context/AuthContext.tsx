import { createContext, useState, useContext, useEffect } from "react";
import type { ReactNode } from "react";

interface UserType {
  email: string;
  role_name: string;
  display_name?: string;
}

interface AuthContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  // โหลด user จาก localStorage เมื่อเริ่มต้นแอป
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // เก็บ user ลง localStorage ทุกครั้งที่เปลี่ยน
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
