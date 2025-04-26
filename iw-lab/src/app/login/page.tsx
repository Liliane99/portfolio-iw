import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Nav from "@/components/navbar"
import { Button, buttonVariants } from "@/components/ui/button"

export default function InputWithLabel() {
  return (
    <>
      <Nav />
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="grid w-full max-w-sm items-center gap-4 p-6 border rounded-lg shadow-md bg-white">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="password">Mot de passe</Label>
            <Input type="password" id="password" placeholder="Mot de passe" />
          </div>
          <Button className={buttonVariants({ variant: "default" })}>
            Connexion
          </Button>
        </div>
      </div>
    </>
  )
}
