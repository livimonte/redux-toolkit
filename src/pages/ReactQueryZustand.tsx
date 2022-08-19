import { useState, useEffect } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { getCharacters, useCharactersQuery } from '../hooks/useCharactersQuery';
import { Character } from '../types/api';
import { ButtonPagination, Loading, LoadingIcon, StarIcon } from '../utils/ui';
import { useCharacterStore } from '../app/zustandStore';

const ReactQueryZustand = () => {
  const [page, setPage] = useState(1);
  const [showLiked, setShowLiked] = useState(false);

  const queryClient = useQueryClient();
  const { data, isLoading, isError, isFetching, isPreviousData } = useCharactersQuery(page);

  const { liked, likeCharacter } = useCharacterStore()

  const handlePrevPage = () => {
    setPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (data?.info?.next) {
      setPage(prev => prev + 1);
    }
  };

  useEffect(() => {
    if (data?.info?.next) {
      queryClient.prefetchQuery(['characters', page + 1], () => getCharacters(page + 1));
    }
  }, [data?.info?.next, page, queryClient]);

  if (isError) {
    return (
      <div className='flex items-center justify-center text-2xl text-zinc-300'>
        Something went wrong...
      </div>
    );
  }

  return (
    <div className='w-full max-w-7xl min-w-[360px] mx-auto my-5 flex justify-center'>
      {isLoading ? (
        <Loading />
      ) : (
        <main className='flex flex-col w-full p-5 relative'>
          {isFetching && (
            <div className='absolute top-0 right-0'>
              <LoadingIcon />
            </div>
          )}
          <h1 className='px-5 mb-2 font-bold text-2xl'>Playing with React Query and Zustand!</h1>
          <header className='flex justify-between bg-slate-500 w-full p-5 rounded-2xl mb-4'>
            <div className='w-1/2'>
              <input type='text' placeholder='Search' className='py-2 px-5 rounded-xl w-full' />
            </div>
            <div className='px-2 text-white flex gap-2 place-items-center'>Likes: {liked.length}
              <button className='border rounded p-2' onClick={() => setShowLiked(oldState => !oldState)}>
                {!showLiked ? 'Show Liked' : 'Show All'}
              </button>
            </div>
          </header>
          <section className='bg-slate-300 p-5 rounded-2xl'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              {data?.results?.filter(character => !showLiked || liked.includes(character.id)).map((character: Character) => (
                <div
                  key={character.id}
                  className='group bg-white rounded-xl overflow-hidden relative drop-shadow-md'
                >
                  <figure className='z-0'>
                    <img
                      src={character.image}
                      alt={character.name}
                      className='min-w-full group-hover:scale-125 ease-in duration-200'
                    />
                    <figcaption className='absolute bottom-0 text-center bg-white w-full h-8 px-4 py-1 overflow-hidden'>
                      {character.name}
                    </figcaption>
                  </figure>

                  <div className='absolute top-1 right-1 transition-all duration-200 ease-in-out hover:opacity-80'>
                    <button
                      type='button'
                      onClick={() => likeCharacter(character.id)}
                    >
                      <StarIcon isActive={liked.includes(character.id)} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <footer className='flex flex-row justify-between mt-5'>
              <ButtonPagination onClick={handlePrevPage} disabled={page === 1}>
                Prev
              </ButtonPagination>
              <ButtonPagination
                onClick={handleNextPage}
                disabled={isPreviousData || !data?.info?.next}
              >
                Next
              </ButtonPagination>
            </footer>
          </section>
        </main>
      )}
    </div>
  );
};

export { ReactQueryZustand };
