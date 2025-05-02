"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AppSidebar } from "@/components/sidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { toast } from "sonner";

export default function Admin() {
  const router = useRouter(); 
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = Cookies.get("token"); 
    if (!token) {
      router.push("/login"); 
    }
  }, [router]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
        setFilteredProjects(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des projets.");
        console.error("Erreur lors du fetch des projets :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handlePublishToggle = async (project: any) => {
    const { id, fields } = project;

    try {
      await fetch(`/api/projects/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fields: {
            isPublished: !fields.isPublished,
          },
        }),
      });

      const res = await fetch("/api/projects");
      const updatedProjects = await res.json();
      setProjects(updatedProjects);
      setFilteredProjects(updatedProjects);

      toast.success(
        fields.isPublished ? "Projet dépublié !" : "Projet publié !"
      );
    } catch (error) {
      toast.error("Erreur lors de la mise à jour.");
      console.error("Erreur lors du publish :", error);
    }
  };

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProjects(projects);
    } else {
      const temp = projects.filter((project: any) =>
        project.fields.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProjects(temp);
    }
  }, [search, projects]);

  return (
    <div className="flex min-h-screen">
      <div className="w-64 border-r bg-gray-50">
        <AppSidebar />
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Bienvenue Admin</h1>

        <Input
          type="text"
          placeholder="Rechercher un projet"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6"
        />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <Card key={index} className="space-y-4 p-4">
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-40 w-full rounded-md" />
                <Skeleton className="h-8 w-full" />
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProjects.map((project: any) => {
              const { id, fields } = project;
              const { name, description, image, isPublished } = fields;

              return (
                <Card key={id} className="relative">
                  {isPublished && (
                    <Badge className="absolute top-2 right-2">Publié</Badge>
                  )}
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
                  <CardFooter>
                    <Button onClick={() => handlePublishToggle(project)} className="w-full">
                      {isPublished ? "Dépublier" : "Publier"}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
