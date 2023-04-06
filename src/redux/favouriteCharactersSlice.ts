import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Character } from "./types"

const initialState: Character[] = []

const favouriteCharactersSlice = createSlice({
    name: 'favouriteCharacters',
    initialState,
    reducers: {
        addFavouriteCharacter: (state, action: PayloadAction<Character>) => {
            state.push(action.payload)
        },
        removeFavouriteCharacter: (state, action: PayloadAction<Character>) => {
            return state.filter(character => character.id !== action.payload.id)
        },
        removeAllFavouriteCharacters: () => {
            return initialState
        }
    }
})

export const { addFavouriteCharacter, removeFavouriteCharacter, removeAllFavouriteCharacters } = favouriteCharactersSlice.actions

export default favouriteCharactersSlice.reducer