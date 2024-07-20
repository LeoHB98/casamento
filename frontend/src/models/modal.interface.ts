export interface Result {
    id?: number;
    nome_familia?: string;
    membros?: Membros[];
}

interface Membros {
    id: number;
    nome: string;
}