import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, ThuTucHCDungChung, ThuTucHCDungChungDTO, TrangThai } from "../constants/types";

export const trangThaiThutuc: TrangThai[] = [{
    trangThaiID: '1',
    trangThai: 'Lưu nháp',
}, {
    trangThaiID: '2',
    trangThai: 'Bị từ chối',
}, {
    trangThaiID: '3',
    trangThai: 'Đã gửi',
}, {
    trangThaiID: '4',
    trangThai: 'Đang xử lý',
}, {
    trangThaiID: '5',
    trangThai: 'Hoàn thành',
}]

@Injectable()
export class ThuTucHCDungChungService {

    data: ThuTucHCDungChungDTO = {
        pageIndex: 1,
        totalCount: 2,
        totalPage: 1,
        data: [
            {
                moTa: "Hồ sơ Kê khai/cập nhật sơ yếu lý lịch viên chức; mẫu lý lịch khoa học",
                linhVucID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
                linhVuc: 'Tổ chức cán bộ',
                thuTucID: '1',
                thuTuc: 'Kê khai/cập nhật sơ yếu lý lịch viên chức; mẫu lý lịch khoa học',
                thoiGianDK: new Date(),
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
                moTa: "Kê khai/cập nhật Hợp đồng lao động, Hợp đồng làm việc",
                linhVucID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
                thuTuc: 'Kê khai/cập nhật sơ yếu lý lịch viên chức; mẫu lý lịch khoa học',
                thuTucID: '1',
                linhVuc: 'Tổ chức cán bộ',
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
    LayDSThuTucHCDungChung(params?: Filter): Observable<ThuTucHCDungChungDTO> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

        return of(this.data);
    }
    
    // Lấy lĩnh vực
    LayThuTucHCDungChung(guid: string){
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât
    CapNhatThuTucHCDungChung(guid: string, data: ThuTucHCDungChung) {
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
    ThemThuTucHCDungChung(data: ThuTucHCDungChung) {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa
    XoaThuTucHCDungChung(guid: string) {
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