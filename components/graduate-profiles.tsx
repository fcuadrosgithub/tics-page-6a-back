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
import { FilterModal } from "@/components/filter-modal"
import { useLocalStorage } from "@/hooks/use-local-storage"

// Función para normalizar texto (quitar acentos)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

// Datos de ejemplo iniciales
const defaultGraduates: Graduate[] = [
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
    gender: "femenino",
    area: "Desarrollo de Software",
    startYear: "2015",
    contactInfo: {
      email: "ana.garcia@example.com",
      phone: "+52 (771) 123 4567",
      location: "Ciudad de México, México",
    },
    education: [
      {
        degree: "Ingeniería en Tecnologías de la Información y Comunicaciones",
        institution: "Instituto Tecnológico Superior del Occidente del Estado de Hidalgo",
        year: "2015-2020",
        description: "Especialización en Desarrollo de Software y Sistemas Inteligentes",
      },
    ],
    experience: [
      {
        position: "Desarrolladora Full Stack",
        company: "Microsoft México",
        period: "2020-Presente",
        description: "Desarrollo de aplicaciones web y móviles utilizando React, Node.js y MongoDB.",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "TypeScript", "Git"],
    projects: [
      {
        name: "Sistema de Gestión Hospitalaria",
        description: "Plataforma integral para la administración de hospitales.",
        technologies: ["React", "Node.js", "MongoDB"],
        year: "2021",
        link: "https://github.com/anagarcia/hospital-management",
      },
    ],
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
    gender: "masculino",
    area: "Infraestructura y Cloud",
    startYear: "2014",
    contactInfo: {
      email: "carlos.martinez@example.com",
      phone: "+52 (771) 234 5678",
      location: "Guadalajara, México",
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
    gender: "femenino",
    area: "Ciberseguridad",
    startYear: "2016",
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
    gender: "masculino",
    area: "Arquitectura de Software",
    startYear: "2013",
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
    gender: "femenino",
    area: "Ciencia de Datos",
    startYear: "2017",
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
    gender: "masculino",
    area: "Gestión de Proyectos",
    startYear: "2012",
  },
]

// Generar años para el filtro (desde 2010 hasta el año actual)
const generateYearOptions = (): string[] => {
  const currentYear = new Date().getFullYear()
  const years: string[] = []
  for (let year = 2010; year <= currentYear + 1; year++) {
    years.push(year.toString())
  }
  return years
}

export function GraduateProfiles() {
  // Usar localStorage para persistir los datos
  const [graduates, setGraduates] = useLocalStorage<Graduate[]>("itsoeh-graduates", defaultGraduates)
  const [searchTerm, setSearchTerm] = useLocalStorage<string>("itsoeh-search-term", "")
  const [filters, setFilters] = useLocalStorage("itsoeh-filters", {
    gender: "",
    area: "",
    startYear: "",
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedGraduate, setSelectedGraduate] = useState<Graduate | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Obtener valores únicos para los filtros
  const uniqueAreas = [...new Set(graduates.map((g) => g.area))].sort()
  const yearOptions = generateYearOptions()

  // Actualizar la función de filtrado para usar normalización de texto y año de inicio
  const filteredGraduates = graduates.filter((graduate) => {
    const searchNormalized = normalizeText(searchTerm)
    const nameNormalized = normalizeText(graduate.name)
    const positionNormalized = normalizeText(graduate.position)
    const companyNormalized = normalizeText(graduate.company)
    const descriptionNormalized = normalizeText(graduate.description)

    const matchesSearch =
      nameNormalized.includes(searchNormalized) ||
      positionNormalized.includes(searchNormalized) ||
      companyNormalized.includes(searchNormalized) ||
      descriptionNormalized.includes(searchNormalized)

    const matchesGender = !filters.gender || graduate.gender === filters.gender
    const matchesArea = !filters.area || graduate.area === filters.area
    const matchesStartYear = !filters.startYear || graduate.startYear === filters.startYear

    return matchesSearch && matchesGender && matchesArea && matchesStartYear
  })

  const handleAddGraduate = (newGraduate: Graduate) => {
    setGraduates((prev) => [newGraduate, ...prev])
    setIsFormOpen(false)
  }

  // Función para resetear todos los datos (útil para desarrollo/testing)
  const resetData = () => {
    if (confirm("¿Estás seguro de que quieres resetear todos los datos? Esta acción no se puede deshacer.")) {
      setGraduates(defaultGraduates)
      setSearchTerm("")
      setFilters({
        gender: "",
        area: "",
        startYear: "",
      })
    }
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
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nombre, puesto, empresa..."
              className="pl-9 bg-background/80 rounded-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 rounded-xl bg-background"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsFormOpen(true)} className="flex items-center gap-2 shrink-0 rounded-xl">
              <Plus className="h-4 w-4" />
              <span>Añadir mi perfil</span>
            </Button>
            {/* Botón para resetear datos (solo visible en desarrollo) */}
            {process.env.NODE_ENV === "development" && (
              <Button variant="destructive" size="sm" onClick={resetData} className="rounded-xl text-xs">
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Mostrar estadísticas */}
        <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>Total de egresados: {graduates.length}</span>
          <span>Resultados mostrados: {filteredGraduates.length}</span>
          {graduates.length > defaultGraduates.length && (
            <span className="text-primary">Nuevos registros: {graduates.length - defaultGraduates.length}</span>
          )}
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

      {isFormOpen && (
        <AddProfileForm onSubmit={handleAddGraduate} onCancel={() => setIsFormOpen(false)} yearOptions={yearOptions} />
      )}
      <AnimatePresence>
        {selectedGraduate && (
          <GraduateDetailModal graduate={selectedGraduate} onClose={() => setSelectedGraduate(null)} />
        )}
      </AnimatePresence>
      {isFilterOpen && (
        <FilterModal
          filters={filters}
          onFiltersChange={setFilters}
          onClose={() => setIsFilterOpen(false)}
          uniqueAreas={uniqueAreas}
          yearOptions={yearOptions}
        />
      )}
    </div>
  )
}
