"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  X,
  Linkedin,
  Github,
  Twitter,
  Globe,
  Mail,
  Building,
  Briefcase,
  Calendar,
  GraduationCap,
  Award,
  MapPin,
  Phone,
  Bookmark,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Graduate } from "@/types/graduate"

interface GraduateDetailModalProps {
  graduate: Graduate
  onClose: () => void
}

// Datos adicionales simulados para el perfil extendido
const extendedData = {
  education: [
    {
      degree: "Ingeniería en Tecnologías de la Información y Comunicaciones",
      institution: "Instituto Tecnológico Superior del Occidente del Estado de Hidalgo",
      year: "2015-2020",
      description: "Especialización en Desarrollo de Software y Sistemas Inteligentes",
    },
    {
      degree: "Maestría en Ciencias de la Computación",
      institution: "Universidad Nacional Autónoma de México",
      year: "2021-2023",
      description: "Enfoque en Inteligencia Artificial y Aprendizaje Automático",
    },
  ],
  experience: [
    {
      position: "Desarrollador Full Stack",
      company: "Innovatech Solutions",
      period: "2020-2022",
      description:
        "Desarrollo de aplicaciones web y móviles utilizando React, Node.js y MongoDB. Implementación de APIs RESTful y arquitecturas basadas en microservicios.",
    },
    {
      position: "Ingeniero de Software Senior",
      company: "Microsoft México",
      period: "2022-Presente",
      description:
        "Liderazgo de equipos de desarrollo para productos cloud. Diseño e implementación de soluciones escalables en Azure. Optimización de rendimiento y seguridad en aplicaciones empresariales.",
    },
  ],
  skills: [
    "JavaScript/TypeScript",
    "React",
    "Node.js",
    "Python",
    "AWS",
    "Azure",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "SQL",
    "GraphQL",
    "CI/CD",
    "Machine Learning",
    "Agile/Scrum",
    "DevOps",
    "Microservicios",
  ],
  projects: [
    {
      name: "Sistema de Gestión Hospitalaria",
      description:
        "Plataforma integral para la administración de hospitales, incluyendo gestión de pacientes, citas, historiales médicos y facturación.",
      technologies: ["React", "Node.js", "MongoDB", "Docker"],
      year: "2021",
    },
    {
      name: "Plataforma de Análisis Predictivo",
      description:
        "Sistema de análisis de datos para predecir tendencias de mercado utilizando algoritmos de aprendizaje automático y procesamiento de grandes volúmenes de datos.",
      technologies: ["Python", "TensorFlow", "AWS", "Kafka"],
      year: "2022",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2021",
    },
    {
      name: "Microsoft Certified: Azure Developer Associate",
      issuer: "Microsoft",
      year: "2022",
    },
    {
      name: "Certified Kubernetes Administrator",
      issuer: "Cloud Native Computing Foundation",
      year: "2023",
    },
  ],
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "Avanzado (C1)" },
    { name: "Francés", level: "Intermedio (B1)" },
  ],
  interests: [
    "Inteligencia Artificial",
    "Desarrollo de Videojuegos",
    "Robótica",
    "Ciencia de Datos",
    "Ciberseguridad",
    "Tecnologías Emergentes",
  ],
  achievements: [
    "Premio a la Innovación Tecnológica 2022 por el desarrollo de soluciones de IA para el sector salud",
    "Ponente en el Congreso Internacional de Tecnologías de la Información 2023",
    "Publicación de artículo científico sobre optimización de algoritmos de aprendizaje profundo en la revista IEEE Transactions on Software Engineering",
  ],
}

export function GraduateDetailModal({ graduate, onClose }: GraduateDetailModalProps) {
  const [activeTab, setActiveTab] = useState("perfil")
  const [showMore, setShowMore] = useState<Record<string, boolean>>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Detectar scroll para reducir el tamaño del header
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const shouldShrink = contentRef.current.scrollTop > 50
        if (shouldShrink !== isScrolled) {
          setIsScrolled(shouldShrink)
        }
      }
    }

    const currentRef = contentRef.current
    if (currentRef) {
      currentRef.addEventListener("scroll", handleScroll)
      return () => currentRef.removeEventListener("scroll", handleScroll)
    }
  }, [isScrolled])

  const getSocialIcon = (key: string) => {
    switch (key) {
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      case "github":
        return <Github className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "website":
        return <Globe className="h-5 w-5" />
      case "email":
        return <Mail className="h-5 w-5" />
      default:
        return null
    }
  }

  const toggleShowMore = (key: string) => {
    setShowMore((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white border rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
        }}
      >
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full shadow-sm"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto scrollbar-clean">
          <div className="sticky top-0 z-10 bg-white shadow-sm transition-shadow duration-300">
            {/* Header que cambia de tamaño */}
            <div
              className="transition-all duration-300 overflow-hidden"
              style={{
                maxHeight: isScrolled ? "60px" : "400px",
                padding: isScrolled ? "12px 0" : "0",
                opacity: 1,
              }}
            >
              {/* Header compacto (siempre presente, se muestra/oculta con CSS) */}
              <div
                className="px-6 flex items-center gap-4"
                style={{
                  display: isScrolled ? "flex" : "none",
                }}
              >
                <div className="h-12 w-12 relative rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                  <Image src={graduate.photo || "/placeholder.svg"} alt={graduate.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-lg truncate">{graduate.name}</h2>
                  <p className="text-sm text-primary truncate">{graduate.position}</p>
                </div>
              </div>

              {/* Header expandido (siempre presente, se muestra/oculta con CSS) */}
              <div
                className="flex flex-col md:flex-row"
                style={{
                  display: isScrolled ? "none" : "flex",
                }}
              >
                <div className="md:w-1/3 relative">
                  <div className="aspect-[3/4] md:h-[300px] relative">
                    <Image
                      src={graduate.photo || "/placeholder.svg"}
                      alt={graduate.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="font-bold text-2xl mb-1 text-white drop-shadow-md">{graduate.name}</h2>
                  </div>
                </div>

                <div className="md:w-2/3 p-6">
                  <div className="flex flex-col gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <h3 className="font-medium text-lg text-primary">{graduate.position}</h3>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <p className="text-muted-foreground">{graduate.company}</p>
                      </div>
                    </div>

                    <div>
                      <p className="text-muted-foreground">{graduate.description}</p>
                    </div>

                    {graduate.socialLinks && Object.keys(graduate.socialLinks).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(graduate.socialLinks).map(([key, value]) => (
                          <a
                            key={key}
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors text-sm"
                          >
                            {getSocialIcon(key)}
                            <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs siempre visibles */}
            <div className="px-6 border-b bg-white">
              <Tabs defaultValue="perfil" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-secondary/50">
                  <TabsTrigger value="perfil">Perfil</TabsTrigger>
                  <TabsTrigger value="educacion">Educación</TabsTrigger>
                  <TabsTrigger value="experiencia">Experiencia</TabsTrigger>
                  <TabsTrigger value="habilidades">Habilidades</TabsTrigger>
                  <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Contenido de las pestañas */}
          <div className="p-6 pt-8">
            {activeTab === "perfil" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-3">Información de contacto</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>ejemplo@correo.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>+52 (771) 123 4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>Mixquiahuala, Hidalgo, México</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Generación 2015-2020</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Idiomas</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {extendedData.languages.map((language, index) => (
                      <div key={index} className="flex flex-col p-3 bg-secondary/50 rounded-lg">
                        <span className="font-medium">{language.name}</span>
                        <span className="text-sm text-muted-foreground">{language.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Certificaciones</h4>
                  <div className="space-y-3">
                    {extendedData.certifications.map((cert, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-secondary/50 rounded-lg">
                        <Award className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">{cert.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {cert.issuer} • {cert.year}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Logros</h4>
                  <div className="space-y-2">
                    {extendedData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Bookmark className="h-4 w-4 text-primary mt-1 shrink-0" />
                        <p className="text-muted-foreground">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium mb-3">Intereses</h4>
                  <div className="flex flex-wrap gap-2">
                    {extendedData.interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="bg-secondary/50">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "educacion" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Formación académica</h4>
                  <div className="space-y-6">
                    {extendedData.education.map((edu, index) => (
                      <div key={index} className="relative pl-6 border-l-2 border-muted pb-6 last:pb-0">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                        <div className="mb-1">
                          <span className="text-sm text-muted-foreground">{edu.year}</span>
                        </div>
                        <h5 className="font-medium text-lg">{edu.degree}</h5>
                        <div className="flex items-center gap-2 mb-2">
                          <GraduationCap className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{edu.institution}</span>
                        </div>
                        <p className="text-muted-foreground">{edu.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "experiencia" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Experiencia profesional</h4>
                  <div className="space-y-6">
                    {extendedData.experience.map((exp, index) => (
                      <div key={index} className="relative pl-6 border-l-2 border-muted pb-6 last:pb-0">
                        <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-primary"></div>
                        <div className="mb-1">
                          <span className="text-sm text-muted-foreground">{exp.period}</span>
                        </div>
                        <h5 className="font-medium text-lg">{exp.position}</h5>
                        <div className="flex items-center gap-2 mb-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{exp.company}</span>
                        </div>
                        <p className="text-muted-foreground">
                          {showMore[`exp-${index}`]
                            ? exp.description
                            : `${exp.description.substring(0, 150)}${exp.description.length > 150 ? "..." : ""}`}
                        </p>
                        {exp.description.length > 150 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 h-8 px-2 text-primary"
                            onClick={() => toggleShowMore(`exp-${index}`)}
                          >
                            {showMore[`exp-${index}`] ? (
                              <>
                                <ChevronUp className="h-4 w-4 mr-1" /> Ver menos
                              </>
                            ) : (
                              <>
                                <ChevronDown className="h-4 w-4 mr-1" /> Ver más
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "habilidades" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Habilidades técnicas</h4>
                  <div className="flex flex-wrap gap-2">
                    {extendedData.skills.map((skill, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "proyectos" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Proyectos destacados</h4>
                  <div className="space-y-6">
                    {extendedData.projects.map((project, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg bg-white shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-lg">{project.name}</h5>
                          <Badge variant="outline">{project.year}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="bg-secondary/70">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
