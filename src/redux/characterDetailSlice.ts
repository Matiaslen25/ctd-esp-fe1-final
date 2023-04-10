import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Character, Episode } from "./types"

interface CharacterDetail {
    characterDetail: Character
    characterError?: string
    loading?: boolean
    episodesDetail: Episode[]
    episodesError?: string
}

/**
 * Obtiene la información de unos epidodios de la API de Rick y Morty en base al número de episodio
 * @param {string[]} episodesUrls Array de los números de episodios a obtener información
 * @see Para información del consumo de este endpoint de la API visitar la [documentación](https://rickandmortyapi.com/documentation/#get-multiple-episodes)
 * @returns Una promesa de array de Episode (`Promise<Episode[]>`)
 * @author [Matías Len](https://github.com/Matiaslen25)
 */
const getCharactersEpisodes = async (episodesUrls: string[]): Promise<Episode[]> => {
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

/**
 * Obtiene la información de un personaje puntual de la API de Rick y Morty en base a su Id
 * @param {number} id Id del personaje a obtener información
 * @see Para información del consumo de este endpoint de la API visitar la [documentación](https://rickandmortyapi.com/documentation/#get-a-single-character)
 * @returns Una promesa de CharacterDetail (`Promise<CharacterDetail>`)
 * @author [Matías Len](https://github.com/Matiaslen25)
 */
export const getCharacterById = createAsyncThunk(
    'characterDetail',
    async (id: number): Promise<CharacterDetail> => {
        let errorMessage: string = ''
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
        const parseRes = await res.json()
        if (!res.ok) {
            throw new Error(`Character detail API failed with the following status: {${parseRes.error}}`)
        } else {
            let episodesDetail: Episode[] | string = ''
            try {
                episodesDetail = await getCharactersEpisodes(parseRes.episode)
            } catch (error) {
                errorMessage = 'Unknown episodes detail error'
                if (error instanceof Error) {
                    errorMessage = error.message
                }
                episodesDetail = []
            }
            
            return {
                characterDetail: parseRes,
                episodesDetail,
                episodesError: errorMessage
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

const charactersDetailSlice = createSlice({
    name: 'characterDetail',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCharacterById.pending, (state) => {
                state.characterError = ''
                state.loading = true
            })
            .addCase(getCharacterById.fulfilled, (state, action) => {
                state.loading = false
                state.characterDetail = action.payload.characterDetail
                if (action.payload.episodesError) {
                    state.episodesError = action.payload.episodesError
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

export default charactersDetailSlice.reducer