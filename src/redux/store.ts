import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './charactersSlice'
import favouriteCharactersReducer from './favouriteCharactersSlice'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    favouriteCharacters: favouriteCharactersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch