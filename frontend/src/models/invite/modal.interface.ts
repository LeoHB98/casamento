export interface MembersData {
    httpCode?: number
    id?: number;
    codigo?: string;
    nomeFamilia?: string;
    dataCriacao?: string;
    membros?: Members[];
}

export interface Members {
    id?: number
    nomeMembro?: string;
    confirmado?: string;
}

export interface RequestMembersSelected {
    code: string;
    members: string[]
}

export interface ResponseCode {
    code: number;
    message: string;
}

export interface TotalMembers{
    response :ResponseCode;
    quantidade: number;

}