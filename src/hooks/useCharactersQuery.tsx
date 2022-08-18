import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { BASE_URL } from '../features/api';
import { Characters } from '../types/api';

async function getCharacters(page: number) {
  const { data } = await axios.get<Characters>(`${BASE_URL}character?page=${page}`);
  return data;
}

const useCharactersQuery = (page = 1) => {
  return useQuery(['characters', page], () => getCharacters(page), {
    keepPreviousData: true
  });
};

export { useCharactersQuery, getCharacters };
