// src/components/NavBar.tsx
import { useState, useEffect } from "react";
import { NavLinks } from "../particles/Data";
import { List } from "../atoms/List";
import { NavLink, Link } from "react-router-dom";
import { ArrowCircleRight, CirclesFour, Leaf } from "@phosphor-icons/react";
import { Text } from "../atoms/Text";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [navBarColor, setNavBarColor] = useState(false);

  const handleToggle = () => setOpen(!open);

  useEffect(() => {
    const listenScroll = () => window.scrollY > 10 ? setNavBarColor(true) : setNavBarColor(false);
    window.addEventListener("scroll", listenScroll);
    return () => window.removeEventListener("scroll", listenScroll);
  }, []);

  return (
    <header className="w-full fixed z-50 top-0 left-0">
      <nav className={`w-full h-20 lg:h-28 px-8 md:px-9 lg:px-16 flex justify-between items-center transition-colors duration-300 ${navBarColor ? "bg-green-900/90 backdrop-blur-md" : "bg-transparent"}`}>

        {/* Logo */}
        <div className="w-full flex justify-start items-center py-6 px-6 lg:px-16">
          <Link to={`/`} className="font-extrabold flex items-center relative md:text-2xl text-lg">
            <Text as="span" className="text-green-400 absolute -top-3 md:left-5 left-3">
              <Leaf size={25} weight="fill" />
            </Text>
            <Text as="span" className="text-white">Khao</Text>
            <Text as="span" className="bg-gradient-to-r from-green-400 to-yellow-400 bg-clip-text text-transparent">
              Care
            </Text>
          </Link>
        </div>



        {/* Desktop Menu */}
        <div className="lg:flex hidden items-center h-full gap-20">
          <ul className="flex items-center justify-center h-full gap-4 relative before:w-full before:h-0.5 before:absolute before:bottom-0 before:left-0 before:bg-green-300/50">
            {NavLinks.map((navlink, index) => (
              <List key={index} className="w-full text-base">
                <NavLink
                  to={navlink.url}
                  className={({ isActive }) => `relative inline-block px-2 whitespace-nowrap text-xs font-bold uppercase transition-all duration-200 ${isActive ? "text-yellow-400" : "text-white"
                    } hover:text-green-300 before:absolute before:-bottom-[2.9rem] before:left-0 before:w-0 before:h-0.5 before:bg-gradient-to-r from-yellow-400 to-green-400 before:transition-all before:duration-200 hover:before:left-0.5`}
                >
                  {navlink.name}
                </NavLink>
              </List>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex text-white cursor-pointer" onClick={handleToggle}>
          <CirclesFour size={30} weight="light" />
        </div>
      </nav>

      {/* Mobile Menu */}
      <nav className={`lg:hidden fixed top-0 h-screen w-full bg-black/70 flex justify-end transition-all duration-500 ease-out ${open ? "right-0" : "-right-[120vw]"}`}>
        <div className={`w-full md:w-[50%] h-screen bg-green-900 flex flex-col justify-between items-center transition-all duration-500 ease-out delay-300`}>
          <section className="w-full px-4 py-6 flex flex-col gap-16">
            {/* Logo + Close */}
            <div className="w-full flex justify-between items-center pt-5 px-4">
              <Link to={`/`} className="font-extrabold text-2xl flex gap-1 items-center">
                <Leaf size={25} weight="fill" className="text-green-400" />
                <span className="text-white">Khao</span>
                <span className="text-yellow-400">Care</span>
              </Link>
              <div className="cursor-pointer" onClick={handleToggle}>
                <ArrowCircleRight size={25} weight="light" color="white" />
              </div>
            </div>

            {/* Mobile Links */}
            <ul className="flex flex-col gap-3 pl-5">
              {NavLinks.map((navlink, index) => (
                <List key={index} className="w-full text-base">
                  <NavLink
                    to={navlink.url}
                    onClick={handleToggle}
                    className="relative overflow-hidden inline-block text-white before:absolute before:bottom-0 before:-left-full before:w-full before:h-0.5 before:bg-gradient-to-r from-green-300 to-yellow-400 before:transition-all before:duration-200 hover:before:left-0"
                  >
                    {navlink.name}
                  </NavLink>
                </List>
              ))}
            </ul>
          </section>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
