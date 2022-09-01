import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Character } from '../types/character'

interface CharacterState {
  characters: Character[]
}

const initialState: CharacterState = {
  characters: [],
}

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    likeCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload)
    },
    unlikeCharacter: (state, action: PayloadAction<Character>) => {
      const index = state.characters.findIndex((character) => character.id === action.payload.id)
      if (index !== -1) state.characters.splice(index, 1)
    },
  },
})

export const characterSelector = (state: RootState) => state.characterSlice.characters
export const { likeCharacter, unlikeCharacter } = characterSlice.actions
export default characterSlice.reducer
