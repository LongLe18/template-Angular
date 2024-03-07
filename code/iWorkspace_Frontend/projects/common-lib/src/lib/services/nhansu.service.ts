import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, filterDTO, NhanSu } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class NhanSuService {

    data: filterDTO<NhanSu> = {
        totalCount: 2, 
        pageIndex: 1, 
        totalPage: 1,
        data: [{
            guid: "1",
            hoVaTen: "Quản lý 1",
            tenDangNhap: 'quanly1',
            donVi: 'CƠ QUAN ĐẠI HỌC QUỐC GIA HÀ NỘI',
            donViID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
            email: 'quanly1@vnu.edu.vn',
            sdt: '1',
            gioiTinh: false, // false -> nữ; true: nam
            ngaySinh: new Date(),
            trinhDoID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
            coQuan: [
                {
                    "donViID": "ec10fa0b-87cf-4518-9e9d-8e632e3b9268",
                    "guid": "2",
                    "chucVuID": "914f76a7-b2eb-49ea-9ac3-4ddbd96f74d4"
                }
            ],
            vaiTroID: ['1', '2'],
            vaiTro: ['Quản trị hệ thống', 'Xử lý thủ tục Hội nghị, hội thảo'],
            quyenXuLy: ['1'],
        }, {
            guid: "2",
            hoVaTen: "Quản lý 2",
            tenDangNhap: 'quanly2',
            donVi: 'CƠ QUAN ĐẠI HỌC QUỐC GIA HÀ NỘI',
            donViID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
            email: 'quanly2@vnu.edu.vn',
            sdt: '2',
            gioiTinh: false, // false -> nữ; true: nam
            ngaySinh: new Date(),
            trinhDoID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9269',
            vaiTroID: ['2'],
            vaiTro: ['Xử lý thủ tục Hội nghị, hội thảo'],
            quyenXuLy: ['2'],
        }]
    }

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSNhanSu(params?: Filter): Observable<filterDTO<NhanSu>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy theo id
    LayNhanSu(guid: string): Observable<NhanSu> {
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatNhanSu(guid: string, data: NhanSu): Observable<NhanSu> {
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
    ThemNhanSu(data: NhanSu): Observable<NhanSu> {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaNhanSu(guid: string): Observable<NhanSu> {
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