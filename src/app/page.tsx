'use client'

import Image from "next/image";
import Nav from "@/components/navbar"
import { Button } from "@/components/ui/button";
import { useState } from 'react'
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <>
      <Nav />
      <main className="flex-1 flex flex-col max-w-7xl mx-auto mt-20 px-6 py-20">
        
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          
          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl sm:text-6xl font-extrabold text-[#FCA616] leading-tight mb-6">
              Bienvenue sur le site<br /> <span className="text-black">IW LAB</span>
            </h1>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Explorez les projets innovants réalisés par les étudiants de la filière Ingénieurie du Web de l’ESGI. 
              Technologies, créativité, compétences : un concentré d'expertise à découvrir.
            </p>

            <div className="flex gap-4">
              <Link href="/projects">
                <Button className="bg-[#FCA616] hover:bg-[#ffb733] text-black text-sm font-semibold">
                  Voir les projets
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="text-sm font-semibold">
                  Connexion
                </Button>
              </Link>
            </div>
          </motion.div>

          
          <motion.div 
            className="w-full md:w-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Image
              src="/home_image.png"
              alt="Illustration IW LAB"
              width={800}
              height={500}
              className="w-full h-auto object-cover"
              priority
            />
          </motion.div>
        </div>
      </main>
    </>
  )
}
