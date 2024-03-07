import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, filterDTO, DonViDongTC, LoaiDonVi } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class DonViDongTCService {

    loaiDonVi: LoaiDonVi[] = [
        {
            guid: '1',
            ten: "Trong nước",
        },{
            guid: '2',
            ten: "Nước ngoài",
        },
    ];
    
    data: filterDTO<DonViDongTC> = {
        totalCount: 30, 
        pageIndex: 1, 
        totalPage: 2,
        data: [{
            guid: "1",
            tenDonVi: 'Viện FES',
            loaiDonVi: 'Trong nước',
            loaiDonViID: '1',
            quocGia: "Việt Nam",
        }, {
            guid: "2",
            tenDonVi: 'Viện FED',
            loaiDonVi: 'Nước ngoài',
            loaiDonViID: '2',
            quocGia: "Australia"
        }]
    }

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSDonViDongTC(params?: Filter): Observable<filterDTO<DonViDongTC>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy theo id
    LayDonViDongTC(guid: string): Observable<DonViDongTC> {
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatDonViDongTC(guid: string, data: DonViDongTC): Observable<DonViDongTC> {
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
    ThemDonViDongTC(data: DonViDongTC): Observable<DonViDongTC> {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaDonViDongTC(guid: string): Observable<DonViDongTC> {
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