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
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type ProjectFields = {
  name: string;
  description: string;
  image?: string;
  likes?: number;
  module?: string;
  degree?: string;
  semester?: string;
  isPublished: boolean;
};

type Project = {
  id: string;
  fields: ProjectFields;
};

const SkeletonCard = () => (
  <Card className="rounded-2xl shadow-md">
    <CardHeader>
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-40 w-full rounded-md" />
    </CardContent>
    <CardFooter className="flex justify-between items-center p-4">
      <Skeleton className="h-8 w-1/2 rounded-md" />
      <Skeleton className="h-6 w-6 rounded-full" />
    </CardFooter>
  </Card>
);

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [selectedSemester, setSelectedSemester] = useState<string>("");

  const [modules, setModules] = useState<string[]>([]);
  const [degrees, setDegrees] = useState<string[]>([]);
  const [semesters, setSemesters] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data: Project[] = await res.json();
        const published = data.filter((project) => project.fields.isPublished);

        setProjects(published);
        setFilteredProjects(published);

        setModules([...new Set(published.map((p) => p.fields.module).filter((mod): mod is string => Boolean(mod)))]);
        setDegrees([...new Set(published.map((p) => p.fields.degree).filter((deg): deg is string => Boolean(deg)))]);
        setSemesters([...new Set(published.map((p) => p.fields.semester).filter((sem): sem is string => Boolean(sem)))]);
      } catch (error) {
        console.error("Erreur lors du fetch des projets :", error);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    let temp = [...projects];

    if (search.trim()) {
      temp = temp.filter((project) =>
        project.fields.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedModule) {
      temp = temp.filter(
        (project) => project.fields.module?.toLowerCase() === selectedModule.toLowerCase()
      );
    }

    if (selectedDegree) {
      temp = temp.filter(
        (project) => project.fields.degree?.toLowerCase() === selectedDegree.toLowerCase()
      );
    }

    if (selectedSemester) {
      temp = temp.filter(
        (project) => project.fields.semester?.toLowerCase() === selectedSemester.toLowerCase()
      );
    }

    setFilteredProjects(temp);
  }, [search, selectedModule, selectedDegree, selectedSemester, projects]);

  const handleLike = async (projectId: string, currentLikes: number = 0) => {
    const newLikes = currentLikes + 1;

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: { likes: newLikes } }),
      });

      if (!res.ok) throw new Error("Erreur lors du like");

      const update = (list: Project[]) =>
        list.map((project) =>
          project.id === projectId
            ? { ...project, fields: { ...project.fields, likes: newLikes } }
            : project
        );

      setProjects(update);
      setFilteredProjects(update);
    } catch (error) {
      console.error("Erreur serveur lors du like :", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />

      <div className="m-6 flex flex-wrap items-center gap-4">
        <Input
          type="text"
          placeholder="Rechercher un projet"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-[250px]"
        />

        <Select onValueChange={setSelectedModule}>
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

        <Select onValueChange={setSelectedDegree}>
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

        <Select onValueChange={setSelectedSemester}>
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
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : filteredProjects.length > 0
          ? filteredProjects.map(({ id, fields }) => (
              <Card
                key={id}
                className="flex flex-col justify-between rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-1 flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg">{fields.name}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {fields.description}
                    </CardDescription>
                  </CardHeader>

                  {fields.image && (
                    <CardContent className="flex-1">
                      <div className="relative w-full h-40">
                        <Image
                          src={fields.image}
                          alt={fields.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                    </CardContent>
                  )}
                </div>

                <CardFooter className="flex justify-between items-center mt-auto p-4">
                  <Button asChild variant="outline" className="w-[70%]">
                    <a href={`/projects/${id}`}>Voir le projet</a>
                  </Button>
                  <div
                    className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
                    onClick={() => handleLike(id, fields.likes)}
                  >
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="text-sm">{fields.likes ?? 0}</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          : (
            <div className="flex flex-col items-center justify-center w-full min-h-[50vh]">
              <h2 className="text-2xl font-semibold text-gray-600">Aucun projet trouvé</h2>
            </div>
          )}
      </div>
    </div>
  );
}
