'use client'
import Image from "next/image";
import Nav from "@/components/navbar"
import { useState } from 'react'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <Nav />
      <main className="flex-1 flex flex-col max-w-6xl mx-auto py-16">
        
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          
          
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-8 text-[#FCA616]">
              Bienvenue <br />sur le site<br />IW LAB.
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl leading-relaxed">
              Découvrez tous les projets de la filière Ingénieur Web de l'école de l'ESGI. <br />
              Vous pourrez trouver des projets réalisés par les étudiants, ainsi que des informations sur les technologies utilisées et les compétences développées au cours de leur formation.
            </p>
          </div>

         
          <div className="w-full md:w-1/2">
            <Image
              src="/home_image.png"
              alt="Home Image"
              width={800}
              height={400}
              className=" w-full h-auto object-cover"
            />
          </div>
        </div>
      </main>
    </>
  )
}
