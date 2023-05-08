interface ResponseMeta {
    httpCode: number
    httpMessage: string
    message: string
    errors: string[]
    time: number
}

export interface ResponsePagination {
    currentPage: number;
    prevPages: number[];
    nextPages: number[];
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    itemsInPage: number;
}

export interface ResponseInterface {
    meta: ResponseMeta;
    data: any;
}

export interface ResponsePaginationInterface extends ResponseInterface{
    pagination: ResponsePagination
}
