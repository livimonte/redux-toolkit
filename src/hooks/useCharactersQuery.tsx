import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { BASE_URL } from '../features/api';
import { Characters } from '../types/api';

async function getCharacters(page: number, search = '') {
  if (search) {
    const { data } = await axios.get<Characters>(`${BASE_URL}character?name=${search}`)
    return data
  } else {
    const { data } = await axios.get<Characters>(`${BASE_URL}character?page=${page}`);
    return data;
  }
}

const useCharactersQuery = (page = 1, search = '') => {
  return useQuery(['characters', page, search], () => getCharacters(page, search), {
    keepPreviousData: true
  });
};

export { useCharactersQuery, getCharacters };
