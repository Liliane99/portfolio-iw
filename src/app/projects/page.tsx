"use client";

import { useEffect, useState } from "react";
import Nav from "@/components/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { FaHeart, FaHeartBroken } from "react-icons/fa"; 

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(10);
  const [likedModules, setLikedModules] = useState<{ [key: string]: boolean }>({}); 

  const [search, setSearch] = useState("");
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");

  const [modules, setModules] = useState<string[]>([]);
  const [degrees, setDegrees] = useState<string[]>([]);
  const [semesters, setSemesters] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(80), 300);

    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
        setFilteredProjects(data);

        const uniqueModules = [...new Set(data.map((p: any) => p.fields.module).filter(Boolean))];
        const uniqueDegrees = [...new Set(data.map((p: any) => p.fields.degree).filter(Boolean))];
        const uniqueSemesters = [...new Set(data.map((p: any) => p.fields.semester).filter(Boolean))];

        setModules(uniqueModules);
        setDegrees(uniqueDegrees);
        setSemesters(uniqueSemesters);

        setProgress(100);
      } catch (error) {
        console.error("Erreur lors du fetch des projets :", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchProjects();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    filterProjects();
  }, [search, selectedModule, selectedDegree, selectedSemester]);

  const filterProjects = () => {
    let temp = [...projects];

    if (search.trim() !== "") {
      temp = temp.filter((project: any) =>
        project.fields.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedModule) {
      temp = temp.filter(
        (project: any) =>
          project.fields.module &&
          project.fields.module.toLowerCase() === selectedModule.toLowerCase()
      );
    }

    if (selectedDegree) {
      temp = temp.filter(
        (project: any) =>
          project.fields.degree &&
          project.fields.degree.toLowerCase() === selectedDegree.toLowerCase()
      );
    }

    if (selectedSemester) {
      temp = temp.filter(
        (project: any) =>
          project.fields.semester &&
          project.fields.semester.toLowerCase() === selectedSemester.toLowerCase()
      );
    }

    setFilteredProjects(temp);
  };

  // Fonction pour gérer le "like" et "dislike"
  const toggleLike = (moduleId: string) => {
    setLikedModules((prevState) => ({
      ...prevState,
      [moduleId]: !prevState[moduleId], // Inverse l'état du like
    }));
  };

  return (
    <div className="min-h-screen">
      <Nav />

      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Progress
            value={progress}
            className="w-[40%]" 
            style={{ backgroundColor: "#f4f4f4" }}
            indicatorColor="#FCA616"
          />
        </div>
      ) : (
        <>
          <div className="m-4 flex flex-wrap items-center gap-4">
            <Input
              type="text"
              placeholder="Rechercher un projet"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <Select onValueChange={(value) => setSelectedModule(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Modules" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Modules</SelectLabel>
                  {modules.map((mod) => (
                    <SelectItem key={mod} value={mod}>
                      {mod}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedDegree(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Niveaux</SelectLabel>
                  {degrees.map((deg) => (
                    <SelectItem key={deg} value={deg}>
                      {deg}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => setSelectedSemester(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Semestre" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Semestres</SelectLabel>
                  {semesters.map((sem) => (
                    <SelectItem key={sem} value={sem}>
                      {sem}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          
          <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project: any) => {
                const { id, fields } = project;
                const { name, description, image, module } = fields;

                return (
                  <Card key={id}>
                    <CardHeader>
                      <CardTitle>{name}</CardTitle>
                      <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    {image && (
                      <CardContent>
                        <div className="relative w-full h-40">
                          <Image
                            src={image}
                            alt={name}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      </CardContent>
                    )}
                    {/* Section de like */}
                    <CardFooter>
                      <button
                        onClick={() => toggleLike(module)}
                        className="text-xl"
                      >
                        {likedModules[module] ? <FaHeartBroken color="#FCA616" /> : <FaHeart />}
                      </button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <p>Aucun projet trouvé.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
