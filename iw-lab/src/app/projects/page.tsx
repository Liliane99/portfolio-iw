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

export default function Projects() {
  return (
    <div>
      <Nav />

      
      <div className="m-4 flex flex-wrap items-center gap-4">
        <Input type="text" placeholder="Rechercher un projet" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Modules" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tous les modules</SelectLabel>
              <SelectItem value="clean-code">Clean code</SelectItem>
              <SelectItem value="nodejs">NodeJS</SelectItem>
              <SelectItem value="nestjs">NestJS</SelectItem>
              <SelectItem value="php">PHP</SelectItem>
              <SelectItem value="tailwind">Tailwind</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Niveau" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tous les niveaux</SelectLabel>
              <SelectItem value="3iw">3IW</SelectItem>
              <SelectItem value="4iw">4IW</SelectItem>
              <SelectItem value="5iw">5IW</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Semestre" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tous les semestres</SelectLabel>
              <SelectItem value="s1">S1</SelectItem>
              <SelectItem value="s2">S2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      
      <div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>Project name #{i + 1}</CardTitle>
              <CardDescription>Project Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
