import { TRANGTHAI } from "../enums";

export type coQuanChucVu = {
    guid?: string,
    donViID?: string,
    chucVuID?: string;
}

export interface NhanSu extends coQuanChucVu {
    hoVaTen?: string,
    tenDangNhap?: string,
    donVi?: string,
    donViID?: string,
    email?: string;
    gioiTinh?: boolean;
    ngaySinh?: Date;
    sdt?: string;
    trinhDo?: string;
    trinhDoID?: string;
    trangThai?: TRANGTHAI;
    coQuan?: coQuanChucVu[],
    vaiTro?: string[],
    vaiTroID?: string[],
    quyenXuLy?: string[],
    quyen?: string,
    guid?: string,
}