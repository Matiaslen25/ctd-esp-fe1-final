import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Origin {
    name: string
    url: string
}

interface Location {
    name: string
    url: string
}

interface Character {
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

interface Episode {
    id: number
    name: string
    air_date: string
    episode: string
    characters: string[]
    url: string
    created: string
}

interface initialType {
    characterDetail: Character
    loading: boolean
    episodesDetail: Episode[]
}

const getCharactersEpisodes = async (episodesUrls: string[]) => {
    try {
        const episodesNumbers = episodesUrls.map(episodeUrl => episodeUrl.replace('https://rickandmortyapi.com/api/episode/', '')).join(',')
        const res = await fetch(`https://rickandmortyapi.com/api/episode/${episodesNumbers}`)
        const parseRes = await res.json()
        if (!res.ok) {
            throw new Error(`Character's episodes detail API failed with the following status: {${parseRes.error}}`)
        } else {
            return episodesUrls.length === 1 ? [parseRes] : parseRes
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export const getCharacterById = createAsyncThunk(
    'characterDetail',
    async (id: number) => {
        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
            const parseRes = await res.json()
            if (!res.ok) {
                throw new Error(`Character detail API failed with the following status: {${parseRes.error}}`)
            } else {
                const episodesDetail = await getCharactersEpisodes(parseRes.episode)
                return {
                    characterDetail: parseRes,
                    episodesDetail
                }
            }
        } catch (e) {
            return { error: e }
        }
    }
)

const initialState: initialType = {
    characterDetail: {
        name: '',
        id: 0,
        status: '',
        species: '',
        type: '',
        gender: '',
        origin: {
            name: '',
            url: ''
        },
        location:  {
            name: '',
            url: ''
        },
        image: '',
        episode: [],
        url: '',
        created: ''
    },
    loading: true,
    episodesDetail: []
}

const charactersSlice = createSlice({
    name: 'characterDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCharacterById.pending, (state) => {
                state.loading = true
            })
            .addCase(getCharacterById.fulfilled, (state, action) => {
                state.loading = false
                if (!action.payload.error) {
                    state.characterDetail = action.payload.characterDetail
                    state.episodesDetail = action.payload.episodesDetail
                } else {
                    state.characterDetail = initialState.characterDetail
                    state.episodesDetail = initialState.episodesDetail
                }
            })
            .addCase(getCharacterById.rejected, (state) => {
                state.loading = false
            })
    }
})

export default charactersSlice.reducer