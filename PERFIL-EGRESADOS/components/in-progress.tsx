"use client"

import { motion } from "framer-motion"
import { Wrench, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function InProgress() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const catVariants = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, -10, 10, -5, 5, 0],
      transition: {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 3,
        ease: "easeInOut",
      },
    },
  }

  const toolVariants = {
    initial: { rotate: 0, scale: 1 },
    animate: {
      rotate: [0, 15, -15, 10, -10, 0],
      scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
      transition: {
        duration: 1.5,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 2,
        ease: "easeInOut",
      },
    },
  }

  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 1,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 1,
        ease: "easeInOut",
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 flex items-center justify-center p-4">
      <motion.div
        className="text-center max-w-2xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Gatito con herramienta animado */}
        <motion.div className="relative mb-8" variants={itemVariants}>
          <div className="relative inline-block">
            {/* Sparkles decorativos */}
            <motion.div
              className="absolute -top-4 -left-4 text-2xl"
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "0s" }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -top-2 -right-6 text-xl"
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "0.5s" }}
            >
              ⭐
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-2 text-lg"
              variants={sparkleVariants}
              initial="initial"
              animate="animate"
              style={{ animationDelay: "1s" }}
            >
              💫
            </motion.div>

            {/* Gatito */}
            <motion.div
              className="text-8xl mb-4 inline-block"
              variants={catVariants}
              initial="initial"
              animate="animate"
            >
              🐱
            </motion.div>

            {/* Herramienta */}
            <motion.div
              className="absolute -bottom-2 -right-4"
              variants={toolVariants}
              initial="initial"
              animate="animate"
            >
              <div className="bg-primary/10 rounded-full p-3 border-2 border-primary/20">
                <Wrench className="h-6 w-6 text-primary" />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Texto principal */}
        <motion.div variants={itemVariants} className="space-y-4 mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
            Estamos trabajando en ello
          </h1>
          <motion.div
            className="h-1 w-32 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={{ width: 128 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Descripción */}
        <motion.div variants={itemVariants} className="space-y-6 mb-8">
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Esta sección está en desarrollo. Nuestro equipo está trabajando arduamente para traerte la mejor
            experiencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Diseñando la interfaz</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <span>Desarrollando funcionalidades</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              <span>Realizando pruebas</span>
            </div>
          </div>
        </motion.div>

        {/* Botón de regreso */}
        <motion.div variants={itemVariants}>
          <Link href="/">
            <Button
              variant="outline"
              className="rounded-xl border-2 hover:bg-primary/5 hover:border-primary/30 transition-all duration-300 group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
              Volver al inicio
            </Button>
          </Link>
        </motion.div>

        {/* Mensaje adicional */}
        <motion.div
          variants={itemVariants}
          className="mt-12 p-4 bg-card/50 border border-border/50 rounded-xl backdrop-blur-sm"
        >
          <p className="text-sm text-muted-foreground">
            💡 <strong>¿Tienes alguna sugerencia?</strong> Nos encantaría escuchar tus ideas para mejorar esta sección.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
