import axios, { AxiosResponse } from 'axios';
import { ResponseGetMembers, ResponseUpdateConfirmationMembers } from '../models/modal.interface'


const instance = axios.create({
    baseURL: 'https://tight-lark-equal.ngrok-free.app/api/',
    // baseURL: 'http://localhost:8082/api/',
    timeout: 15000,
    headers: {
        'ngrok-skip-browser-warning': 'true'
    }

});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {

    get: (url: string) =>
        instance.get(url).then(responseBody),

    post: (url: string, body: object) =>
        instance.post(url, body).then(responseBody),

    put: (url: string, body: object) =>
        instance.put(url, body).then(responseBody),

    delete: (url: string) =>
        instance.delete(url).then(responseBody),
};

export const Api = {
    // getPosts: (): Promise<Result[]> => requests.get('posts'),
    // getPosts: (): Promise<Result[]> => requests.get('teste'),
    getAFamily: (id: string): Promise<ResponseGetMembers> => requests.get(`familia/${id}`),
    // createPost: (post: Teste): Promise<Teste> =>
    //     requests.post('posts', post),
    confirmationMembers: (membros: string[]): Promise<ResponseUpdateConfirmationMembers> =>
        requests.post(`membros`, membros),

    confirmacao: (): Promise<ResponseUpdateConfirmationMembers> => requests.get(`membros`),

    membersConfirmed: (): Promise<Response> => requests.get(`todos`)

    // deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};

