"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GraduateCard } from "@/components/graduate-card"
import { AddProfileForm } from "@/components/add-profile-form"
import type { Graduate } from "@/types/graduate"
import { GraduateDetailModal } from "@/components/graduate-detail-modal"
import { AnimatePresence } from "framer-motion"

// Datos de ejemplo
const initialGraduates: Graduate[] = [
  {
    id: "1",
    name: "Ana García Hernández",
    photo: "/placeholder.svg?height=300&width=300",
    position: "Desarrolladora Full Stack",
    company: "Microsoft México",
    description: "Especialista en desarrollo web y aplicaciones móviles con experiencia en React y Node.js.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/anagarcia",
      github: "https://github.com/anagarcia",
      twitter: "https://twitter.com/anagarcia",
    },
  },
  {
    id: "2",
    name: "Carlos Martínez López",
    photo: "/placeholder.svg?height=300&width=300",
    position: "Ingeniero DevOps",
    company: "Amazon Web Services",
    description: "Experto en infraestructura cloud y automatización de procesos de desarrollo.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/carlosmartinez",
      github: "https://github.com/carlosmartinez",
    },
  },
  {
    id: "3",
    name: "Laura Sánchez Ramírez",
    photo: "/placeholder.svg?height=300&width=300",
    position: "Analista de Ciberseguridad",
    company: "Banco de México",
    description: "Especialista en seguridad informática con enfoque en protección de infraestructuras críticas.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/laurasanchez",
      twitter: "https://twitter.com/laurasanchez",
    },
  },
  {
    id: "4",
    name: "Miguel Ángel Pérez Torres",
    photo: "/placeholder.svg?height=300&width=300",
    position: "Arquitecto de Software",
    company: "IBM México",
    description: "Diseñador de soluciones tecnológicas escalables para grandes empresas.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/miguelperez",
      github: "https://github.com/miguelperez",
      website: "https://miguelperez.dev",
    },
  },
  {
    id: "5",
    name: "Sofía Rodríguez Gómez",
    photo: "/placeholder.svg?height=300&width=300",
    position: "Científica de Datos",
    company: "Google",
    description: "Especialista en inteligencia artificial y análisis de datos masivos.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sofiarodriguez",
      github: "https://github.com/sofiarodriguez",
      twitter: "https://twitter.com/sofiarodriguez",
    },
  },
  {
    id: "6",
    name: "Javier López Mendoza",
    photo: "/placeholder.svg?height=300&width=300",
    position: "Gerente de Proyectos TI",
    company: "Telmex",
    description: "Coordinador de equipos de desarrollo y experto en metodologías ágiles.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/javierlopez",
    },
  },
]

export function GraduateProfiles() {
  const [graduates, setGraduates] = useState<Graduate[]>(initialGraduates)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedGraduate, setSelectedGraduate] = useState<Graduate | null>(null)

  const filteredGraduates = graduates.filter(
    (graduate) =>
      graduate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      graduate.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddGraduate = (newGraduate: Graduate) => {
    setGraduates((prev) => [newGraduate, ...prev])
    setIsFormOpen(false)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-white to-secondary/30 border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre, puesto, empresa..."
              className="pl-9 bg-white/80 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="shrink-0 rounded-xl bg-white">
              <Filter className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 shrink-0 rounded-xl">
              <Plus className="h-4 w-4" />
              <span>Añadir mi perfil</span>
            </Button>
          </div>
        </div>
      </div>

      {filteredGraduates.length === 0 ? (
        <div className="text-center py-12 bg-secondary/30 rounded-2xl border border-dashed">
          <p className="text-muted-foreground">No se encontraron perfiles que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredGraduates.map((graduate) => (
            <GraduateCard key={graduate.id} graduate={graduate} onClick={setSelectedGraduate} />
          ))}
        </motion.div>
      )}

      {isFormOpen && <AddProfileForm onSubmit={handleAddGraduate} onCancel={() => setIsFormOpen(false)} />}
      <AnimatePresence>
        {selectedGraduate && (
          <GraduateDetailModal graduate={selectedGraduate} onClose={() => setSelectedGraduate(null)} />
        )}
      </AnimatePresence>
    </div>
  )
}
