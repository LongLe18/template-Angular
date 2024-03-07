import { TRANGTHAI } from "../enums";

export type ChucVu = {
    tenChucVu: string,
    thuTu: number | string,
    moTa?: string,
    guid?: string,
    trangThai?: TRANGTHAI,
};
