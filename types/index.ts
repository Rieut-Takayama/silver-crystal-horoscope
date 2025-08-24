export interface UserProfile {
  id: string
  birthDate: string
  birthTime?: string
  birthPlace?: string
  createdAt: string
}

export interface HoroscopeData {
  sunSign: string
  moonSign?: string
  ascendant?: string
  currentTransits: Transit[]
  upcomingEvents: AstrologicalEvent[]
}

export interface Transit {
  planet: string
  aspect: string
  natalPlanet: string
  date: string
  meaning: string
  energy: 'expansion' | 'challenge' | 'transformation' | 'harmony'
}

export interface AstrologicalEvent {
  id: string
  date: string
  type: string
  description: string
  theme: string
  magicalWork?: string
}

export interface MagicalNote {
  id: string
  userId: string
  title: string
  content: string
  theme: string
  symbol?: string
  intention: string
  createdAt: string
  eventId?: string
  status: 'active' | 'completed' | 'archived'
}