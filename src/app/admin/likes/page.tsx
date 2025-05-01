"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AppSidebar } from "@/components/sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

export default function AdminLikes() {
  const router = useRouter(); 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);

  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Erreur lors du fetch des projets :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="w-64 border-r bg-gray-50">
        <AppSidebar />
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-6">Classement des projets par Likes</h1>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <Card className="p-4">
            <Table>
              <TableCaption>Liste des projets avec leur nombre de likes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Projet</TableHead>
                  <TableHead>Likes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects
                  .sort((a: any, b: any) => (b.fields.likes || 0) - (a.fields.likes || 0))
                  .map((project: any) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.fields.name}</TableCell>
                      <TableCell>{project.fields.likes ?? 0}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </div>
    </div>
  );
}
