import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, ThuTucHanhChinh, filterDTO } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class ThuTucService {

    data: filterDTO<ThuTucHanhChinh> = {
        totalCount: 30, 
        pageIndex: 1, 
        totalPage: 2,
        data: [{
            guid: "1",
            tenThuTuc: 'Kê khai/cập nhật sơ yếu lý lịch viên chức; mẫu lý lịch khoa học',
            coQuanThucHien: 'CƠ QUAN ĐẠI HỌC QUỐC GIA HÀ NỘI',
            coQuanThucHienID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
            linhVuc: 'Tổ chức cán bộ',
            linhVucID: 'ec10fa0b-87cf-4518-9e9d-8e632e3b9268',
            type: 'Thông thường',
            typeID: 1,
            thuTu: 1,
        }]
    }

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSThuTucHC(params?: Filter): Observable<filterDTO<ThuTucHanhChinh>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy menu theo id
    LayThuTucHC(guid: string): Observable<ThuTucHanhChinh> {
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatThuTucHC(guid: string, data: ThuTucHanhChinh): Observable<ThuTucHanhChinh> {
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
    ThemThuTucHC(data: ThuTucHanhChinh): Observable<ThuTucHanhChinh> {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaThuTucHC(guid: string): Observable<ThuTucHanhChinh> {
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