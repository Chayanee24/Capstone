import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircle, Leaf } from "@phosphor-icons/react";

const Profile = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null); // ล้างข้อมูล user ใน context
        localStorage.removeItem("token"); // ถ้ามี token เก็บไว้ใน localStorage
        navigate("/"); // กลับไปหน้า Login
    };

    return (
        <div className="w-full h-screen flex flex-col items-center bg-gradient-to-b from-green-900 to-green-700 text-white font-nunito">
            {/* Logo */}
            <div className="w-full flex justify-center items-center py-6 px-6 lg:px-16">
                <div className="font-extrabold flex items-center relative md:text-2xl text-lg">
                    <span className="text-green-400 absolute -top-3 md:left-5 left-3">
                        <Leaf size={25} weight="fill" />
                    </span>
                    <span className="text-white">Khao</span>
                    <span className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
                        Care
                    </span>
                </div>
            </div>


            {/* Profile Info */}
            <div className="flex flex-col items-center mt-6 bg-white rounded-2xl shadow-lg p-6 w-11/12 max-w-sm text-gray-800">
                <UserCircle size={100} className="text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-green-700">{user?.display_name || "ผู้ใช้งาน"}</h2>
                <p className="text-gray-500">{user?.email || "example@email.com"}</p>
            </div>

            {/* Actions */}
            <div className="mt-10 w-full flex justify-center">
                <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 
                     text-white font-semibold px-8 py-3 rounded-full shadow-md transition-transform transform hover:scale-105"
                >
                    ออกจากระบบ
                </button>
            </div>
        </div>
    );
};

export default Profile;
