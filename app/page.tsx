import Link from "next/link"
import Image from "next/image"
import {
  GraduationCap,
  Briefcase,
  Award,
  ArrowRight,
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  ExternalLink,
  School,
  Scroll,
  Building,
  MapPin,
  Mail,
  Phone,
  Star,
  Lightbulb,
  Target,
  BarChart,
  Download,
  Code,
  Cpu,
  Network,
  Shield,
  Database,
  Wrench,
  Globe,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

function ITSOEHPage() {
  const carreras = [
    {
      nombre: "Ingeniería en Tecnologías de la Información y Comunicaciones",
      descripcion: "Desarrollo de software, redes, ciberseguridad y sistemas de información",
      icon: <Code className="h-8 w-8 text-primary" />,
      areas: ["Desarrollo Web", "Apps Móviles", "Bases de Datos", "Redes"],
    },
    {
      nombre: "Ingeniería en Sistemas Computacionales",
      descripcion: "Diseño y desarrollo de sistemas computacionales complejos",
      icon: <Cpu className="h-8 w-8 text-primary" />,
      areas: ["Sistemas Embebidos", "Inteligencia Artificial", "Algoritmos", "Hardware"],
    },
    {
      nombre: "Ingeniería Industrial",
      descripcion: "Optimización de procesos y sistemas de producción",
      icon: <Wrench className="h-8 w-8 text-primary" />,
      areas: ["Lean Manufacturing", "Calidad", "Logística", "Automatización"],
    },
    {
      nombre: "Ingeniería Electromecánica",
      descripcion: "Integración de sistemas eléctricos y mecánicos",
      icon: <Network className="h-8 w-8 text-primary" />,
      areas: ["Automatización", "Control", "Mantenimiento", "Energías Renovables"],
    },
    {
      nombre: "Ingeniería en Gestión Empresarial",
      descripcion: "Administración y gestión de empresas con enfoque tecnológico",
      icon: <Building className="h-8 w-8 text-primary" />,
      areas: ["Finanzas", "Marketing Digital", "Recursos Humanos", "Emprendimiento"],
    },
    {
      nombre: "Ingeniería en Industrias Alimentarias",
      descripcion: "Desarrollo y optimización de procesos en la industria alimentaria",
      icon: <Wrench className="h-8 w-8 text-primary" />,
      areas: ["Procesamiento de Alimentos", "Control de Calidad", "Inocuidad Alimentaria", "Tecnología de Alimentos"],
    },
    {
      nombre: "Ingeniería en Logística",
      descripcion: "Gestión eficiente de cadenas de suministro y distribución",
      icon: <Network className="h-8 w-8 text-primary" />,
      areas: ["Supply Chain", "Distribución", "Almacenamiento", "Transporte"],
    },
    {
      nombre: "Arquitectura",
      descripcion: "Diseño y construcción de espacios habitables sustentables",
      icon: <Home className="h-8 w-8 text-primary" />,
      areas: ["Diseño Arquitectónico", "Construcción Sustentable", "Urbanismo", "BIM"],
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative h-8 w-8">
              <Image
                src="/logo.jpg?height=32&width=32&text=ITSOEH"
                alt="ITSOEH Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-bold">ITSOEH</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#inicio" className="text-sm font-medium hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="#carreras" className="text-sm font-medium hover:text-primary transition-colors">
              Carreras
            </Link>
            <Link href="#egresados" className="text-sm font-medium hover:text-primary transition-colors">
              Egresados
            </Link>
            <Link href="#titulacion" className="text-sm font-medium hover:text-primary transition-colors">
              Titulación
            </Link>
            <Link href="#contacto" className="text-sm font-medium hover:text-primary transition-colors">
              Contacto
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section con imagen de fondo */}
      <section
        id="inicio"
        className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/fondo.jpg?height=800&width=1200&text=Campus+ITSOEH"
            alt="Campus ITSOEH"
            fill
        
        
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80 z-10"></div>
        <div className="container px-4 md:px-6 relative z-20">
          <div className="flex flex-col items-center space-y-6 text-center">
            <Badge className="mb-2" variant="outline">
              Excelencia Académica desde 2001
            </Badge>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in">
                Instituto Tecnológico Superior del Occidente del Estado de Hidalgo
              </h1>
              <p className="mx-auto max-w-[800px] text-muted-foreground md:text-xl lg:text-2xl">
                Formando profesionales competitivos en tecnología, ingeniería y arquitectura para el desarrollo
                sustentable de México
              </p>
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                <Badge variant="secondary">7 Ingenierías</Badge>
                <Badge variant="secondary">Arquitectura</Badge>
                <Badge variant="secondary">Posgrados</Badge>
                <Badge variant="secondary">Educación Continua</Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button asChild size="lg" className="animate-pulse">
                <Link href="#carreras">
                  Conoce nuestras carreras <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="#egresados">
                  Portal de Egresados <ExternalLink className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="https://www.itsoeh.edu.mx/front/titulacion.html" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Proceso de Titulación
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Misión, Visión y Valores */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Misión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Formar profesionales competitivos, íntegros e innovadores en las áreas de ingeniería y arquitectura,
                  comprometidos con el desarrollo sustentable de su entorno.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Visión</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ser una institución de educación superior tecnológica reconocida por su calidad académica y
                  vinculación con el sector productivo.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Valores</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Honestidad, responsabilidad, respeto, compromiso social, calidad, innovación y sustentabilidad en
                  todas nuestras actividades.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Carreras - 7 Ingenierías + Arquitectura */}
      <section id="carreras" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Oferta Académica</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                7 Ingenierías especializadas en tecnología y la carrera de Arquitectura
              </p>
            </div>

            <div className="w-full max-w-6xl">
              <h3 className="text-2xl font-bold mb-8">Nuestras Carreras</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {carreras.map((carrera, index) => (
                  <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-center justify-center mb-4">
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          {carrera.icon}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight">{carrera.nombre}</CardTitle>
                      <CardDescription>{carrera.descripcion}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Áreas de especialización:</h4>
                        <div className="flex flex-wrap gap-1">
                          {carrera.areas.map((area, areaIndex) => (
                            <Badge key={areaIndex} variant="outline" className="text-xs">
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <Link
                          href="https://www.itsoeh.edu.mx/front/services.html"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver plan de estudios <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Egresados Completa */}
      <section id="egresados" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Egresados ITSOEH</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Más de 5,000 egresados transformando México y el mundo
              </p>
            </div>

            {/* Galería de Egresados */}
            <div className="w-full max-w-6xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {[
                    {
                      title: "Ceremonia de Graduación 2023",
                      description: "Generación 2019-2023 de todas las carreras",
                      image: "/placeholder.svg?height=300&width=400&text=Graduación+2023",
                    },
                    {
                      title: "Egresados en Google México",
                      description: "Nuestros egresados en empresas tecnológicas líderes",
                      image: "/placeholder.svg?height=300&width=400&text=Google+México",
                    },
                    {
                      title: "Encuentro de Egresados 2023",
                      description: "Networking y actualización profesional",
                      image: "/placeholder.svg?height=300&width=400&text=Encuentro+Egresados",
                    },
                    {
                      title: "Egresados Emprendedores",
                      description: "Startups fundadas por egresados ITSOEH",
                      image: "/placeholder.svg?height=300&width=400&text=Emprendedores",
                    },
                    {
                      title: "Reconocimientos Profesionales",
                      description: "Egresados destacados en sus áreas",
                      image: "/placeholder.svg?height=300&width=400&text=Reconocimientos",
                    },
                  ].map((item, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card className="overflow-hidden group">
                          <div className="relative h-60 w-full">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.title}
                              fill
                              className="object-cover transition-all group-hover:scale-105 duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h3 className="font-semibold text-sm">{item.title}</h3>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-1">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static mr-2" />
                  <CarouselNext className="relative static ml-2" />
                </div>
              </Carousel>
            </div>

            {/* Estadísticas Reales */}
            <div className="w-full max-w-6xl">
              <Card className="bg-background border-primary/20">
                <CardHeader>
                  <CardTitle className="text-center">Estadísticas de Egresados ITSOEH</CardTitle>
                  <CardDescription className="text-center">
                    Datos actualizados del seguimiento a egresados 2023
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        value: "5,247",
                        label: "Egresados totales",
                        icon: <GraduationCap className="h-8 w-8 text-primary" />,
                      },
                      {
                        value: "94%",
                        label: "Empleabilidad",
                        icon: <BarChart className="h-8 w-8 text-primary" />,
                      },
                      {
                        value: "89%",
                        label: "Trabajan en su área",
                        icon: <Target className="h-8 w-8 text-primary" />,
                      },
                      {
                        value: "156",
                        label: "Empresas empleadoras",
                        icon: <Building className="h-8 w-8 text-primary" />,
                      },
                    ].map((stat, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center p-6 rounded-lg border bg-card hover:bg-primary/5 transition-colors duration-300"
                      >
                        <div className="mb-3">{stat.icon}</div>
                        <div className="text-3xl font-bold text-primary">{stat.value}</div>
                        <div className="text-sm text-muted-foreground text-center">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Servicios para Egresados */}
            <div className="w-full max-w-6xl">
              <Tabs defaultValue="servicios" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="bolsa">Bolsa de Trabajo</TabsTrigger>
                  <TabsTrigger value="educacion">Educación Continua</TabsTrigger>
                </TabsList>

                <TabsContent value="bolsa" className="mt-6">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-center gap-2">
                        <Briefcase className="h-6 w-6 text-primary" />
                        Bolsa de Trabajo ITSOEH
                      </CardTitle>
                      <CardDescription className="text-center">
                        Conectamos a nuestros egresados con más de 150 empresas empleadoras
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-4">
                          <h4 className="font-medium">Empresas Empleadoras Destacadas:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              "Google México",
                              "IBM",
                              "Pemex",
                              "Grupo Bimbo",
                              "Telmex",
                              "CFE",
                              "Walmart México",
                              "Startups Tech",
                            ].map((empresa, index) => (
                              <div key={index} className="flex items-center gap-2 p-2 rounded border">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-sm">{empresa}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-medium">Servicios de la Bolsa de Trabajo:</h4>
                          <ul className="space-y-2">
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-sm">Vacantes exclusivas para egresados ITSOEH</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-sm">Asesoría para elaboración de CV</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-sm">Preparación para entrevistas laborales</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                              <span className="text-sm">Seguimiento personalizado</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2"></CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="educacion" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Posgrados</CardTitle>
                        <CardDescription>Maestrías y especializaciones disponibles</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <span className="text-sm">Maestría en Sistemas Computacionales</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <span className="text-sm">Maestría en Ingeniería Industrial</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-primary" />
                            <span className="text-sm">Especialidad en Energías Renovables</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Cursos de Actualización</CardTitle>
                        <CardDescription>Capacitación continua en tecnologías emergentes</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2">
                            <Code className="h-4 w-4 text-primary" />
                            <span className="text-sm">Desarrollo en React y Node.js</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-primary" />
                            <span className="text-sm">Big Data y Analytics</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <span className="text-sm">Ciberseguridad Avanzada</span>
                          </li>
                        </ul>
                      </CardContent>
                      <CardFooter></CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Testimonios de Egresados */}
            <div className="w-full max-w-6xl mt-8">
              <h3 className="text-2xl font-bold mb-6">Testimonios de Egresados Destacados</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {[
                    {
                      name: "Ing. Carlos Hernández Martínez",
                      year: "2018",
                      carrera: "Ingeniería en TIC",
                      company: "Google México - Software Engineer",
                      quote:
                        "La formación integral que recibí en el ITSOEH me permitió desarrollar las habilidades técnicas y humanas necesarias para trabajar en una empresa de clase mundial como Google.",
                      image: "/placeholder.svg?height=80&width=80&text=CH",
                    },
                    {
                      name: "Arq. Laura Martínez Sánchez",
                      year: "2019",
                      carrera: "Arquitectura",
                      company: "Estudio Propio - Arquitectura Sustentable",
                      quote:
                        "Los conocimientos en sustentabilidad y tecnología BIM que adquirí me han permitido crear mi propio estudio especializado en arquitectura verde.",
                      image: "/placeholder.svg?height=80&width=80&text=LM",
                    },
                    {
                      name: "Ing. Miguel Ángel Pérez",
                      year: "2017",
                      carrera: "Ingeniería Industrial",
                      company: "Grupo Bimbo - Gerente de Operaciones",
                      quote:
                        "La formación en optimización de procesos y liderazgo me ha llevado a ocupar posiciones gerenciales en una de las empresas más importantes de México.",
                      image: "/placeholder.svg?height=80&width=80&text=MP",
                    },
                    {
                      name: "Ing. Ana Sofía López",
                      year: "2020",
                      carrera: "Ingeniería en Energías Renovables",
                      company: "CFE - Especialista en Energía Solar",
                      quote:
                        "Gracias a la especialización en energías renovables, estoy contribuyendo a la transición energética de México desde la Comisión Federal de Electricidad.",
                      image: "/placeholder.svg?height=80&width=80&text=AL",
                    },
                  ].map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2">
                      <div className="p-1">
                        <Card className="h-full">
                          <CardContent className="p-6 flex flex-col h-full">
                            <div className="flex-1">
                              <div className="flex items-center mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                    strokeWidth={0}
                                  />
                                ))}
                              </div>
                              <blockquote className="text-sm italic mb-4">"{testimonial.quote}"</blockquote>
                            </div>
                            <div className="flex items-center mt-4">
                              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                                <Image
                                  src={testimonial.image || "/placeholder.svg"}
                                  alt={testimonial.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <div className="font-semibold text-sm">{testimonial.name}</div>
                                <div className="text-xs text-muted-foreground">{testimonial.carrera}</div>
                                <div className="text-xs text-muted-foreground">
                                  Generación {testimonial.year} | {testimonial.company}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center mt-4">
                  <CarouselPrevious className="relative static mr-2" />
                  <CarouselNext className="relative static ml-2" />
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      {/* Titulación */}
      <section id="titulacion" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-8 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Proceso de Titulación</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Múltiples opciones para obtener tu título profesional
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 w-full max-w-5xl">
              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scroll className="h-5 w-5 text-primary" />
                    Opciones de Titulación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Titulación por Tesis</AccordionTrigger>
                      <AccordionContent>
                        Desarrollo de un proyecto de investigación original bajo la supervisión de un asesor académico
                        especializado.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>Titulación por Proyecto Aplicativo</AccordionTrigger>
                      <AccordionContent>
                        Desarrollo de un proyecto que resuelva una problemática específica del sector productivo o
                        social.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>Titulación por EGEL (CENEVAL)</AccordionTrigger>
                      <AccordionContent>
                        Aprobación del Examen General de Egreso de Licenciatura del Centro Nacional de Evaluación.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Titulación por Promedio</AccordionTrigger>
                      <AccordionContent>
                        Para estudiantes con promedio general mínimo de 90 y sin materias reprobadas durante la carrera.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>Titulación por Estudios de Posgrado</AccordionTrigger>
                      <AccordionContent>
                        Acreditación del 50% de créditos de una maestría afín a la carrera cursada.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>

              <Card className="transition-all duration-300 hover:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Requisitos y Documentación
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Certificado de terminación de estudios (100% de créditos)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Constancia de liberación de servicio social</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Constancia de acreditación del idioma inglés (TOEFL 450 pts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Constancia de no adeudo de material bibliográfico</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Comprobante de pago de derechos de titulación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      <span className="text-sm">Fotografías tamaño título y credencial</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href="https://www.itsoeh.edu.mx/front/titulacion.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Descargar formatos (PDF)
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="w-full max-w-5xl mt-8">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Calendario de Titulación 2024
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border bg-card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">Recepción de Expedientes</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Primera semana de cada mes</p>
                      <p className="text-xs text-muted-foreground mt-1">Horario: 9:00 AM - 2:00 PM</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">Revisión y Validación</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Segunda semana de cada mes</p>
                      <p className="text-xs text-muted-foreground mt-1">Notificación por correo electrónico</p>
                    </div>
                    <div className="rounded-lg border bg-card p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">Ceremonias de Titulación</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">Última semana de cada mes</p>
                      <p className="text-xs text-muted-foreground mt-1">Auditorio Principal - 10:00 AM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="https://www.itsoeh.edu.mx/front/titulacion.html" target="_blank" rel="noopener noreferrer">
                  <School className="h-5 w-5" />
                  Iniciar proceso de titulación
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contacto</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                ¿Interesado en formar parte de la comunidad ITSOEH?
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
              <Card>
                <CardHeader>
                  <CardTitle>Envíanos un mensaje</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col space-y-4">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <input
                      type="email"
                      placeholder="Correo electrónico"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                      <option value="">Selecciona el tema de consulta</option>
                      <option value="admisiones">Proceso de Admisión</option>
                      <option value="carreras">Información de Carreras</option>
                      <option value="titulacion">Proceso de Titulación</option>
                      <option value="egresados">Servicios para Egresados</option>
                      <option value="becas">Becas y Apoyos</option>
                      <option value="otro">Otro</option>
                    </select>
                    <textarea
                      placeholder="Mensaje"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <Button type="submit" className="w-full">
                      Enviar mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Dirección</h4>
                      <p className="text-sm text-muted-foreground">
                        Carretera Mixquiahuala-Tula Km. 2.5
                        <br />
                        Paseo del Agrarismo 2000
                        <br />
                        Mixquiahuala de Juárez, Hidalgo, México
                        <br />
                        C.P. 42700
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Teléfonos</h4>
                      <p className="text-sm text-muted-foreground">
                        Conmutador: (738) 735 4000
                        <br />
                        Admisiones: (738) 735 4001
                        <br />
                        Titulación: (738) 735 4002
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Correos electrónicos</h4>
                      <p className="text-sm text-muted-foreground">
                        General: contacto@itsoeh.edu.mx
                        <br />
                        Admisiones: admisiones@itsoeh.edu.mx
                        <br />
                        Egresados: egresados@itsoeh.edu.mx
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Horarios de atención</h4>
                      <p className="text-sm text-muted-foreground">
                        Lunes a Viernes: 8:00 AM - 6:00 PM
                        <br />
                        Sábados: 9:00 AM - 1:00 PM
                        <br />
                        Domingos: Cerrado
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="https://www.google.com/maps/place/ITSOEH" target="_blank" rel="noopener noreferrer">
                      <MapPin className="mr-2 h-4 w-4" />
                      Ver ubicación en mapa
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1">
                    <Link href="https://www.itsoeh.edu.mx" target="_blank" rel="noopener noreferrer">
                      <Globe className="mr-2 h-4 w-4" />
                      Sitio web oficial
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t py-8 md:py-12 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative h-8 w-8">
                  <Image
                    src="/logo.jpg??height=32&width=32&text=ITSOEH"
                    alt="ITSOEH Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold">ITSOEH</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Instituto Tecnológico Superior del Occidente del Estado de Hidalgo. Formando profesionales competitivos
                desde 2001.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                 
                    Portal de Egresados
                  
                </li>
                <li>
                 
                    Proceso de Titulación
                  
                </li>
                <li>
                 
                    Bolsa de Trabajo
                 
                </li>
                <li>
                 
                    Biblioteca Digital
                  
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold">-------------</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  
                    Admisiones
                  
                </li>
                <li>
                 
                    Becas y Apoyos
                  
                </li>
                <li>
                
                    Posgrados
                  
                </li>
                <li>
                
                    Transparencia
                
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 Instituto Tecnológico Superior del Occidente del Estado de Hidalgo. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4">
             
                Aviso de Privacidad
             
             
                Términos y Condiciones
             
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ITSOEHPage
