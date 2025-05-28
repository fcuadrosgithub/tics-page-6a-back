import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { GraduateProfiles } from "@/components/graduate-profiles"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <MainNav />
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-10">
          <div className="max-w-3xl mb-10">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Perfiles de Egresados
            </h1>
            <p className="text-muted-foreground text-lg">
              Conoce a nuestros egresados de la carrera de Ingeniería en Tecnologías de la Información y Comunicaciones
              del ITSOEH.
            </p>
          </div>
          <GraduateProfiles />
        </section>
      </main>
      <footer className="border-t py-6 bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Instituto Tecnológico Superior del Occidente del Estado de Hidalgo. Todos
            los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}
