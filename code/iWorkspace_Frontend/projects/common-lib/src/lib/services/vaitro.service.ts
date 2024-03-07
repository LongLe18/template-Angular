import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, filterDTO, VaiTro } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class VaiTroService {

    data: filterDTO<VaiTro> = {
        totalCount: 30, 
        pageIndex: 1, 
        totalPage: 2,
        data: [{
            guid: '1',
            tenVaiTro: 'Quản trị hệ thống',
            moTa: 'mô tả Quản trị hệ thống',
            menuRole: [
                {
                    idMenu: '20',
                    idRole: ['1', '2']
                }
            ]
        }, {
            guid: '2',
            tenVaiTro: 'Xử lý thủ tục Hội nghị, hội thảo',
            moTa: 'Xử lý thủ tục Hội nghị, hội thảo',
            menuRole: [
                {
                    idMenu: '21',
                    idRole: ['8', '9', '10']
                }
            ]
        }]
    }

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSVaiTro(params?: Filter): Observable<filterDTO<VaiTro>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy menu theo id
    LayVaiTro(guid: string): Observable<VaiTro> {
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatVaiTro(guid: string, data: VaiTro): Observable<VaiTro> {
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
    ThemVaiTro(data: VaiTro): Observable<VaiTro> {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaVaiTro(guid: string): Observable<VaiTro> {
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