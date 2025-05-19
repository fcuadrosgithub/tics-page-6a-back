"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Linkedin, Github, Twitter, Globe, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import type { Graduate } from "@/types/graduate"
import Image from "next/image"

interface AddProfileFormProps {
  onSubmit: (graduate: Graduate) => void
  onCancel: () => void
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

export function AddProfileForm({ onSubmit, onCancel }: AddProfileFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    company: "",
    description: "",
    photo: "/placeholder.svg?height=300&width=300", // Placeholder por defecto
  })

  const [socialLinks, setSocialLinks] = useState<Record<string, string>>({})
  const [activeSocialMedia, setActiveSocialMedia] = useState<SocialMediaType[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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

    const newGraduate: Graduate = {
      id,
      ...formData,
      socialLinks,
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
          className="bg-white border rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
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
                  <Label htmlFor="photo">URL de la foto de perfil</Label>
                  <div className="flex gap-2">
                    <Input
                      id="photo"
                      name="photo"
                      value={formData.photo}
                      onChange={handleChange}
                      placeholder="https://ejemplo.com/mi-foto.jpg"
                      className="flex-1 rounded-xl bg-secondary/30 border-secondary/50 focus:border-primary/30 focus:ring-primary/20"
                    />
                    {formData.photo && formData.photo !== "/placeholder.svg?height=300&width=300" && (
                      <div className="h-10 w-10 relative rounded-md overflow-hidden border border-secondary/50">
                        <Image
                          src={formData.photo || "/placeholder.svg"}
                          alt="Vista previa"
                          fill
                          className="object-cover"
                          onError={() => {
                            setFormData((prev) => ({
                              ...prev,
                              photo: "/placeholder.svg?height=300&width=300",
                            }))
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ingresa la URL de tu foto de perfil. Si no ingresas ninguna, se usará una imagen predeterminada.
                  </p>
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
