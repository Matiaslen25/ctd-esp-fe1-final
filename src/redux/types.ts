interface Origin {
    name: string
    url: string
}

interface Location {
    name: string
    url: string
}

export interface Character {
    id: number
    name: string
    status: string
    species: string
    type: string
    gender: string
    origin: Origin
    location: Location
    image: string
    episode: string[]
    url: string
    created: string
}

interface CharacterDataInfo {
    count: number
    pages: number
    next?: string
    prev?: string
}

export interface CharacterApiData {
    results: Character[]
    info: CharacterDataInfo
}

export interface CharactersData {
    charactersData: CharacterApiData
    loading: boolean
    error?: string
}

export interface Episode {
    id: number
    name: string
    air_date: string
    episode: string
    characters: string[]
    url: string
    created: string
}
