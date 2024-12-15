import axios, { AxiosResponse } from 'axios';
import { RequestMembersSelected, MembersData, ResponseCode, TotalMembers } from '../models/invite/modal.interface'
import { Present } from '../models/gifts/modal.interface';


const instance = axios.create({
    // baseURL: 'https://tight-lark-equal.ngrok-free.app/api/casamento/',
    //  baseURL: 'http://localhost:8070/api/casamento/',
    baseURL :'http://localhost:8082/',
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
    login: (username: string, password: string): Promise<ResponseCode> => requests.get(`login?username=${username}&password=${password}`),

    getGuestsByCode: (id: string): Promise<MembersData> => requests.get(`membros/${id}`),
    getGuests: (): Promise<MembersData[]> => requests.get(`membros/cadastrados`),
    getCountMembers: ():
        Promise<TotalMembers> =>
        requests.get(`membros/count`),

    postConfirmationMembers:
        (membros: RequestMembersSelected):
            Promise<ResponseCode> =>
            requests.post(`membros/confirmar`, membros),
    postGuests:
        (membros: MembersData): Promise<ResponseCode> =>
            requests.post(`membros/cadastrar`, membros),

    postPresents: (present: Present) => requests.post('', present),

    deleteGuests: (code: string): Promise<ResponseCode> => requests.delete(`membros/${code}`),
};

