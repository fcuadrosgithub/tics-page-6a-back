"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Plus, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GraduateCard } from "@/components/graduate-card"
import { AddProfileForm } from "@/components/add-profile-form"
import type { Graduate } from "@/types/graduate"
// Asegurarnos de que la importación sea correcta
import { GraduateDetailModal } from "./graduate-detail-modal"
import { AnimatePresence } from "framer-motion"
import { FilterModal } from "@/components/filter-modal"

// Función para normalizar texto (quitar acentos)
const normalizeText = (text: string): string => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

// Datos de ejemplo actualizados
const initialGraduates: Graduate[] = [
  {
  id: "1",
  name: "Jesús Eduardo Vázquez Martínez",
  position: "Líder de proyectos Inteligencia Artificial",
  company: "ITSOEH",
  description: "Estudiantede TIC en ITSOEH, apasionado por la tecnología, los proyectos sociales y el desarrollo de soluciones innovadoras usando inteligencia artificial, IoT y sistemas distribuidos.",
  photo: "/lalo.jpg?height=300&width=300",
  startYear: 2022,
  socialLinks: {
    github: "https://github.com/EDUARDOVAZQUE"
  },
  contactInfo: {
    email: "22011935@itsoeh.edu.mx",
    phone: "7731999004",
    location: "Progreso de Obregón, Hidalgo"
  },
  education: [
    {
      degree: "Ingeniería en Tecnologías de la Información y Comunicaciones",
      institution: "Instituto Tecnológico Superior del Occidente del Estado de Hidalgo (ITSOEH)",
      year: "2022-2026",
      description: "Formación integral con enfoque en desarrollo de software, sistemas distribuidos, redes, y proyectos tecnológicos aplicados."
    }
  ],
  experience: [
    {
      position: "Líder de Proyecto",
      company: "Creative Coders - ITSOEH",
      period: "2024 - Presente",
      description: "Liderazgo del desarrollo de un sistema distribuido de inventario como microservicio para OXXO, incluyendo la definición del modelo de datos, arquitectura distribuida, y pruebas en SQL Server."
    },
    {
      position: "Desarrollador de prototipos",
      company: "ITSOEH",
      period: "2023 - Presente",
      description: "Desarrollo de prototipos tecnológicos con ESP32, Arduino y Node-RED, incluyendo sensores ambientales, módulos de cámara FPV y vehículos autónomos controlados por Bluetooth."
    }
  ],
  skills: [
    "Desarrollo con Arduino y ESP32",
    "Bases de datos distribuidas",
    "SQL Server",
    "Node-RED",
    "Desarrollo web con PHP y Bootstrap",
    "Redes con Packet Tracer",
    "Electrónica básica",
    "Liderazgo de proyectos"
  ],
  projects: [
    {
      name: "RiderSafe",
      description: "Proyecto de seguridad para motociclistas mediante IoT, enfocado en la detección de accidentes y localización en tiempo real.",
      technologies: [
        "ESP32",
        "Sensores de impacto",
        "GPS",
        "Bluetooth",
        "Node-RED"
      ],
      year: "2025",
      link: "https://github.com/EDUARDOVAZQUE/RiderSafe"
    },
    {
      name: "Sistema de Inventario Distribuido",
      description: "Sistema escalable para la gestión de inventarios entre sucursales usando microservicios y bases de datos replicadas.",
      technologies: [
        "PHP",
        "SQL Server",
        "Bootstrap",
        "JSON",
        "Replicación de datos"
      ],
      year: "2024",
      link: "https://github.com/EDUARDOVAZQUE"
    }
  ],
  interests: [
    "Inteligencia Artificial aplicada",
    "IoT (Internet de las Cosas)",
    "Sistemas distribuidos",
    "Electrónica y hardware libre",
    "Desarrollo web",
    "Tecnología social",
    "Aprendizaje autodidacta"
  ],
  achievements: [
    "Liderar proyecto para cliente real (OXXO)",
    "Desarrollo de prototipos funcionales de drones y autos RC",
    "Implementación de bases de datos distribuidas con replicación",
    "Simulación avanzada de redes en Packet Tracer"
  ]
},
  {
    id: "2",
    name: "Kaory Gissel Contreras Álvarez",
    photo: "/kao.jpg?height=300&width=300",
    position: "Desarrolladora Full Stack",
    company: "Microsoft México",
    description: "Especialista en desarrollo web y aplicaciones móviles con experiencia en React y Node.js.",
    socialLinks: {
      github: "https://github.com/KaoryAlvarez"
    },
    gender: "femenino",
    area: "Desarrollo de Software",
    startYear: "2022",
    contactInfo: {
      email: "22011435@itsoeh.edu.mx",
      phone: "+52 (772) 106 3176",
      location: "Actopan, Hidalgo"
    }
  },

  {
    id: "3",
    name: "Laura Sánchez Ramírez",
    photo: "/mujer.jpg?height=300&width=300",
    position: "Analista de Ciberseguridad",
    company: "Banco de México",
    description: "Datos de ejemplo, imagen de perfil para mujer por defecto.",
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
    photo: "/hombre.jpg?height=300&width=300",
    position: "Arquitecto de Software",
    company: "IBM México",
    description: "Datos de ejemplo, imagen de perfil para hombre por defecto.",
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
    photo: "/indefinido.jpg?height=300&width=300",
    position: "Científica de Datos",
    company: "Google",
    description: "Datos de ejemplo, imagen de perfil indefinido por defecto.",
    socialLinks: {
      linkedin: "https://linkedin.com/in/sofiarodriguez",
      github: "https://github.com/sofiarodriguez",
      twitter: "https://twitter.com/sofiarodriguez",
    },
    gender: "indefinido",
    area: "Ciencia de Datos",
    startYear: "2017",
  }
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
  const [graduates, setGraduates] = useState<Graduate[]>(initialGraduates)
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedGraduate, setSelectedGraduate] = useState<Graduate | null>(null)
  const [filters, setFilters] = useState({
    gender: "",
    area: "",
    startYear: "",
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    const savedGraduates = localStorage.getItem("itsoeh-graduates")
    if (savedGraduates) {
      try {
        const parsed = JSON.parse(savedGraduates)
        setGraduates(parsed)
      } catch (error) {
        console.error("Error loading saved graduates:", error)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("itsoeh-graduates", JSON.stringify(graduates))
  }, [graduates])

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
