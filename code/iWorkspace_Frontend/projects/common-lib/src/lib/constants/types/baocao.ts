export type BaoCaoNam = {
    suKien?: string,
    tenHoiThao?: string,
    tenCoQuanPhoiHop?: string,
    noiDung?: string,
    thoiGian?: Date,
    diaDiem?: string,
    donViToChuc?: string,
    soLuongDBVN?: number | string,
    soLuongDBNN?: number | string,
    from?: string[],
    kinhPhi?: string,
    capPhepCho?: string,
    hoatdong?: string,
    ghiChu?: string,
    guid?: string,
    stt?: number | string,
};


export type loaiCQ = {
    id?: number,
    text?: string
}

export interface BaoCaoCQTC {
    coQuan?: string,
    soLanPH?: number | string,
    kinhPhi: number[],
    loaiCoQuanID: number,
    guid?: string,
}

export interface BaoCaoNKH {
    tenNhaKH?: string,
    quocTich?: string,
    soLanPH?: number | string,
    coQuan: string,
    guid?: string,
}