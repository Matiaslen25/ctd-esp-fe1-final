import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
        }
    }
})

export const { addFavouriteCharacter, removeFavouriteCharacter } = favouriteCharactersSlice.actions

export default favouriteCharactersSlice.reducer