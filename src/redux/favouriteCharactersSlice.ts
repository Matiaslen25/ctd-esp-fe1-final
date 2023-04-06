import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Character } from "./types"

const initialState: Character[] = []

const favouriteCharactersSlice = createSlice({
    name: 'favouriteCharacters',
    initialState,
    reducers: {
        /**
         * Agrega un personaje a la lista de favoritos en el estado de la aplicación
         * @param {Character} personaje Personaje a agregar a favoritos
         * @author [Matías Len](https://github.com/Matiaslen25)
         */
        addFavouriteCharacter: (state, action: PayloadAction<Character>) => {
            state.push(action.payload)
        },
        /**
         * Elimina un personaje específico de la lista de favoritos en el estado de la aplicación
         * @param {Character} personaje Personaje a eliminar de favoritos
         * @author [Matías Len](https://github.com/Matiaslen25)
         */
        removeFavouriteCharacter: (state, action: PayloadAction<Character>) => {
            return state.filter(character => character.id !== action.payload.id)
        },
        /**
         * Elimina todos los personajes de la lista de favoritos en el estado de la aplicación
         * @author [Matías Len](https://github.com/Matiaslen25)
         */
        removeAllFavouriteCharacters: () => {
            return initialState
        }
    }
})

export const { addFavouriteCharacter, removeFavouriteCharacter, removeAllFavouriteCharacters } = favouriteCharactersSlice.actions

export default favouriteCharactersSlice.reducer