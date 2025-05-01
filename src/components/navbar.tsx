"use client"
import React, { useState, useEffect } from "react"
import Cookies from "js-cookie"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "./ui/navigation-menu"
import { Menu, X } from "lucide-react"

const navigationMenuItemStyle =
  "inline-flex h-9 w-max items-center justify-center rounded-md bg-[#FFD777] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#FFD555] hover:text-white focus:bg-[#FFD555] focus:text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-[#FFD555] data-[state=open]:bg-[#FFD555]"

const loginButtonStyle = "text-sm font-medium text-black no-underline cursor-pointer"

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = Cookies.get("token")
    setIsAuthenticated(!!token)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="flex items-center justify-between bg-[#FFD777] px-4 py-2 text-black">
      <div className="flex items-center space-x-4">
        <span className="text-lg font-bold">IW LAB</span>
      </div>

      <NavigationMenu className="flex-1 mx-4">
        <NavigationMenuList className="flex items-center justify-center space-x-4 hidden md:flex">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className={`${navigationMenuItemStyle}`}
            >
              Accueil
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/projects" className={navigationMenuItemStyle}>
              Projets
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center justify-start">
        <a
          href={isAuthenticated ? "/admin/projects" : "/login"}
          className={loginButtonStyle}
        >
          {isAuthenticated ? "Admin" : "Connexion"}
        </a>
      </div>

      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-black">
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 left-0 w-full bg-[#FFD777] text-black z-10 md:hidden">
          <NavigationMenu className="flex flex-col items-center space-y-4 py-4">
            <NavigationMenuList className="flex flex-col items-center space-y-4 py-4">
              <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuItemStyle}>
                  Accueil
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink href="/projects" className={navigationMenuItemStyle}>
                  Projets
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href={isAuthenticated ? "/admin/projects" : "/login"}
                  className={navigationMenuItemStyle}
                >
                  {isAuthenticated ? "Admin" : "Connexion"}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  )
}

export default Nav
