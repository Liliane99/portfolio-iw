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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart } from "lucide-react"; 

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(10);
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
        const published = data.filter((project: any) => project.fields.isPublished);
        setProjects(published);
        setFilteredProjects(published);

        const uniqueModules = [...new Set(published.map((p: any) => p.fields.module).filter(Boolean))];
        const uniqueDegrees = [...new Set(published.map((p: any) => p.fields.degree).filter(Boolean))];
        const uniqueSemesters = [...new Set(published.map((p: any) => p.fields.semester).filter(Boolean))];

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
  }, [search, selectedModule, selectedDegree, selectedSemester, projects]);

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

  const handleLike = async (projectId: string, currentLikes: number) => {
    const newLikes = currentLikes + 1;

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: { likes: newLikes },
        }),
      });

      if (res.ok) {
        setProjects((prev) =>
          prev.map((project: any) =>
            project.id === projectId
              ? { ...project, fields: { ...project.fields, likes: newLikes } }
              : project
          )
        );
        setFilteredProjects((prev) =>
          prev.map((project: any) =>
            project.id === projectId
              ? { ...project, fields: { ...project.fields, likes: newLikes } }
              : project
          )
        );
      } else {
        console.error("Erreur lors du like !");
      }
    } catch (error) {
      console.error("Erreur serveur lors du like :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      {loading ? (
        <div className="flex items-center justify-center h-[80vh]">
          <Progress value={progress} className="w-[40%]" />
        </div>
      ) : (
        <>
          <div className="m-6 flex flex-wrap items-center gap-4">
            <Input
              type="text"
              placeholder="Rechercher un projet"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-[250px]"
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

          <div className="m-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project: any) => {
                const { id, fields } = project;
                const { name, description, image, likes = 0 } = fields;

                return (
                  <Card
                    key={id}
                    className="flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex-1 flex flex-col">
                      <CardHeader>
                        <CardTitle className="text-lg">{name}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {description}
                        </CardDescription>
                      </CardHeader>

                      {image && (
                        <CardContent className="flex-1">
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
                    </div>

                    <CardFooter className="flex justify-between items-center mt-auto p-4">
                      <Button variant="outline" className="w-[70%]">
                        Voir le projet
                      </Button>

                      <div
                        className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                        onClick={() => handleLike(id, likes)}
                      >
                        <Heart className="w-5 h-5 fill-current" />
                        <span className="text-sm">{likes}</span>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <h2 className="text-xl font-bold text-gray-500">Aucun projet publié</h2>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
