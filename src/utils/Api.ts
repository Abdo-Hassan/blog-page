import axios from 'axios';
import { IAddArticle } from '../types/types';

const endPoint = 'https://jsonplaceholder.typicode.com';

export const getArticlesAPI = async (pageParam: number) => {
  const url = `${endPoint}/posts?_start=${pageParam}&_limit=${10}`;
  const response = await axios.get(url);
  return response;
};

export const postAPI = async (payload: IAddArticle) => {
  const url = `${endPoint}/posts`;
  const response = await axios.post(url, payload);
  return response;
};

export const putAPI = async (payload: IAddArticle) => {
  const url = `${endPoint}/posts/${payload.id}`;
  const response = await axios.put(url, payload);
  return response;
};

export const deletePostAPI = async (id: number) => {
  const url = `${endPoint}/posts/${id}`;
  const response = await axios.delete(url);
  return response;
};
