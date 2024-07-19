import axios, { AxiosResponse } from 'axios';
import { Result } from '../models/modal.interface'


const instance = axios.create({
    baseURL: 'http://localhost:8082/',
    // baseURL: 'https://jsonplaceholder.typicode.com/',
    timeout: 15000,
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => instance.get(url).then(responseBody),
    post: (url: string, body: object) => instance.post(url, body).then(responseBody),
    put: (url: string, body: object) => instance.put(url, body).then(responseBody),
    delete: (url: string) => instance.delete(url).then(responseBody),
};

export const Post = {
    // getPosts: (): Promise<Result[]> => requests.get('posts'),
    // getPosts: (): Promise<Result[]> => requests.get('teste'),
    getAFamily: (id: string): Promise<Result> => requests.get(`familia/${id}`),
    // createPost: (post: Teste): Promise<Teste> =>
    //     requests.post('posts', post),
    updateMembers: (membros: string[]) =>
        requests.put(`membros/`, membros),
    // deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};

