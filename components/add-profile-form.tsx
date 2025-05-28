"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Linkedin, Github, Twitter, Globe, Mail, Upload, User, Plus, Trash2, LinkIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { Graduate, Education, Experience, Project, Certification, Language, ContactInfo } from "@/types/graduate"
import Image from "next/image"

interface AddProfileFormProps {
  onSubmit: (graduate: Graduate) => void
  onCancel: () => void
  yearOptions: string[]
}

type SocialMediaType = "linkedin" | "github" | "twitter" | "website" | "email"

interface SocialMediaOption {
  id: SocialMediaType
  label: string
  icon: React.ReactNode
  placeholder: string
}

const socialMediaOptions: SocialMediaOption[] = [
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <Linkedin className="h-4 w-4" />,
    placeholder: "https://linkedin.com/in/username",
  },
  {
    id: "github",
    label: "GitHub",
    icon: <Github className="h-4 w-4" />,
    placeholder: "https://github.com/username",
  },
  {
    id: "twitter",
    label: "Twitter",
    icon: <Twitter className="h-4 w-4" />,
    placeholder: "https://twitter.com/username",
  },
  {
    id: "website",
    label: "Sitio Web",
    icon: <Globe className="h-4 w-4" />,
    placeholder: "https://example.com",
  },
  {
    id: "email",
    label: "Email",
    icon: <Mail className="h-4 w-4" />,
    placeholder: "correo@ejemplo.com",
  },
]

// Áreas predefinidas
const predefinedAreas = [
  "Desarrollo de Software",
  "Infraestructura y Cloud",
  "Ciberseguridad",
  "Arquitectura de Software",
  "Ciencia de Datos",
  "Gestión de Proyectos",
  "Inteligencia Artificial",
  "Redes y Telecomunicaciones",
  "Desarrollo Web",
  "Desarrollo Móvil",
  "Bases de Datos",
  "DevOps",
  "UX/UI",
  "Otro",
]

// Función para obtener imagen por defecto según género
const getDefaultPhoto = (gender: string): string => {
  switch (gender) {
    case "masculino":
      return "/placeholder.svg?height=300&width=300&text=👨"
    case "femenino":
      return "/placeholder.svg?height=300&width=300&text=👩"
    case "indefinido":
    default:
      return "/placeholder.svg?height=300&width=300&text=👤"
  }
}

export function AddProfileForm({ onSubmit, onCancel, yearOptions }: AddProfileFormProps) {
  const [activeTab, setActiveTab] = useState("perfil")
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    description: "",
    photo: "",
    gender: "indefinido" as "masculino" | "femenino" | "indefinido",
    area: "",
    startYear: "",
  })

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "",
    phone: "",
    location: "",
  })

  const [education, setEducation] = useState<Education[]>([
    {
      degree: "",
      institution: "",
      year: "",
      description: "",
    },
  ])

  const [experience, setExperience] = useState<Experience[]>([
    {
      position: "",
      company: "",
      period: "",
      description: "",
    },
  ])

  const [skills, setSkills] = useState<string[]>([])
  const [newSkill, setNewSkill] = useState("")

  const [projects, setProjects] = useState<Project[]>([])
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [newInterest, setNewInterest] = useState("")
  const [achievements, setAchievements] = useState<string[]>([])
  const [newAchievement, setNewAchievement] = useState("")

  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({})
  const [activeSocialMedia, setActiveSocialMedia] = useState<SocialMediaType[]>([])
  const [imagePreview, setImagePreview] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleContactInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setContactInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleEducationChange = (index: number, field: keyof Education, value: string) => {
    setEducation((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addEducation = () => {
    setEducation((prev) => [
      ...prev,
      {
        degree: "",
        institution: "",
        year: "",
        description: "",
      },
    ])
  }

  const removeEducation = (index: number) => {
    setEducation((prev) => prev.filter((_, i) => i !== index))
  }

  const handleExperienceChange = (index: number, field: keyof Experience, value: string) => {
    setExperience((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const addExperience = () => {
    setExperience((prev) => [
      ...prev,
      {
        position: "",
        company: "",
        period: "",
        description: "",
      },
    ])
  }

  const removeExperience = (index: number) => {
    setExperience((prev) => prev.filter((_, i) => i !== index))
  }

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills((prev) => [...prev, newSkill.trim()])
      setNewSkill("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill))
  }

  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        name: "",
        description: "",
        technologies: [],
        year: "",
        link: "",
      },
    ])
  }

  const handleProjectChange = (index: number, field: keyof Project, value: string | string[]) => {
    setProjects((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      return updated
    })
  }

  const removeProject = (index: number) => {
    setProjects((prev) => prev.filter((_, i) => i !== index))
  }

  const addProjectTechnology = (projectIndex: number, technology: string) => {
    if (technology.trim()) {
      setProjects((prev) => {
        const updated = [...prev]
        updated[projectIndex] = {
          ...updated[projectIndex],
          technologies: [...(updated[projectIndex].technologies || []), technology.trim()],
        }
        return updated
      })
    }
  }

  const removeProjectTechnology = (projectIndex: number, technology: string) => {
    setProjects((prev) => {
      const updated = [...prev]
      updated[projectIndex] = {
        ...updated[projectIndex],
        technologies: updated[projectIndex].technologies.filter((t) => t !== technology),
      }
      return updated
    })
  }

  const addInterest = () => {
    if (newInterest.trim() && !interests.includes(newInterest.trim())) {
      setInterests((prev) => [...prev, newInterest.trim()])
      setNewInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setInterests((prev) => prev.filter((i) => i !== interest))
  }

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setAchievements((prev) => [...prev, newAchievement.trim()])
      setNewAchievement("")
    }
  }

  const removeAchievement = (index: number) => {
    setAchievements((prev) => prev.filter((_, i) => i !== index))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setImagePreview(result)
        setFormData((prev) => ({ ...prev, photo: result }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImagePreview("")
    setFormData((prev) => ({ ...prev, photo: "" }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSocialLinkChange = (id: SocialMediaType, value: string) => {
    setSocialLinks((prev) => ({ ...prev, [id]: value }))
  }

  const toggleSocialMedia = (type: SocialMediaType) => {
    if (activeSocialMedia.includes(type)) {
      setActiveSocialMedia((prev) => prev.filter((item) => item !== type))
      setSocialLinks((prev) => {
        const newLinks = { ...prev }
        delete newLinks[type]
        return newLinks
      })
    } else {
      setActiveSocialMedia((prev) => [...prev, type])
      setSocialLinks((prev) => ({ ...prev, [type]: "" }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Generar un ID único basado en timestamp
    const id = Date.now().toString()

    // Usar imagen por defecto si no se subió ninguna
    const finalPhoto = formData.photo || getDefaultPhoto(formData.gender)

    // Filtrar datos vacíos
    const filteredEducation = education.filter((edu) => edu.degree && edu.institution)
    const filteredExperience = experience.filter((exp) => exp.position && exp.company)
    const filteredProjects = projects.filter((proj) => proj.name)

    const newGraduate: Graduate = {
      id,
      ...formData,
      photo: finalPhoto,
      socialLinks,
      contactInfo: Object.values(contactInfo).some((val) => val) ? contactInfo : undefined,
      education: filteredEducation.length > 0 ? filteredEducation : undefined,
      experience: filteredExperience.length > 0 ? filteredExperience : undefined,
      skills: skills.length > 0 ? skills : undefined,
      projects: filteredProjects.length > 0 ? filteredProjects : undefined,
      interests: interests.length > 0 ? interests : undefined,
      achievements: achievements.length > 0 ? achievements : undefined,
    }

    onSubmit(newGraduate)
  }

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3 } },
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
      >
        <motion.div
          className="bg-white border rounded-2xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          variants={modalVariants}
          style={{
            background: "linear-gradient(to bottom, #ffffff, #f8fafc)",
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
          }}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Añadir mi perfil de egresado
              </h2>
              <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full hover:bg-secondary/50">
                <X className="h-5 w-5" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start bg-secondary/50 mb-6">
                  <TabsTrigger value="perfil">Perfil</TabsTrigger>
                  <TabsTrigger value="educacion">Educación</TabsTrigger>
                  <TabsTrigger value="experiencia">Experiencia</TabsTrigger>
                  <TabsTrigger value="habilidades">Habilidades</TabsTrigger>
                  <TabsTrigger value="proyectos">Proyectos</TabsTrigger>
                </TabsList>

                <TabsContent value="perfil" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nombre completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. Juan Pérez González"
                        required
                        className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="gender">Género *</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => handleSelectChange("gender", value)}
                        >
                          <SelectTrigger className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20">
                            <SelectValue placeholder="Selecciona género" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="masculino">Masculino</SelectItem>
                            <SelectItem value="femenino">Femenino</SelectItem>
                            <SelectItem value="indefinido">Indefinido</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="startYear">Año de ingreso *</Label>
                        <Select
                          value={formData.startYear}
                          onValueChange={(value) => handleSelectChange("startYear", value)}
                          required
                        >
                          <SelectTrigger className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20">
                            <SelectValue placeholder="Selecciona año" />
                          </SelectTrigger>
                          <SelectContent>
                            {yearOptions.map((year) => (
                              <SelectItem key={year} value={year}>
                                {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="area">Área/Rama *</Label>
                        <Select value={formData.area} onValueChange={(value) => handleSelectChange("area", value)}>
                          <SelectTrigger className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20">
                            <SelectValue placeholder="Selecciona área" />
                          </SelectTrigger>
                          <SelectContent>
                            {predefinedAreas.map((area) => (
                              <SelectItem key={area} value={area}>
                                {area}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="position">Puesto actual *</Label>
                      <Input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        placeholder="Ej. Desarrollador Full Stack"
                        required
                        className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="company">Empresa/Organización *</Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Ej. Microsoft México"
                        required
                        className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción profesional *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Breve descripción de tu experiencia y especialización profesional"
                        required
                        className="resize-none rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label>Foto de perfil</Label>
                      <div className="mt-2">
                        {imagePreview ? (
                          <div className="flex items-center gap-4">
                            <div className="h-20 w-20 relative rounded-xl overflow-hidden border border-secondary/50">
                              <Image
                                src={imagePreview || "/placeholder.svg"}
                                alt="Vista previa"
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => fileInputRef.current?.click()}
                                className="rounded-xl"
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Cambiar imagen
                              </Button>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={removeImage}
                                className="rounded-xl text-destructive hover:text-destructive"
                              >
                                <X className="h-4 w-4 mr-2" />
                                Quitar imagen
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-4">
                            <div className="h-20 w-20 relative rounded-xl overflow-hidden border border-secondary/50 bg-secondary/30 flex items-center justify-center">
                              <User className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="rounded-xl"
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Subir imagen
                            </Button>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Formatos soportados: PNG, JPG, JPEG. Si no subes una imagen, se usará una predeterminada según
                          tu género.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 border-t border-border/50 pt-4">
                      <h3 className="text-lg font-medium">Información de contacto</h3>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          value={contactInfo.email}
                          onChange={handleContactInfoChange}
                          placeholder="Ej. correo@ejemplo.com"
                          className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={contactInfo.phone}
                          onChange={handleContactInfoChange}
                          placeholder="Ej. +52 (771) 123 4567"
                          className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <Label htmlFor="location">Ubicación</Label>
                        <Input
                          id="location"
                          name="location"
                          value={contactInfo.location}
                          onChange={handleContactInfoChange}
                          placeholder="Ej. Ciudad de México, México"
                          className="rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Redes sociales y contacto</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {socialMediaOptions.map((option) => (
                          <Button
                            key={option.id}
                            type="button"
                            variant={activeSocialMedia.includes(option.id) ? "default" : "outline"}
                            size="sm"
                            className="flex items-center gap-2 rounded-xl"
                            onClick={() => toggleSocialMedia(option.id)}
                          >
                            {option.icon}
                            <span>{option.label}</span>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <AnimatePresence>
                      {activeSocialMedia.map((type) => {
                        const option = socialMediaOptions.find((opt) => opt.id === type)
                        if (!option) return null

                        return (
                          <motion.div
                            key={type}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-2">
                              <Label htmlFor={`social-${type}`}>{option.label}</Label>
                              <div className="flex gap-2">
                                <Input
                                  id={`social-${type}`}
                                  value={socialLinks[type] || ""}
                                  onChange={(e) => handleSocialLinkChange(type, e.target.value)}
                                  placeholder={option.placeholder}
                                  className="flex-1 rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  onClick={() => toggleSocialMedia(type)}
                                  className="rounded-xl"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        )
                      })}
                    </AnimatePresence>
                  </div>
                </TabsContent>

                <TabsContent value="educacion" className="space-y-6">
                  <h3 className="text-lg font-medium">Formación académica</h3>
                  <div className="space-y-6">
                    {education.map((edu, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg bg-secondary/10">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Formación {index + 1}</h4>
                          {education.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(index)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`edu-degree-${index}`}>Título/Grado</Label>
                            <Input
                              id={`edu-degree-${index}`}
                              value={edu.degree}
                              onChange={(e) => handleEducationChange(index, "degree", e.target.value)}
                              placeholder="Ej. Ingeniería en Tecnologías de la Información"
                              className="rounded-xl bg-white border-secondary/50"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`edu-institution-${index}`}>Institución</Label>
                            <Input
                              id={`edu-institution-${index}`}
                              value={edu.institution}
                              onChange={(e) => handleEducationChange(index, "institution", e.target.value)}
                              placeholder="Ej. Instituto Tecnológico Superior del Occidente del Estado de Hidalgo"
                              className="rounded-xl bg-white border-secondary/50"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`edu-year-${index}`}>Periodo</Label>
                            <Input
                              id={`edu-year-${index}`}
                              value={edu.year}
                              onChange={(e) => handleEducationChange(index, "year", e.target.value)}
                              placeholder="Ej. 2015-2020"
                              className="rounded-xl bg-white border-secondary/50"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`edu-description-${index}`}>Descripción</Label>
                            <Textarea
                              id={`edu-description-${index}`}
                              value={edu.description}
                              onChange={(e) => handleEducationChange(index, "description", e.target.value)}
                              placeholder="Ej. Especialización en Desarrollo de Software"
                              className="resize-none rounded-xl bg-white border-secondary/50"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addEducation}
                      className="w-full rounded-xl border-dashed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir formación académica
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="experiencia" className="space-y-6">
                  <h3 className="text-lg font-medium">Experiencia profesional</h3>
                  <div className="space-y-6">
                    {experience.map((exp, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg bg-secondary/10">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Experiencia {index + 1}</h4>
                          {experience.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(index)}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`exp-position-${index}`}>Puesto</Label>
                            <Input
                              id={`exp-position-${index}`}
                              value={exp.position}
                              onChange={(e) => handleExperienceChange(index, "position", e.target.value)}
                              placeholder="Ej. Desarrollador Full Stack"
                              className="rounded-xl bg-white border-secondary/50"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`exp-company-${index}`}>Empresa</Label>
                            <Input
                              id={`exp-company-${index}`}
                              value={exp.company}
                              onChange={(e) => handleExperienceChange(index, "company", e.target.value)}
                              placeholder="Ej. Microsoft México"
                              className="rounded-xl bg-white border-secondary/50"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`exp-period-${index}`}>Periodo</Label>
                            <Input
                              id={`exp-period-${index}`}
                              value={exp.period}
                              onChange={(e) => handleExperienceChange(index, "period", e.target.value)}
                              placeholder="Ej. 2020-Presente"
                              className="rounded-xl bg-white border-secondary/50"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`exp-description-${index}`}>Descripción</Label>
                            <Textarea
                              id={`exp-description-${index}`}
                              value={exp.description}
                              onChange={(e) => handleExperienceChange(index, "description", e.target.value)}
                              placeholder="Ej. Desarrollo de aplicaciones web y móviles utilizando React y Node.js"
                              className="resize-none rounded-xl bg-white border-secondary/50"
                              rows={2}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addExperience}
                      className="w-full rounded-xl border-dashed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir experiencia profesional
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="habilidades" className="space-y-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Habilidades técnicas</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {skills.map((skill) => (
                          <Badge
                            key={skill}
                            className="bg-primary/10 text-primary hover:bg-primary/20 border-0 px-3 py-1.5"
                          >
                            {skill}
                            <button
                              type="button"
                              onClick={() => removeSkill(skill)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Ej. JavaScript"
                          className="rounded-xl bg-secondary/30 border-secondary/50"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addSkill()
                            }
                          }}
                        />
                        <Button type="button" onClick={addSkill} className="rounded-xl">
                          Añadir
                        </Button>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="text-lg font-medium mb-4">Intereses</h3>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {interests.map((interest) => (
                          <Badge key={interest} variant="outline" className="bg-secondary/50 px-3 py-1.5">
                            {interest}
                            <button
                              type="button"
                              onClick={() => removeInterest(interest)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          placeholder="Ej. Inteligencia Artificial"
                          className="rounded-xl bg-secondary/30 border-secondary/50"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addInterest()
                            }
                          }}
                        />
                        <Button type="button" onClick={addInterest} className="rounded-xl">
                          Añadir
                        </Button>
                      </div>
                    </div>

                    <div className="border-t border-border/50 pt-6">
                      <h3 className="text-lg font-medium mb-4">Logros</h3>
                      <div className="space-y-2 mb-4">
                        {achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start gap-2 group">
                            <div className="flex-1 p-2 bg-secondary/20 rounded-lg">{achievement}</div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAchievement(index)}
                              className="opacity-0 group-hover:opacity-100 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          value={newAchievement}
                          onChange={(e) => setNewAchievement(e.target.value)}
                          placeholder="Ej. Premio a la Innovación Tecnológica 2022"
                          className="rounded-xl bg-secondary/30 border-secondary/50"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addAchievement()
                            }
                          }}
                        />
                        <Button type="button" onClick={addAchievement} className="rounded-xl">
                          Añadir
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="proyectos" className="space-y-6">
                  <h3 className="text-lg font-medium">Proyectos destacados</h3>
                  <div className="space-y-6">
                    {projects.map((project, index) => (
                      <div key={index} className="p-4 border border-border/50 rounded-lg bg-secondary/10">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="font-medium">Proyecto {index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeProject(index)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <Label htmlFor={`project-name-${index}`}>Nombre del proyecto</Label>
                            <Input
                              id={`project-name-${index}`}
                              value={project.name}
                              onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                              placeholder="Ej. Sistema de Gestión Hospitalaria"
                              className="rounded-xl bg-white border-secondary/50"
                            />
                          </div>

                          <div>
                            <Label htmlFor={`project-description-${index}`}>Descripción</Label>
                            <Textarea
                              id={`project-description-${index}`}
                              value={project.description}
                              onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                              placeholder="Ej. Plataforma integral para la administración de hospitales"
                              className="resize-none rounded-xl bg-white border-secondary/50"
                              rows={2}
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`project-year-${index}`}>Año</Label>
                              <Input
                                id={`project-year-${index}`}
                                value={project.year}
                                onChange={(e) => handleProjectChange(index, "year", e.target.value)}
                                placeholder="Ej. 2021"
                                className="rounded-xl bg-white border-secondary/50"
                              />
                            </div>

                            <div>
                              <Label htmlFor={`project-link-${index}`}>Enlace (opcional)</Label>
                              <div className="flex">
                                <div className="flex items-center px-3 bg-secondary/30 border border-r-0 border-secondary/50 rounded-l-xl">
                                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                  id={`project-link-${index}`}
                                  value={project.link || ""}
                                  onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                                  placeholder="https://github.com/username/project"
                                  className="rounded-l-none rounded-r-xl bg-white border-secondary/50"
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <Label>Tecnologías utilizadas</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {project.technologies?.map((tech) => (
                                <Badge key={tech} variant="secondary" className="bg-secondary/70">
                                  {tech}
                                  <button
                                    type="button"
                                    onClick={() => removeProjectTechnology(index, tech)}
                                    className="ml-2 hover:text-destructive"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                placeholder="Ej. React"
                                className="rounded-xl bg-white border-secondary/50"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault()
                                    addProjectTechnology(index, e.currentTarget.value)
                                    e.currentTarget.value = ""
                                  }
                                }}
                              />
                              <Button
                                type="button"
                                onClick={(e) => {
                                  const input = e.currentTarget.previousSibling as HTMLInputElement
                                  addProjectTechnology(index, input.value)
                                  input.value = ""
                                }}
                                className="rounded-xl"
                              >
                                Añadir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={addProject}
                      className="w-full rounded-xl border-dashed"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Añadir proyecto
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} className="rounded-xl">
                  Cancelar
                </Button>
                <Button type="submit" className="rounded-xl">
                  Guardar perfil
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
