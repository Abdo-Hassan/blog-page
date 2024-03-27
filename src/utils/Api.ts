import axios from 'axios';
import { IBlog } from '../types/types';

const endPoint = 'https://jsonplaceholder.typicode.com';

export const getArticlesAPI = async () => {
  const url = `${endPoint}/posts`;
  const response = await axios.get(url);
  return response;
};

export const addArticleAPI = async (payload: IBlog) => {
  const url = `${endPoint}/posts`;
  const response = await axios.post(url, payload);
  return response;
};

export const updateArticleAPI = async (payload: IBlog) => {
  const url = `${endPoint}/posts/${payload.id}`;
  const response = await axios.put(url, payload);
  return response;
};

export const deleteArticleAPI = async (id: number) => {
  const url = `${endPoint}/posts/${id}`;
  const response = await axios.delete(url);
  return response;
};
