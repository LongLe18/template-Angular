import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, filterDTO, TrinhDo } from "../constants/types";

@Injectable()
export class TrinhDoService {

    data: filterDTO<TrinhDo> = {
        pageIndex: 1,
        totalPage: 1,
        totalCount: 3,
        data: [
            {
                ten: "Tiến sĩ",
                tenVietTat: "TS",
                maTrinhDo: "ts",
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9268"
            },{
                ten: "Giáo sư",
                tenVietTat: "GS",
                maTrinhDo: "gs",
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9269"
            },
            {
                ten: "Thạc sĩ",
                tenVietTat: "ThS",
                maTrinhDo: "ts",
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9265"
            }
        ]
    };

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSTrinhDo(params?: Filter): Observable<filterDTO<TrinhDo>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

        return of(this.data);
    }
    
    // Lấy trình độ
    LayTrinhDo(guid: string): Observable<TrinhDo> {
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât
    CapNhatTrinhDo(guid: string, data: TrinhDo): Observable<TrinhDo> {
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
    ThemTrinhDo(data: TrinhDo): Observable<TrinhDo> {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa
    XoaTrinhDo(guid: string): Observable<TrinhDo> {
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