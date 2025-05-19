"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Linkedin, Github, Twitter, Globe, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Graduate } from "@/types/graduate"

interface GraduateCardProps {
  graduate: Graduate
  onClick: (graduate: Graduate) => void
}

export function GraduateCard({ graduate, onClick }: GraduateCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const getSocialIcon = (key: string) => {
    switch (key) {
      case "linkedin":
        return <Linkedin className="h-4 w-4" />
      case "github":
        return <Github className="h-4 w-4" />
      case "twitter":
        return <Twitter className="h-4 w-4" />
      case "website":
        return <Globe className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      default:
        return null
    }
  }

  return (
    <motion.div
      variants={item}
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => onClick(graduate)}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden h-full border border-border/30 hover:border-primary/20 transition-colors shadow-sm hover:shadow-md rounded-2xl bg-gradient-to-b from-white to-secondary/30">
        <CardContent className="p-0">
          <div className="relative">
            <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
              <Image
                src={graduate.photo || "/placeholder.svg"}
                alt={graduate.name}
                fill
                className="object-cover transition-transform duration-500"
                style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg">{graduate.name}</h3>
              <p className="text-primary text-sm font-medium">{graduate.position}</p>
              <p className="text-xs text-muted-foreground mt-1">{graduate.company}</p>
            </div>
          </div>
          <div className="px-4 pb-4">
            <div className="pt-2 pb-3 border-t border-border/30">
              <p className="text-sm text-muted-foreground line-clamp-2">{graduate.description}</p>
            </div>
            {graduate.socialLinks && Object.keys(graduate.socialLinks).length > 0 && (
              <div className="flex flex-wrap gap-2">
                {Object.entries(graduate.socialLinks).map(([key, value]) => (
                  <a
                    key={key}
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-secondary hover:bg-primary/10 hover:text-primary transition-colors"
                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {getSocialIcon(key)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
