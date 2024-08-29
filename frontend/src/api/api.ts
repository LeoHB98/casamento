import axios, { AxiosResponse } from 'axios';
import { RequestMembersSelected, MembersData, ResponseUpdateConfirmationMembers } from '../models/invite/modal.interface'
import { Present } from '../models/gifts/modal.interface';


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

    getAFamily: (id: string): Promise<MembersData> => requests.get(`familia/${id}`),
    getGuests: (): Promise<MembersData[]> => requests.get(`membros/cadastrados`),

    postConfirmationMembers:
        (membros: RequestMembersSelected):
            Promise<ResponseUpdateConfirmationMembers> =>
            requests.post(`membros/confirmar`, membros),
    postGuests:
        (membros: MembersData): Promise<ResponseUpdateConfirmationMembers> =>
            requests.post(`membros/cadastrar`, membros),

    postPresents: (present: Present) => requests.post('', present)

    // deletePost: (id: number): Promise<void> => requests.delete(`posts/${id}`),
};

