"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Nav from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Project = {
  title: string;
  description: string;
  images: string[];
  technologies: string[];
  semester: string;
  students: string[];
};

export default function ProjectDetail() {
  const [_api, setApi] = useState<CarouselApi>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const { id: projectId } = useParams();

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) throw new Error("Erreur lors de la récupération du projet");

        const data = await res.json();
        const fields = data.fields;

        setProject({
          title: fields.name,
          description: fields.description,
          images: fields.imagesUrl?.filter(Boolean) ?? [],
          technologies: fields.technologies ?? [],
          semester: fields.semester ?? "Inconnu",
          students: fields.users ?? [],
        });
      } catch (error) {
        console.error("Erreur lors du chargement du projet :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto p-6 mt-6">
        {loading ? (
          <div className="space-y-6">
            <Skeleton className="h-10 w-1/2" />
            <Skeleton className="h-6 w-3/4" />
            <div className="flex flex-col md:flex-row gap-6">
              <Skeleton className="h-96 w-full md:w-2/3" />
              <Skeleton className="h-60 w-full md:w-1/3" />
            </div>
          </div>
        ) : project ? (
          <>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-gray-600 mb-6">{project.description}</p>

            <div className="flex flex-col md:flex-row gap-8">
              
              <div className="w-full md:w-2/3">
                {project.images.length > 0 ? (
                  <Carousel setApi={setApi}>
                    <CarouselContent>
                      {project.images.map((img, index) => (
                        <CarouselItem key={index}>
                          <Card className="overflow-hidden">
                            <CardContent className="p-0">
                              <div className="relative w-full h-96">
                                <Image
                                  src={img}
                                  alt={`Image ${index + 1}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-[-2rem]" />
                    <CarouselNext className="right-[-2rem]" />
                  </Carousel>
                ) : (
                  <div className="text-gray-400 text-center py-10 border rounded-lg">
                    Aucune image disponible.
                  </div>
                )}
              </div>

              
              <div className="md:w-1/3 w-full bg-white rounded-xl p-6 shadow border h-fit">
                <h2 className="text-xl font-semibold mb-4">Informations</h2>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 font-medium">Semestre</p>
                  <p>{project.semester}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-500 font-medium">Technologies</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.technologies.length > 0 ? (
                      project.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="outline">
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-400">Aucune</span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 font-medium">Étudiants</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    {project.students.length > 0 ? (
                      project.students.map((student, idx) => (
                        <li key={idx}>{student}</li>
                      ))
                    ) : (
                      <span className="text-gray-400">Non renseigné</span>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-red-500 text-center">Projet introuvable.</p>
        )}
      </main>
    </>
  );
}
