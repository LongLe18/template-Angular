export type TrangThai = {
    trangThai?: string,
    trangThaiID?: string,
}

export type QuaTrinhXuLy = {
    hoVaTen?: string,
    thoiGian?: Date,
    xuLy?: string,
    xuLyID?: string,
    yKien?: string,
    file?: string,
    guid?: string,
}

export type PhienBan = {
    nguoiCapNhat?: string,
    thoiGianCapNhat?: Date,
    guid?: string,
}

export type hoSoKemTheo = {
    guid?: string,
    tenHoSo?: string,
    file?: {
        url?: string,
        label?: string,
    },
    fileUpload?: string,
}

export type ThuTucHCDungChung = {
    tieuDe?: string,
    thuTucID?: string,
    thuTuc?: string,
    linhVuc?: string,
    linhVucID?: string,
    thoiGianDK?: Date,
    thoiGianCapNhat?: Date,
    trangThai?: string,
    nguoiGui?: string,
    nguoiGuiID?: string,
    trangThaiID?: string,
    note?: string,
    quaTrinhXuLy?: QuaTrinhXuLy[],
    hoSoKemTheo?: hoSoKemTheo[],
    phienBan?: PhienBan[],
    moTa?: string,
    guid?: string,
};

export interface ThuTucHCDungChungDTO extends ThuTucHCDungChung {
    data: ThuTucHCDungChung[],
    pageIndex: number,
    totalCount: number,
    totalPage: number
}
