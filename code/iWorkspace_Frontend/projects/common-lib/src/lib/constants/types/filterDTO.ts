export interface filterDTO<T> {
    data: T[],
    pageIndex: number,
    totalCount: number,
    totalPage: number
}