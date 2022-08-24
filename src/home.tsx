import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { characterSelector, likeCharacter, unlikeCharacter } from './features/characterSlice'
import { Character, Characters } from './types/api'
import { useListCharactersQuery } from './features/api'
import { Button, ButtonPagination, Loading, Star } from './utils/ui'
import { useDebounce, useDidMountEffect } from './utils/helpers'

export function Home() {
  const dispatch = useAppDispatch()
  const likedCharacters = useAppSelector(characterSelector)

  const [showLiked, setShowLiked] = useState(false)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const { data = [] as Characters, isFetching } = useListCharactersQuery({ page, search })

  // Show filtered or all data
  const charactersData =
    showLiked && likedCharacters?.length && data.results?.length
      ? data.results.filter((c) => likedCharacters.find((x) => x.id === c.id))
      : data.results

  const handlePrevPage = () => setPage(page - 1)
  const handleNextPage = () => setPage(page + 1)

  const debouncedSearch = useDebounce((searchValue: string) => {
    setSearch(searchValue)
    setPage(1)
  }, 700)

  useDidMountEffect(() => {
    debouncedSearch(searchInput)
  }, [searchInput])

  return (
    <div className="w-full max-w-7xl min-w-[360px] mx-auto my-5 flex justify-center">
      {isFetching ? (
        <Loading />
      ) : (
        <main className="flex flex-col w-full p-5">
          <h1 className="px-5 mb-2 font-bold text-2xl">Playing with Redux/RTK</h1>
          <header className="flex justify-between bg-slate-500 w-full p-5 rounded-2xl mb-4">
            <div className="w-1/2">
              <input
                type="text"
                placeholder="Search"
                className="py-2 px-5 rounded-xl w-full placeholder-zinc-400 border-none transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-600 focus:ring-offset-slate-500"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <Button
              onClick={() => setShowLiked((state) => !state)}
              disabled={!likedCharacters?.length}
              className="flex place-items-center">
              Filter Favorites ({likedCharacters?.length})
            </Button>
          </header>
          <section className="bg-slate-300 p-5 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {charactersData?.length
                ? charactersData.map((character: Character) => {
                    const liked = likedCharacters.find((c) => c.id === character.id)

                    return (
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

                        <div className="absolute top-2 right-2 opacity-60 group-hover:opacity-95">
                          <button
                            onClick={() =>
                              liked
                                ? dispatch(unlikeCharacter({ id: character.id }))
                                : dispatch(likeCharacter({ id: character.id }))
                            }
                            type="button"
                            className="text-center text-sm rounded py-0 px-0 bg-white text-gray-700 hover:text-gray-500 transition-colors font-bold">
                            {<Star active={!!liked} />}
                          </button>
                        </div>
                      </div>
                    )
                  })
                : null}
            </div>
            <footer className="flex flex-row justify-between mt-5">
              <ButtonPagination onClick={handlePrevPage} disabled={page === 1}>
                Prev
              </ButtonPagination>
              <ButtonPagination onClick={handleNextPage} disabled={page === data?.info?.pages}>
                Next
              </ButtonPagination>
            </footer>
          </section>
        </main>
      )}
    </div>
  )
}
