import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, ThuTucHC, filterDTO } from "../constants/types";

export const dataLoaiTienTe = [{
    loaiTienTe: "VND",
    loaiTienTeID: "1"
},{
    loaiTienTe: "USD",
    loaiTienTeID: "2"
}]

export const dataLoaiDonVi = [{
    loaiDonVi: "Trong nước",
    loaiDonViID: "1"
},{
    loaiDonVi: "Nước ngoài",
    loaiDonViID: "2"
}]

@Injectable()
export class ThuTucHCService {

    data: filterDTO<ThuTucHC> = {
        pageIndex: 1,
        totalCount: 2,
        totalPage: 1,
        data: [
            {
                tenHoiThao: "Phát triển kỹ năng nghiêm cứu và công bố quốc tế trong lĩnh vực tư pháp hình sự và tội phạm học",
                lyDoMucDich: {
                    lyDo: "test",
                    mucDich: "test",
                    donViID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
                    donVi: 'CƠ QUAN ĐẠI HỌC QUỐC GIA HÀ NỘI',
                    donViDongToChuc: [{
                        guid: "1",
                        tenDonVi: "Viện FES",
                        loaiDonVi: "Trong nước",
                        loaiDonViID: "1",
                        quocGia: "Việt Nam",
                    }, {
                        guid: "2",
                        tenDonVi: "Viện FED",
                        loaiDonVi: "Nước ngoài",
                        loaiDonViID: "2",
                        quocGia: "Australia",
                    }]
                },
                thongTinHoiThao: {
                    fromDate: new Date(),
                    toDate: new Date(),
                    diaDiem: "Hà Nội",
                    diaDiemID: "ec10fa0b-87cf-4518-9e9d-8e632e3b9268",
                    moTaDiaDiem: "test",
                    loaiHoiThao: "Trực tiếp",
                    loaiHoiThaoID: "1",
                    thanhPhanToChuc: [{
                        loaiThanhPhan: "Ban tổ chức",
                        loaiThanhPhanID: "1",
                        data: [
                            {
                                guid: "1",
                                hoVaTen: "Nguyễn Văn Nam",
                                chucVu: "Giáo sư",
                            }
                        ]
                    }, {
                        loaiThanhPhan: "Ban thư ký",
                        loaiThanhPhanID: "2",
                        data: [
                            {
                                guid: "2",
                                hoVaTen: "Nguyễn Thị Vân",
                                chucVu: "Phó giáo sư",
                            }
                        ]
                    }, {
                        loaiThanhPhan: "Ban chuyên môn",
                        loaiThanhPhanID: "3",
                        data: [
                            {
                                guid: "3",
                                hoVaTen: "Nguyễn Văn Thắng",
                                chucVu: "Tiến sĩ",
                            }
                        ]
                    }],
                    coQuanTaiTro: [{
                        guid: "1",
                        tenCoQuan: "Bộ Tư pháp",
                        giaTri: "10000000",
                        loaiTienTe: "VND",
                        loaiTienTeID: "1",
                        loaiDonVi: "Trong nước",
                        loaiDonViID: "1",
                    }],
                    duKienSLVN: "100",
                    duKienSLNN: "50",
                    thanhPhanNN: [{
                        hoVaTen: "Mr. Florian Constantine Feyerabend",
                        ngaySinh: new Date(),
                        quocTich: "Úc",
                        hoChieu: 'C3FH3FZZ8',
                        danhXung: 'Mr',
                        ngheNghiep: 'a',
                        noiLamViec: 'b',
                        guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9268"
                    }]
                },
                linhVucID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
                linhVuc: 'Tổ chức cán bộ',
                thuTucID: '1',
                thuTuc: 'Kê khai/cập nhật sơ yếu lý lịch viên chức; mẫu lý lịch khoa học',
                thoiGianDK: new Date(),
                thoiGianCapNhat: new Date(),
                trangThai: "Lưu nháp",
                trangThaiID: '1',
                quaTrinhXuLy: [{
                    hoVaTen: "Nguyễn Văn Nam",
                    thoiGian: new Date(),
                    xuLy: "Đã tạo hồ sơ",
                    xuLyID: "1",
                    yKien: "",
                    file: "",
                }, {
                    hoVaTen: "Nguyễn Thị Vân",
                    thoiGian: new Date(),
                    xuLy: "Đã chuyển hồ sơ",
                    xuLyID: "2",
                    yKien: "Hồ sơ đầy đủ thông tin",
                    file: "File1.doc",
                }],
                phienBan: [{
                    thoiGianCapNhat: new Date(),
                    nguoiCapNhat: "Nguyễn Văn Nam",
                    guid: "1"
                }],
                nguoiGui: "Nguyễn Thị Lan",
                nguoiGuiID: "1",
                hoSoKemTheo: [{
                    guid: "1",
                    tenHoSo: "Sơ yếu lý lịch",
                    file: {
                        label: '2C/TCTW-98.docx',
                        url: "assets/images/avatar.jpg"
                    }
                }, {
                    guid: "2",
                    tenHoSo: " Sơ yếu lý lịch viên chức",
                    file: {
                        url: "assets/images/avatar.jpg",
                        label: 'HS02-VN/BNV.docx',
                    }
                }, {
                    guid: "3",
                    tenHoSo: "Phiếu bổ sung lý lịch viên chức",
                    file: {
                        label: 'HS03-VC/BNV.docx',
                        url: "assets/images/avatar.jpg"
                    }
                }],
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9268"
            },
            {
                tenHoiThao: "Tác động của môi trường lãi suất cao tới ổn định kinh tế vĩ mô và phục hồi tăng trưởng năm 2023",
                linhVucID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
                thuTuc: 'Kê khai/cập nhật sơ yếu lý lịch viên chức; mẫu lý lịch khoa học',
                thuTucID: '1',
                linhVuc: 'Tổ chức cán bộ',
                thoiGianCapNhat: new Date(),
                thoiGianDK: new Date(),
                trangThai: "Đã gửi",
                trangThaiID: '3',
                quaTrinhXuLy: [{
                    hoVaTen: "Nguyễn Văn Nam",
                    thoiGian: new Date(),
                    xuLy: "Đã tạo hồ sơ",
                    xuLyID: "1",
                    yKien: "",
                    file: "",
                }, {
                    hoVaTen: "Nguyễn Thị Vân",
                    thoiGian: new Date(),
                    xuLy: "Đã chuyển hồ sơ",
                    xuLyID: "2",
                    yKien: "Hồ sơ đầy đủ thông tin",
                    file: "File1.doc",
                }],
                phienBan: [{
                    thoiGianCapNhat: new Date(),
                    nguoiCapNhat: "Nguyễn Văn Nam",
                    guid: "1"
                }],
                hoSoKemTheo: [{
                    guid: "1",
                    tenHoSo: "Sơ yếu lý lịch",
                    file: {
                        label: '2C/TCTW-98.docx',
                        url: "assets/images/avatar.jpg"
                    }
                }, {
                    guid: "2",
                    tenHoSo: " Sơ yếu lý lịch viên chức",
                    file: {
                        url: "assets/images/avatar.jpg",
                        label: 'HS02-VN/BNV.docx',
                    }
                }, {
                    guid: "3",
                    tenHoSo: "Phiếu bổ sung lý lịch viên chức",
                    file: {
                        label: 'HS03-VC/BNV.docx',
                        url: "assets/images/avatar.jpg"
                    }
                }],
                nguoiGui: "Nguyễn Thị Lan",
                nguoiGuiID: "1",
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9269"
            }
        ]
    };

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSThuTucHC(params?: Filter): Observable<filterDTO<ThuTucHC>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

        return of(this.data);
    }
    
    // Lấy lĩnh vực
    LayThuTucHC(guid: string){
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât
    CapNhatThuTucHC(guid: string, data: ThuTucHC) {
        const existingItemIndex = this.data.data.findIndex(item => item.guid === guid);
        if (existingItemIndex !== -1) {
            this.data.data[existingItemIndex] = {guid, ...data};
            return of({ guid, ...data });
        } else {
            // Trả về lỗi hoặc thông báo nếu không tìm thấy
            return of(null);
        }
    }

    // Thêm
    ThemThuTucHC(data: ThuTucHC) {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa
    XoaThuTucHC(guid: string) {
        this.data.data = this.data.data.filter(item => item.guid !== guid);
        const existingItemIndex = this.data.data.findIndex(item => item.guid === guid);
        if (existingItemIndex !== -1) {
            const deletedItem = this.data.data.splice(existingItemIndex, 1)[0];
            return of(deletedItem);
        } else {
            // Trả về lỗi hoặc thông báo nếu không tìm thấy
            return of(null);
        }
    }
}