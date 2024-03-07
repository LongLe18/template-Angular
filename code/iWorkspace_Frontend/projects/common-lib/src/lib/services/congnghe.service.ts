import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, filterDTO, CongNgheTC } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class CongngheTCService {

    data: filterDTO<CongNgheTC> = {
        totalCount: 30, 
        pageIndex: 1, 
        totalPage: 2,
        data: [{
            guid: "1",
            tenCongNghe: "Microsoft Team",
            moTa: ""
        }, {
            guid: "2",
            tenCongNghe: "Zoom",
            moTa: ""
        }]
    }

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSCongngheTC(params?: Filter): Observable<filterDTO<CongNgheTC>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy theo id
    LayCongngheTC(guid: string): Observable<CongNgheTC> {
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatCongngheTC(guid: string, data: CongNgheTC): Observable<CongNgheTC> {
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
    ThemCongngheTC(data: CongNgheTC): Observable<CongNgheTC> {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaCongngheTC(guid: string): Observable<CongNgheTC> {
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