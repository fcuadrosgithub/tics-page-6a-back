export interface Education {
  degree: string
  institution: string
  year: string
  description: string
}

export interface Experience {
  position: string
  company: string
  period: string
  description: string
}

export interface Project {
  name: string
  description: string
  technologies: string[]
  year: string
  link?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Language {
  name: string
  level: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

export interface Graduate {
  id: string
  name: string
  photo: string
  position: string
  company: string
  description: string
  socialLinks: Record<string, string>
  gender: "masculino" | "femenino" | "indefinido"
  area: string
  startYear: string
  contactInfo?: ContactInfo
  education?: Education[]
  experience?: Experience[]
  skills?: string[]
  projects?: Project[]
  certifications?: Certification[]
  languages?: Language[]
  interests?: string[]
  achievements?: string[]
}
