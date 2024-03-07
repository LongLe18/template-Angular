import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ChucVu, Filter, filterDTO } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class ChucVuService {
    
    constructor(private http: HttpClient) {}

    // lấy danh sâch Chức vụ
    LayDSChucVu(params?: Filter): Observable<filterDTO<ChucVu>> {
        // sample handle parameters
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

        return this.http.get<filterDTO<ChucVu>>(`${environment.apiUrl}chucvu`, { params: newParams });
    }
    
    // Lấy chức vụ
    LayChucVu(guid: string): Observable<ChucVu> {
        return this.http.get<ChucVu>(`${environment.apiUrl}chucvu/${guid}`);
    }

    // Cập nhât chức vụ
    CapNhatChucVu(guid: string, data: ChucVu): Observable<ChucVu> {
        return this.http.put<ChucVu>(`${environment.apiUrl}chucvu/${guid}`, data);
    }

    // Thêm chức vụ
    ThemChucVu(data: ChucVu): Observable<ChucVu> {
        return this.http.post<ChucVu>(`${environment.apiUrl}chucvu`, data);
    }

    // Xóa chức vụ
    XoaChucVu(guid: string): Observable<ChucVu> {
        return this.http.delete<ChucVu>(`${environment.apiUrl}chucvu/${guid}`);
    }
}