import { TRANGTHAI } from "../enums";

export type DonViDongTC = {
    tenDonVi?: string,
    loaiDonVi?: string,
    loaiDonViID?: string,
    tenNuocNgoai?: string,
    quocGia?: string,
    moTa?: string,
    guid?: string,
    trangThai?: TRANGTHAI,
};

export type LoaiDonVi = {
    guid?: string;
    ten?: string;
}