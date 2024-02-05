import axios from 'axios';
const URL = 'https://swapi.dev/api/';

export const getCharacters = async (page: number) => {
  const {data} = await axios.get(`${URL}people/?page=${page}`);

  return data;
};

export const getDetails = async (url: string) => {
  const {data} = await axios.get(url);

  return data;
};
