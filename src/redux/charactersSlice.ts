import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { CharacterApiData, CharactersData } from "./types"


/**
 * Obtiene personajes paginados de la API de Rick y Morty y la guarda en el estado de la aplicación
 * @param {string} url URL a la que hacer la API call
 * @see Para información del consumo de este endpoint de la API visitar la [documentación](https://rickandmortyapi.com/documentation/#get-all-characters)
 * @returns Una promesa de CharacterApiData (`Promise<CharacterApiData>`)
 * @author [Matías Len](https://github.com/Matiaslen25)
 */
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
    loading: true,
    pageUrl: ''
}

const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setPageUrl: (state, action: PayloadAction<string>) => {
            state.pageUrl = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCharactersPage.pending, (state) => {
                state.loading = true
                state.error = ''
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

export const { setPageUrl } = charactersSlice.actions

export default charactersSlice.reducer