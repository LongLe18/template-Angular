import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, LinhVuc, filterDTO } from "../constants/types";

@Injectable()
export class LinhVucService {

    data: filterDTO<LinhVuc> = {
        pageIndex: 1,
        totalCount: 2,
        totalPage: 1,
        data: [
            {
                tenLinhVuc: "Tổ chức cán bộ",
                thuTu: 1,
                moTa: "TCCB",
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9268"
            },
            {
                tenLinhVuc: "Đào tạo",
                thuTu: 2,
                moTa: "ĐT",
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9269"
            }
        ]
    };

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSLinhVuc(params?: Filter): Observable<filterDTO<LinhVuc>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

        return of(this.data);
    }
    
    // Lấy lĩnh vực
    LayLinhVuc(guid: string){
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât
    CapNhatLinhVuc(guid: string, data: LinhVuc) {
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
    ThemLinhVuc(data: LinhVuc) {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa
    XoaLinhVuc(guid: string) {
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