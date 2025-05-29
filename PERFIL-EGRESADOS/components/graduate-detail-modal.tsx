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
  Download,
  Copy,
  Check,
  LinkIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Graduate } from "@/types/graduate"

interface GraduateDetailModalProps {
  graduate: Graduate
  onClose: () => void
}

export function GraduateDetailModal({ graduate, onClose }: GraduateDetailModalProps) {
  const [activeTab, setActiveTab] = useState("perfil")
  const [showMore, setShowMore] = useState<Record<string, boolean>>({})
  const [isScrolled, setIsScrolled] = useState(false)
  const [copied, setCopied] = useState(false)
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

  // Función para descargar JSON
  const downloadJSON = () => {
    const dataStr = JSON.stringify(graduate, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `perfil_${graduate.name.replace(/\s+/g, "_").toLowerCase()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  // Función para copiar JSON al portapapeles
  const copyToClipboard = async () => {
    try {
      const dataStr = JSON.stringify(graduate, null, 2)
      await navigator.clipboard.writeText(dataStr)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Error copying to clipboard:", error)
    }
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
        className="bg-card border rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col mx-4"
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="bg-card/80 backdrop-blur-sm hover:bg-card/90 rounded-full shadow-sm border"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div ref={contentRef} className="flex-1 overflow-y-auto scrollbar-clean">
          <div className="sticky top-0 z-10 bg-card shadow-sm transition-shadow duration-300">
            {/* Header que cambia de tamaño */}
            <div
              className="transition-all duration-300 overflow-hidden"
              style={{
                maxHeight: isScrolled ? "60px" : "400px",
                padding: isScrolled ? "12px 0" : "0",
                opacity: 1,
              }}
            >
              {/* Header compacto */}
              <div
                className="px-6 flex items-center gap-4"
                style={{
                  display: isScrolled ? "flex" : "none",
                }}
              >
                <div className="h-12 w-12 relative rounded-full overflow-hidden border-2 border-border shadow-sm flex-shrink-0">
                  <Image src={graduate.photo || "/placeholder.svg"} alt={graduate.name} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <h2 className="font-bold text-lg truncate">{graduate.name}</h2>
                  <p className="text-sm text-primary truncate">{graduate.position}</p>
                </div>
              </div>

              {/* Header expandido */}
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
                    <h2 className="font-bold text-2xl mb-1 text-foreground drop-shadow-md">{graduate.name}</h2>
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
            <div className="px-4 sm:px-6 border-b bg-card">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-secondary/50 overflow-x-auto">
                  <TabsTrigger value="perfil" className="whitespace-nowrap">
                    Perfil
                  </TabsTrigger>
                  {graduate.education && graduate.education.length > 0 && (
                    <TabsTrigger value="educacion" className="whitespace-nowrap">
                      Educación
                    </TabsTrigger>
                  )}
                  {graduate.experience && graduate.experience.length > 0 && (
                    <TabsTrigger value="experiencia" className="whitespace-nowrap">
                      Experiencia
                    </TabsTrigger>
                  )}
                  {graduate.skills && graduate.skills.length > 0 && (
                    <TabsTrigger value="habilidades" className="whitespace-nowrap">
                      Habilidades
                    </TabsTrigger>
                  )}
                  {graduate.projects && graduate.projects.length > 0 && (
                    <TabsTrigger value="proyectos" className="whitespace-nowrap">
                      Proyectos
                    </TabsTrigger>
                  )}
                  <TabsTrigger value="descargar" className="whitespace-nowrap">
                    Descargar
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Contenido de las pestañas */}
          <div className="p-4 sm:p-6 pt-6 sm:pt-8">
            {activeTab === "perfil" && (
              <div className="space-y-6">
                {/* Información de contacto */}
                {graduate.contactInfo && (
                  <div>
                    <h4 className="text-lg font-medium mb-3">Información de contacto</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {graduate.contactInfo.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{graduate.contactInfo.email}</span>
                        </div>
                      )}
                      {graduate.contactInfo.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{graduate.contactInfo.phone}</span>
                        </div>
                      )}
                      {graduate.contactInfo.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{graduate.contactInfo.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Generación {graduate.startYear}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Información básica */}
                <div>
                  <h4 className="text-lg font-medium mb-3">Información básica</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Área de especialización</span>
                      <span className="font-medium">{graduate.area}</span>
                    </div>
                    <div className="flex flex-col p-3 bg-secondary/50 rounded-lg">
                      <span className="text-sm text-muted-foreground">Género</span>
                      <span className="font-medium capitalize">{graduate.gender}</span>
                    </div>
                  </div>
                </div>

                {/* Certificaciones */}
                {graduate.certifications && graduate.certifications.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium mb-3">Certificaciones</h4>
                    <div className="space-y-3">
                      {graduate.certifications.map((cert, index) => (
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
                )}

                {/* Idiomas */}
                {graduate.languages && graduate.languages.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium mb-3">Idiomas</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {graduate.languages.map((language, index) => (
                        <div key={index} className="flex flex-col p-3 bg-secondary/50 rounded-lg">
                          <span className="font-medium">{language.name}</span>
                          <span className="text-sm text-muted-foreground">{language.level}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Logros */}
                {graduate.achievements && graduate.achievements.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium mb-3">Logros</h4>
                    <div className="space-y-2">
                      {graduate.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Bookmark className="h-4 w-4 text-primary mt-1 shrink-0" />
                          <p className="text-muted-foreground">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Intereses */}
                {graduate.interests && graduate.interests.length > 0 && (
                  <div>
                    <h4 className="text-lg font-medium mb-3">Intereses</h4>
                    <div className="flex flex-wrap gap-2">
                      {graduate.interests.map((interest, index) => (
                        <Badge key={index} variant="outline" className="bg-secondary/50">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === "educacion" && graduate.education && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Formación académica</h4>
                  <div className="space-y-6">
                    {graduate.education.map((edu, index) => (
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
                        {edu.description && <p className="text-muted-foreground">{edu.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "experiencia" && graduate.experience && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Experiencia profesional</h4>
                  <div className="space-y-6">
                    {graduate.experience.map((exp, index) => (
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
                        {exp.description && (
                          <>
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
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "habilidades" && graduate.skills && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Habilidades técnicas</h4>
                  <div className="flex flex-wrap gap-2">
                    {graduate.skills.map((skill, index) => (
                      <Badge key={index} className="bg-primary/10 text-primary hover:bg-primary/20 border-0">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "proyectos" && graduate.projects && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Proyectos destacados</h4>
                  <div className="space-y-6">
                    {graduate.projects.map((project, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg bg-card shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-lg">{project.name}</h5>
                          <div className="flex items-center gap-2">
                            {project.year && <Badge variant="outline">{project.year}</Badge>}
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                                title="Ver proyecto"
                              >
                                <LinkIcon className="h-4 w-4" />
                              </a>
                            )}
                          </div>
                        </div>
                        {project.description && <p className="text-muted-foreground mb-3">{project.description}</p>}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary" className="bg-secondary/70">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "descargar" && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-medium mb-4">Exportar perfil</h4>
                  <p className="text-muted-foreground mb-6">
                    Descarga o copia la información completa del perfil en formato JSON para respaldo o uso en otras
                    aplicaciones.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-6 border border-border/50 rounded-xl bg-gradient-to-br from-card to-secondary/30 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Download className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h5 className="font-medium">Descargar archivo</h5>
                          <p className="text-sm text-muted-foreground">Guarda como archivo JSON</p>
                        </div>
                      </div>
                      <Button onClick={downloadJSON} className="w-full rounded-xl" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar JSON
                      </Button>
                    </div>

                    <div className="p-6 border border-border/50 rounded-xl bg-gradient-to-br from-card to-secondary/30 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          {copied ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <Copy className="h-5 w-5 text-accent" />
                          )}
                        </div>
                        <div>
                          <h5 className="font-medium">Copiar al portapapeles</h5>
                          <p className="text-sm text-muted-foreground">
                            {copied ? "¡Copiado exitosamente!" : "Copia el JSON completo"}
                          </p>
                        </div>
                      </div>
                      <Button onClick={copyToClipboard} variant="outline" className="w-full rounded-xl" size="sm">
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 mr-2 text-green-600" />
                            Copiado
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            Copiar JSON
                          </>
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-dashed border-muted-foreground/30">
                    <div className="flex items-start gap-3">
                      <div className="p-1 bg-blue-100 dark:bg-blue-900 rounded-full mt-0.5">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <div className="text-sm">
                        <p className="font-medium text-muted-foreground mb-1">Información del archivo</p>
                        <ul className="text-muted-foreground space-y-1">
                          <li>• Formato: JSON estructurado</li>
                          <li>• Incluye: Toda la información del perfil</li>
                          <li>• Compatible: Con sistemas de gestión de datos</li>
                          <li>• Tamaño: Aproximadamente {Math.round(JSON.stringify(graduate).length / 1024)} KB</li>
                        </ul>
                      </div>
                    </div>
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
