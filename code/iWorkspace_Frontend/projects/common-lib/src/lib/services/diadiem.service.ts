import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, DiaDiem, filterDTO } from "../constants/types";

@Injectable()
export class DiaDiemService {

    tinhTrang = [{
        label: "Hoạt động",
        guid: 1,
    }, {
        label: "Tạm dừng",
        guid: 2,
    }];

    data: filterDTO<DiaDiem> = {
        pageIndex: 1,
        totalCount: 2,
        totalPage: 1,
        data: [
            {
                tenDiaDiem: "Hà Nội",
                thuTu: 1,
                tinhTrang: "Hoạt động",
                tinhTrangID: 1,
                guid: "ec10fa0b-87cf-4518-9e9d-8e632e3b9268"
            },
        ]
    };

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSDiaDiem(params?: Filter): Observable<filterDTO<DiaDiem>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

        return of(this.data);
    }
    
    // Lấy lĩnh vực
    LayDiaDiem(guid: string){
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât
    CapNhatDiaDiem(guid: string, data: DiaDiem) {
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
    ThemDiaDiem(data: DiaDiem) {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa
    XoaDiaDiem(guid: string) {
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