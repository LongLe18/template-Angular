import { TRANGTHAI } from "../enums";

export type DiaDiem = {
    tenDiaDiem?: string,
    thuTu?: number | string | null,
    tinhTrang?: string,
    tinhTrangID?: number,
    guid?: string,
    trangThai?: TRANGTHAI,
};
