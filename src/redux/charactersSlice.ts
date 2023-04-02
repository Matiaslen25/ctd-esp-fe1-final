import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

interface Origin {
    name: string,
    url: string
}

interface Location {
    name: string,
    url: string
}

interface Character {
    id: number
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

interface CharacterData {
    results: Character[]
    info: CharacterDataInfo
}

interface initialType {
    charactersData: CharacterData
    loading: boolean
}

export const getCharactersPage = createAsyncThunk(
    'characters/charactersData',
    async (url: string) => {
        try {
            const res = await fetch(url)
            const parseRes = await res.json()
            if (!res.ok) {
                throw new Error(`Characters API failed with the following status: {${parseRes.error}}`)
            }
            return parseRes
        } catch (e) {
            return { error: e }
        }
    }
)

const initialState: initialType = {
    charactersData: {
        results: [],
        info: {
            count: 0,
            pages: 0
        }
    },
    loading: true
}

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCharactersPage.pending, (state) => {
                state.loading = true
            })
            .addCase(getCharactersPage.fulfilled, (state, action) => {
                state.loading = false
                if (!action.payload.error) {
                    state.charactersData = action.payload
                } else {
                    state.charactersData = {
                        results: [],
                        info: {
                            count: 0,
                            pages: 0
                        }
                    }
                }
            })
            .addCase(getCharactersPage.rejected, (state) => {
                state.loading = false
            })
    }
})

export default charactersSlice.reducer