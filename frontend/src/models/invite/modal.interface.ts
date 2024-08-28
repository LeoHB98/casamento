export interface MembersData {
    http_code?: number
    id?: number;
    nome_familia?: string;
    membros?: Members[];
}

export interface Members {
    id?: number;
    nome?: string;
}

export interface ResponseUpdateConfirmationMembers {
    response: string;
}

export interface RequestMembersSelected {
    code: string;
    members: string[]
}