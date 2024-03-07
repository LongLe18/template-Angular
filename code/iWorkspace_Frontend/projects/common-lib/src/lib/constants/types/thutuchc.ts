import { ThuTucHCDungChung } from "./thutuchcdungchung"; 
import { DaiBieuNN } from "./daibieu"; 
import { DonViDongTC } from "./donvidongtc"; 

export type LydoMucDich = {
    lyDo?: string,
    mucDich?: string,
    donVi?: string,
    donViID?: string, // đổi kiểu dữ liệu theo db
    donViDongToChuc?: DonViDongTC[]
}

export type ThongTinHoiThao = {
    fromDate?: Date,
    toDate?: Date,
    diaDiem?: string,
    diaDiemID?: string,
    moTaDiaDiem?: string,
    loaiHoiThaoID?: string, // đổi kiểu dữ liệu theo db
    loaiHoiThao?: string,
    congNgheID?: string,
    congNghe?: string,
    thanhPhanToChuc?: {
        loaiThanhPhan?: string, // Ban thư ký, Ban tổ chức, Ban chuyên môn, ...
        loaiThanhPhanID?: string, //
        data: {
            guid?: string,
            hoVaTen?: string,
            chucVu?: string,
        }[]
    }[],
    coQuanTaiTro?: {
        guid?: string,
        tenCoQuan?: string,
        giaTri?: string | number,
        loaiTienTe?: string,
        loaiTienTeID?: string,
        loaiDonVi?: string,
        loaiDonViID?: string,
    }[],
    duKienSLVN?: string | number,
    duKienSLNN?: string | number,
    thanhPhanNN?: DaiBieuNN[],
    // Phê duyệt
    donViCapPhepID?: string,
    donViCapPhep?: string,
    hoatDong?: string,
    donViChuTriVN?: string,
    donViChuTriNN?: string,
    ketQuaHoiThao?: string[],
}

export type NoiDungChuongTrinh = {
    tomTat?: string,
    file?: string,
    tenFile?: string[]
}

export type NguonKinhPhi = {
    donVi?: string,
    moTa?: string,
}

export interface ThuTucHC extends ThuTucHCDungChung {
    tenHoiThao?: string,
    lyDoMucDich?: LydoMucDich,
    thongTinHoiThao?: ThongTinHoiThao,
    noiDung?: NoiDungChuongTrinh,
    hoatDongBenLe?: string,
    keHoachTuyenTruyen?: string,
    nguonKinhPhi?: NguonKinhPhi,
    // hồ sơ kèm theo
}