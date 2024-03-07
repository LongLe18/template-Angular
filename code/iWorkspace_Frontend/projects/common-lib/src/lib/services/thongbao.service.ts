import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, filterDTO, ThongBao } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class ThongBaoService {

    data: filterDTO<ThongBao> = {
        totalCount: 30, 
        pageIndex: 1, 
        totalPage: 2,
        data: [{
            guid: "1",
            nguoiGui: {
                hoVaTen: "Nguyễn Văn Nam",
                nguoiGuiID: "1",
                email: "nam@gmail.com",
                avatar: "../../../assets/images/avatar.jpg"
            },
            thoiGian: new Date(),
            tieuDe: "Bạn có hồ sơ Phát triển kỹ năng nghiêm cứu và công bố quốc tế trong lĩnh vực tư pháp hình sự và tội phạm học chờ xử lý"
        }]
    }

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSThongBao(params?: Filter): Observable<filterDTO<ThongBao>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy theo id
    LayThongBao(guid: string): Observable<ThongBao> {
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatThongBao(guid: string, data: ThongBao): Observable<ThongBao> {
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
    ThemThongBao(data: ThongBao): Observable<ThongBao> {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaThongBao(guid: string): Observable<ThongBao> {
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