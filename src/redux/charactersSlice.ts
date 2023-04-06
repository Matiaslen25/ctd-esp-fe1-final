import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CharacterApiData, CharactersData } from "./types"

export const getCharactersPage = createAsyncThunk(
    'characters/charactersData',
    async (url: string): Promise<CharacterApiData> => {
        const res = await fetch(url)
        const parseRes = await res.json()
        if (!res.ok) {
            throw new Error(`Characters API failed with the following status: {${parseRes.error}}`)
        }
        return parseRes
    }
)

const initialState: CharactersData = {
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
                state.charactersData = action.payload
            })
            .addCase(getCharactersPage.rejected, (state, action) => {
                console.error(action.error.message)
                state.loading = false
                state.error = action.error.message
            })
    }
})

export default charactersSlice.reducer