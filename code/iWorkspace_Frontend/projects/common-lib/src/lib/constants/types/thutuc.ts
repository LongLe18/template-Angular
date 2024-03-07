import { TRANGTHAI } from "../enums"

export type HoSo = {
    guid?: string,
    tenHoSo?: string,
    batBuoc?: boolean,
    file?: string,
}

export interface ThuTucHanhChinh extends HoSo {
    tenThuTuc?: string,
    coQuanThucHien?: string,
    coQuanThucHienID?: string, // guid tổ chức
    linhVuc?: string,
    linhVucID?: string, // guid Lĩnh vực
    type?: string,
    typeID?: number, // guid type thủ tục
    thuTu?: number,
    moTa?: string,
    guid?: string,
    hoSo?: HoSo[],
}
