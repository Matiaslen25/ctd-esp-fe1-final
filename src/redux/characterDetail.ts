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

interface initialType {
    characterDetail: Character
    loading: boolean
}

export const getCharacterById = createAsyncThunk(
    'characterDetail',
    async (id: number) => {
        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
            const parseRes = await res.json()
            if (!res.ok) {
                throw new Error(`Character detail API failed with the following status: {${parseRes.error}}`)
            }
            return parseRes
        } catch (e) {
            return { error: e }
        }
    }
)

const initialState: initialType = {
    characterDetail: {
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
    loading: true
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
                    state.characterDetail = action.payload
                } else {
                    state.characterDetail = initialState.characterDetail
                }
            })
            .addCase(getCharacterById.rejected, (state) => {
                state.loading = false
            })
    }
})

export default charactersSlice.reducer