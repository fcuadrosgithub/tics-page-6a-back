import Link from "next/link"
import { GraduationCap, Briefcase, Users, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-bold">ITSOEH TIC</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#perfil" className="text-sm font-medium hover:underline underline-offset-4">
              Perfil del Egresado
            </Link>
            <Link href="#areas" className="text-sm font-medium hover:underline underline-offset-4">
              Áreas Profesionales
            </Link>
            <Link href="#empresas" className="text-sm font-medium hover:underline underline-offset-4">
              Empresas
            </Link>
            <Link href="#contacto" className="text-sm font-medium hover:underline underline-offset-4">
              Contacto
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Ingeniería en Tecnologías de la Información y Comunicaciones
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Instituto Tecnológico Superior del Occidente del Estado de Hidalgo
              </p>
            </div>
            <div className="space-x-4">
              <Button asChild>
                <Link href="#perfil">
                  Conoce más <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Perfil del Egresado */}
      <section id="perfil" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Perfil del Egresado</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nuestros egresados se distinguen por:
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4 items-start">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Formación Técnica</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Sólida formación en tecnologías de la información y comunicaciones
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Capacidad Analítica</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Habilidad para analizar problemas y proponer soluciones tecnológicas
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Pensamiento Crítico</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Evaluación objetiva de situaciones para tomar decisiones informadas
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Compromiso Ético</h3>
                <p className="text-sm text-muted-foreground text-center">
                  Responsabilidad y ética profesional en el manejo de la información
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas Profesionales */}
      <section id="areas" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Áreas Profesionales</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nuestros egresados están preparados para desempeñarse en:
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
              {[
                "Desarrollo de Software",
                "Administración de Redes",
                "Ciberseguridad",
                "Inteligencia Artificial",
                "Análisis de Datos",
                "Servicios en la Nube",
                "Gestión de Proyectos",
                "Automatización de Procesos",
              ].map((area, index) => (
                <div key={index} className="flex items-center space-x-2 rounded-lg border p-4 bg-background">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                  </div>
                  <span className="font-medium">{area}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Empresas */}
      <section id="empresas" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Donde Trabajan Nuestros Egresados
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Nuestros egresados se encuentran trabajando en importantes empresas:
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-5 items-center">
              {["Google México", "IBM", "Pemex", "Grupo Bimbo", "Startups Tecnológicas"].map((empresa, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 rounded-lg border p-6 bg-background">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-xl font-bold">{empresa.charAt(0)}</span>
                  </div>
                  <span className="font-medium text-center">{empresa}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contacto</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                ¿Interesado en conocer más sobre nuestra carrera?
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <textarea
                  placeholder="Mensaje"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button type="submit" className="w-full">
                  Enviar mensaje
                </Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Instituto Tecnológico Superior del Occidente del Estado de Hidalgo, Mixquiahuala de Juárez, Hidalgo,
                México
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 ITSOEH. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Política de privacidad
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Términos de servicio
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
