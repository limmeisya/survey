export interface PaginationResponse<T>{
    data: T[],
    totalElements: number,
    totalPages: number,
    page: number,
    size: number,
}