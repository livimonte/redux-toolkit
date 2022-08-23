import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Characters, ListParams } from '../types/api'

const BASE_URL = 'https://rickandmortyapi.com/api/'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['CHARACTERS'],
  endpoints(builder) {
    return {
      listCharacters: builder.query<Characters, ListParams>({
        query: ({ page = 1, search = '' }) => `character?page=${page}&name=${search}`,
        providesTags: [{ type: 'CHARACTERS', id: 'LIST' }],
      }),
    }
  },
})

export const { useListCharactersQuery } = apiSlice
