import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link href="/en-desarrollo" className="flex items-center space-x-2">
        <span className="font-bold inline-block text-primary">ITSOEH</span>
      </Link>
      <nav className="hidden gap-6 md:flex">
        <Link href="/en-desarrollo" className="text-sm font-medium transition-colors hover:text-primary">
          Estudiantes
        </Link>
        <Link href="/" className="text-sm font-medium text-primary transition-colors border-b-2 border-primary pb-1">
          Egresados
        </Link>
        <Link href="/en-desarrollo" className="text-sm font-medium transition-colors hover:text-primary">
          Aspirantes
        </Link>
        <Link href="/en-desarrollo" className="text-sm font-medium transition-colors hover:text-primary">
          Público General
        </Link>
      </nav>
      <Button variant="outline" size="sm" className="md:hidden">
        Menú
      </Button>
    </div>
  )
}
