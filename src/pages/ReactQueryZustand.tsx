import React, { useState, useEffect, ChangeEvent } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useCharacterStore } from '../app/zustandStore'
import { getCharacters, useCharactersQuery } from '../hooks/useCharactersQuery'
import { Button, ButtonPagination, Loading, LoadingIcon, Star, StarIcon } from '../utils/ui'
import { useDebounceText } from '../utils/helpers'
import { Character } from '../types/character'

const ReactQueryZustand = () => {
  const [page, setPage] = useState(1) // React Local State
  const [showLiked, setShowLiked] = useState(false) // React Local State
  const [searchFilter, setSearchFilter] = useState('') // React Local State

  const queryClient = useQueryClient() // React Query Client

  const { liked, likeCharacter } = useCharacterStore() // Zustand Client State

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    if (data?.info?.next) {
      setPage((prev) => prev + 1)
    }
  }

  const handleSearchCharacter = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target

    setSearchFilter(value)
  }

  const debouncedSearch = useDebounceText(searchFilter, 400)

  const { data, isLoading, isError, isFetching, isPreviousData } = useCharactersQuery(
    page,
    debouncedSearch,
  ) // React Query Server State

  // Prefetch Next Page
  useEffect(() => {
    if (data?.info?.next) {
      queryClient.prefetchQuery(['characters', page + 1], () => getCharacters(page + 1))
    }
  }, [data?.info?.next, page, queryClient])

  if (isError) {
    return (
      <div className="flex items-center justify-center text-2xl text-zinc-300">
        Something went wrong...
      </div>
    )
  }

  return (
    <div className="w-full max-w-7xl min-w-[360px] mx-auto my-5 flex justify-center">
      {isLoading ? (
        <Loading />
      ) : (
        <main className="flex flex-col w-full p-5 relative">
          {isFetching && (
            <div className="absolute top-0 right-0">
              <LoadingIcon />
            </div>
          )}
          <h1 className="px-5 mb-2 font-bold text-2xl">Playing with React Query and Zustand</h1>
          <header className="flex justify-between bg-slate-500 w-full p-5 rounded-2xl mb-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Search"
                className="py-2 px-5 rounded-xl w-full placeholder-zinc-400 border-none transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-600 focus:ring-offset-slate-500"
                onChange={handleSearchCharacter}
              />
            </div>
            <Button
              onClick={() => setShowLiked((oldState) => !oldState)}
              disabled={!liked?.length}
              className="flex place-items-center">
              Filter Favorites ({liked.length})
            </Button>
          </header>
          <section className="bg-slate-300 p-5 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data?.results
                ?.filter((character) => !showLiked || liked.includes(character.id))
                .map((character: Character) => (
                  <div
                    key={character.id}
                    className="group bg-white rounded-xl overflow-hidden relative drop-shadow-md">
                    <figure className="z-0">
                      <img
                        src={character.image}
                        alt={character.name}
                        className="min-w-full group-hover:scale-125 ease-in duration-200"
                      />
                      <figcaption className="absolute bottom-0 text-center bg-white w-full h-8 px-4 py-1 overflow-hidden">
                        {character.name}
                      </figcaption>
                    </figure>

                    <div className="absolute top-2 right-2 transition-all duration-200 ease-in-out hover:opacity-80">
                      <button
                        type="button"
                        onClick={() => likeCharacter(character.id)}
                        className="text-center text-sm rounded py-0 px-0 bg-white text-gray-700 hover:text-gray-500 transition-colors font-bold">
                        <Star active={liked.includes(character.id)} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <footer className="flex flex-row justify-between mt-5">
              <ButtonPagination onClick={handlePrevPage} disabled={page === 1}>
                Prev
              </ButtonPagination>
              <ButtonPagination
                onClick={handleNextPage}
                disabled={isPreviousData || !data?.info?.next}>
                Next
              </ButtonPagination>
            </footer>
          </section>
        </main>
      )}
    </div>
  )
}

export { ReactQueryZustand }
