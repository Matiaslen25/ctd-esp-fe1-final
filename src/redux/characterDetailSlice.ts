import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Character, Episode } from "./types"

interface CharacterDetail {
    characterDetail: Character
    characterError?: string
    loading: boolean
    episodesDetail: Episode[]
    episodesError?: string
}

const getCharactersEpisodes = async (episodesUrls: string[]) => {
    const episodesNumbers = episodesUrls.map(episodeUrl => episodeUrl.replace('https://rickandmortyapi.com/api/episode/', '')).join(',')
    const res = await fetch(`https://rickandmortyapi.com/api/episode/${episodesNumbers}`)
    const parseRes = await res.json()
    if (!res.ok) {
        throw new Error(`Character's episodes detail API failed with the following status: {${parseRes.error}}`)
    } else {
        // Normalizing data into array in case character only appears in one episode and API returns an object instead of object array
        return episodesUrls.length === 1 ? [parseRes] : parseRes
    }
}

export const getCharacterById = createAsyncThunk(
    'characterDetail',
    async (id: number) => {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        const parseRes = await res.json()
        if (!res.ok) {
            throw new Error(`Character detail API failed with the following status: {${parseRes.error}}`)
        } else {
            let episodesDetail: Episode[] | string = ''
            try {
                episodesDetail = await getCharactersEpisodes(parseRes.episode)
            } catch (error) {
                let errorMessage: string = 'Unknown episodes detail error'
                if (error instanceof Error) {
                    errorMessage = error.message
                }
                episodesDetail = errorMessage
            }
            
            return {
                characterDetail: parseRes,
                episodesDetail
            }
        }
    }
)

const initialState: CharacterDetail = {
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
                state.characterDetail = action.payload.characterDetail
                if (typeof action.payload.episodesDetail === 'string') {
                    state.episodesError = action.payload.episodesDetail
                    console.error(state.episodesError)
                } else {
                    state.episodesDetail = action.payload.episodesDetail
                }
            })
            .addCase(getCharacterById.rejected, (state, action) => {
                console.error(action.error.message)
                state.loading = false
                state.characterError = action.error.message
            })
    }
})

export default charactersSlice.reducer