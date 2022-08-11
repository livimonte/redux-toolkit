import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { Character, Status } from '../types/api'

const REDUCER_NAME = 'characters'
const BASE_URL = 'https://rickandmortyapi.com/api/'
const FETCH_CHARACTERS = 'characters/fetchCharacters'

interface CharacterState {
  characters: Character[]
  status: Status
}

const initialState: CharacterState = {
  characters: [],
  status: Status.idle,
}

export const fetchCharacters = createAsyncThunk(FETCH_CHARACTERS, async () => {
  const response = await fetch(`${BASE_URL}/character`)
  return await response.json()
})

const characterSlice = createSlice({
  name: REDUCER_NAME,
  initialState,
  reducers: {
    setCharacters: (state, action: PayloadAction<Character[]>) => {
      action.payload
    },
    addCharacter: (state, action: PayloadAction<Character>) => {
      state.characters.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = Status.pending
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.status = Status.rejected
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = action.payload.results
        state.status = Status.fulfilled
      })
  },
})

export const statusSelector = (state: RootState) => state.characterSlice.status
export const characterSelector = (state: RootState) => state.characterSlice.characters

export const { setCharacters, addCharacter } = characterSlice.actions
export default characterSlice.reducer
