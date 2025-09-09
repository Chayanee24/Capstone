// src/pages/SplashScreen.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf } from "@phosphor-icons/react";
import { Text } from "../atoms/Text";

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/"); 
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-green-900">

      <div className="relative flex items-center font-extrabold md:text-5xl text-4xl">
        {/* Leaf */}
        <Text
          as="span"
          className="text-green-400 absolute -top-3 md:left-0 left-0 transform scale-0 opacity-0 animate-logo"
        >
          <Leaf size={40} weight="fill" />
        </Text>

        {/* Khao */}
        <Text
          as="span"
          className="text-white ml-10 md:ml-12 transform scale-0 opacity-0 animate-logo delay-200"
        >
          Khao
        </Text>

        {/* Care */}
        <Text
          as="span"
          className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent ml-1 transform scale-0 opacity-0 animate-logo delay-400"
        >
          Care
        </Text>
      </div>


      {/* Tailwind Custom Animations */}
      <style>
        {`
          @keyframes logoAppear {
            0% { opacity: 0; transform: scale(0); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .animate-logo {
            animation: logoAppear 1s forwards;
          }
          .animate-logo.delay-200 {
            animation-delay: 0.2s;
          }
          .animate-logo.delay-400 {
            animation-delay: 0.4s;
          }
          .animate-fadeIn {
            animation: fadeIn 1s forwards;
          }
          .animate-fadeIn.delay-600 {
            animation-delay: 0.6s;
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
