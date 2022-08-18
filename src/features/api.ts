import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_URL = 'https://rickandmortyapi.com/api/'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      listCharacters: builder.query({
        query: (page = 1) => `character?page=${page}`,
      }),
      episode: builder.query({
        query: (id) => ({
          url: `episode/${id}`,
        }),
      }),
      location: builder.query({
        query: (id) => ({
          url: `location/${id}`,
        }),
      }),
    }
  },
})

export const { useListCharactersQuery, useEpisodeQuery, useLocationQuery } = apiSlice
