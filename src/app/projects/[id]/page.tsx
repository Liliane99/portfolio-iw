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

export default function ProjectDetail() {
  const [_api, setApi] = useState<CarouselApi>();
  const [project, setProject] = useState<any>(null);
  const { id: projectId } = useParams();

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération du projet");
        }

        const data = await res.json();
        console.log("Project data:", data);

        const fields = data.fields;
        console.log("imagesUrl:", fields.imagesUrl);
        setProject({
          title: fields.name,
          description: fields.description,
          images: fields.imagesUrl?.filter(Boolean), 
          technologies: fields.technologies,
          semester: fields.semester,
          students: fields.users ,
        });
      } catch (error) {
        console.error("Erreur lors du chargement du projet :", error);
      }
    };

    fetchProject();
  }, [projectId]);

  if (!project) {
    return (
      <>
        <Nav />
        <main className="max-w-6xl mx-auto p-6 mt-6">
          <p>Chargement du projet...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Nav />
      <main className="max-w-6xl mx-auto p-6 mt-6">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-gray-600 mb-6">{project.description}</p>

        <div className="flex flex-col md:flex-row gap-20">
          <div className="w-full md:w-2/3">
            <Carousel setApi={setApi}>
              <CarouselContent>
                {project.images.map((img: string, index: number) => (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative w-full h-96">
                          <Image
                            src={img}
                            alt={`Image`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-3rem]" />
              <CarouselNext className="right-[-3rem]" />
            </Carousel>
          </div>

          
          <div className="md:w-1/3 w-full bg-gray-50 rounded-lg p-4 shadow-sm border h-fit self-end">
            <h2 className="text-xl font-semibold mb-4">Informations</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-500 font-medium">Semestre</p>
              <p>{project.semester}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 font-medium">Technologies</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {project.technologies.map((tech: string, idx: number) => (
                  <Badge key={idx} variant="outline">{tech}</Badge>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 font-medium">Étudiants</p>
              <ul className="list-disc list-inside mt-1">
                {project.students.map((student: string, idx: number) => (
                  <li key={idx}>{student}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
