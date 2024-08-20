export interface ResponseGetMembers {
    http_code?: number
    id?: number;
    nome_familia?: string;
    membros?: Membros[];
}

interface Membros {
    id: number;
    nome: string;
}

export interface ResponseUpdateConfirmationMembers {
    response: string;
}