"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterModalProps {
  filters: {
    gender: string
    area: string
    startYear: string
  }
  onFiltersChange: (filters: { gender: string; area: string; startYear: string }) => void
  onClose: () => void
  uniqueAreas: string[]
  yearOptions: string[]
}

export function FilterModal({ filters, onFiltersChange, onClose, uniqueAreas, yearOptions }: FilterModalProps) {
  const handleFilterChange = (key: string, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value === "all" ? "" : value,
    })
  }

  const clearFilters = () => {
    onFiltersChange({
      gender: "",
      area: "",
      startYear: "",
    })
  }

  return (
    <motion.div
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-card border rounded-2xl shadow-lg w-full max-w-md"
        initial={{ scale: 0.95, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 20, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "hsl(var(--card))",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Filtros</h2>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="gender-filter">Género</Label>
              <Select value={filters.gender || "all"} onValueChange={(value) => handleFilterChange("gender", value)}>
                <SelectTrigger className="rounded-xl bg-secondary/30 border-secondary/50">
                  <SelectValue placeholder="Todos los géneros" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los géneros</SelectItem>
                  <SelectItem value="masculino">Masculino</SelectItem>
                  <SelectItem value="femenino">Femenino</SelectItem>
                  <SelectItem value="indefinido">Indefinido</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="area-filter">Área/Rama</Label>
              <Select value={filters.area || "all"} onValueChange={(value) => handleFilterChange("area", value)}>
                <SelectTrigger className="rounded-xl bg-secondary/30 border-secondary/50">
                  <SelectValue placeholder="Todas las áreas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las áreas</SelectItem>
                  {uniqueAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="startYear-filter">Año de ingreso</Label>
              <Select
                value={filters.startYear || "all"}
                onValueChange={(value) => handleFilterChange("startYear", value)}
              >
                <SelectTrigger className="rounded-xl bg-secondary/30 border-secondary/50">
                  <SelectValue placeholder="Todos los años" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los años</SelectItem>
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between gap-2 pt-6">
            <Button type="button" variant="outline" onClick={clearFilters} className="rounded-xl">
              Limpiar filtros
            </Button>
            <Button onClick={onClose} className="rounded-xl">
              Aplicar filtros
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
