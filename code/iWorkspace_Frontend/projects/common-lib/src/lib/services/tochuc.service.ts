import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, ToChuc, filterDTO } from "../constants/types";
import { TRANGTHAI } from "../constants/enums";

@Injectable()
export class ToChucService {

    data: filterDTO<ToChuc> = {
        pageIndex: 1,
        totalCount: 2,
        totalPage: 1,
        data: [
            {
                tenDonVi: "CƠ QUAN ĐẠI HỌC QUỐC GIA HÀ NỘI",
                capDonVi: 1,
                donViCha: 0,
                thuTu: 1,
                trangThai: TRANGTHAI.KHONGHOATDONG,
                trangThaiID: 2,
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9268"
            },
            {
                tenDonVi: "Văn phòng Đại học Quốc gia Hà Nội",
                capDonVi: 2,
                donViCha: 1,
                thuTu: 1,
                trangThai: TRANGTHAI.HOATDONG,
                trangThaiID: 1,
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9269"
            }
        ]
    };

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSToChuc(params?: Filter): Observable<filterDTO<ToChuc>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

        return of(this.data);
    }
    
    // Lấy lĩnh vực
    LayToChuc(guid: string){
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât
    CapNhatToChuc(guid: string, data: ToChuc) {
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
    ThemToChuc(data: ToChuc) {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa
    XoaToChuc(guid: string) {
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