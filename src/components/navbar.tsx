"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu";
import { Menu, X } from "lucide-react";

const navLinkStyle =
  "inline-flex h-9 w-max items-center justify-center rounded-md bg-[#FFD777] px-4 py-2 text-sm font-medium text-black transition hover:bg-[#FFD555] hover:text-white focus:outline-none";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-[#FFD777] text-black px-6 py-4 shadow-md relative z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        <Link href="/" className="text-xl font-extrabold tracking-wide">
          IW LAB
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex gap-6">
            <NavigationMenuItem>
              <Link href="/" className={navLinkStyle}>
                Accueil
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/projects" className={navLinkStyle}>
                Projets
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        
        <div className="hidden md:flex">
          <Link
            href={isAuthenticated ? "/admin/projects" : "/login"}
            className="text-sm font-medium text-black hover:underline"
          >
            {isAuthenticated ? "Admin" : "Connexion"}
          </Link>
        </div>

        
        <button
          onClick={toggleMenu}
          className="md:hidden text-black focus:outline-none"
          aria-label="Menu mobile"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-[#FFD777] rounded-md shadow-md py-4">
          <div className="flex flex-col items-center gap-4">
            <Link href="/" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
              Accueil
            </Link>
            <Link href="/projects" className={navLinkStyle} onClick={() => setIsMenuOpen(false)}>
              Projets
            </Link>
            <Link
              href={isAuthenticated ? "/admin/projects" : "/login"}
              className={navLinkStyle}
              onClick={() => setIsMenuOpen(false)}
            >
              {isAuthenticated ? "Admin" : "Connexion"}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
