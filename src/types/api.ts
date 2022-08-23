interface Location {
  name?: string
  url?: string
}

export interface Character {
  id: number
  name?: string
  status?: 'Alive' | 'Dead' | 'unknown'
  species?: 'Alien' | 'Human'
  type?: string
  gender?: 'Female' | 'Male' | 'unknown'
  origin?: Location
  location?: Location
  image?: string
  episode?: string[]
  url?: string
  created?: Date
}

interface Info {
  count?: number
  pages?: number
  next?: string
  prev?: null
}

export interface Characters {
  info?: Info
  results?: Character[]
}

export enum Status {
  idle = 'idle',
  pending = 'pending',
  rejected = 'rejected',
  fulfilled = 'fulfilled',
}

export interface ListParams {
  page: number
  search?: string
}

export interface LikedCharacters {
  id: number
}
