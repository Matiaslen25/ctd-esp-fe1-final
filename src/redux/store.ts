import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './charactersSlice'
import characterDetailReducer from './characterDetailSlice'
import favouriteCharactersReducer from './favouriteCharactersSlice'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    characterDetail: characterDetailReducer,
    favouriteCharacters: favouriteCharactersReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch