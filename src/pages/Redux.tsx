import { useState } from 'react';

import { useListCharactersQuery } from '../features/api';
import { Character, Characters } from '../types/api';
import { ButtonPagination, Loading } from '../utils/ui';

const Redux = () => {
  const [likes, setLikes] = useState(0);
  const [page, setPage] = useState(1);
  const { data = [] as Characters, isFetching } = useListCharactersQuery(page);

  const handlePrevPage = () => page !== 1 && setPage(page - 1);
  const handleNextPage = () => setPage(page + 1);

  return (
    <div className='w-full max-w-7xl min-w-[360px] mx-auto my-5 flex justify-center'>
      {isFetching ? (
        <Loading />
      ) : (
        <main className='flex flex-col w-full p-5'>
          <h1 className='px-5 mb-2 font-bold text-2xl'>Playing with Redux/RTK</h1>
          <header className='flex justify-between bg-slate-500 w-full p-5 rounded-2xl mb-4'>
            <div className='w-1/2'>
              <input type='text' placeholder='Search' className='py-2 px-5 rounded-xl w-full' />
            </div>
            <div className='px-2 text-white flex place-items-center'>Likes: {likes}</div>
          </header>
          <section className='bg-slate-300 p-5 rounded-2xl'>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
              {data?.results?.length
                ? data?.results.map((character: Character) => (
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

                      <div className='absolute top-1 right-1 opacity-60 group-hover:opacity-95'>
                        <button
                          type='button'
                          className='text-center text-sm rounded py-0 px-1 bg-white text-gray-700 font-bold'
                        >
                          0
                        </button>
                      </div>
                    </div>
                  ))
                : null}
            </div>
            <footer className='flex flex-row justify-between mt-5'>
              <ButtonPagination onClick={handlePrevPage} disabled={page === 1}>
                Prev
              </ButtonPagination>
              <ButtonPagination onClick={handleNextPage}>Next</ButtonPagination>
            </footer>
          </section>
        </main>
      )}
    </div>
  );
};

export { Redux };
