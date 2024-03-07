import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, BaoCaoNam, BaoCaoCQTC, loaiCQ, BaoCaoNKH } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class BaoCaoNamService {

    data: BaoCaoNam[] = [
        {
            suKien: "Các Hội nghị Hội thảo quốc tế tổ chức 6 tháng đầu năm 2023",
            tenHoiThao: "Hội thảo quốc tế \"Nghiên cứu, phát hiện mới trong chính trị Việt Nam và thế giới\"",
            tenCoQuanPhoiHop: "Trường Đại học Khoa học Xã hội và Nhân văn",
            noiDung: "Nghiên cứu phát hiện mới trong chính trị Việt Nam và thế giới",
            thoiGian: new Date(),
            donViToChuc: "Trường Đại học Khoa học Xã hội và Nhân văn",
            soLuongDBNN: "3",
            soLuongDBVN: "3",
            from: ["Đức", "Mexico", "Hàn Quốc"],
            kinhPhi: "Trường NV",
            capPhepCho: "ĐHQGHN",
            hoatdong: "",
            ghiChu: "Đã nộp bc",
            guid: "1",
        }
    ]

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSBaoCaoNam(params?: Filter): Observable<BaoCaoNam[]> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy theo id
    LayBaoCaoNam(guid: string): Observable<BaoCaoNam> {
        const item = this.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatBaoCaoNam(guid: string, data: BaoCaoNam): Observable<BaoCaoNam> {
        const existingItemIndex = this.data.findIndex(item => item.guid === guid);
        if (existingItemIndex !== -1) {
            this.data[existingItemIndex] = {guid, ...data};
            return of({ guid, ...data });
        } else {
            // Trả về lỗi hoặc thông báo nếu không tìm thấy
            return of(null);
        }
    }

    // Thêm
    ThemBaoCaoNam(data: BaoCaoNam): Observable<BaoCaoNam> {
        const newGuid = (this.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaBaoCaoNam(guid: string): Observable<BaoCaoNam> {
        this.data = this.data.filter(item => item.guid !== guid);
        const existingItemIndex = this.data.findIndex(item => item.guid === guid);
        if (existingItemIndex !== -1) {
            const deletedItem = this.data.splice(existingItemIndex, 1)[0];
            return of(deletedItem);
        } else {
            // Trả về lỗi hoặc thông báo nếu không tìm thấy
            return of(null);
        }
    }
}

@Injectable()
export class BaoCaoCQTCService {

    loaiCoQuan: loaiCQ[] = [{
        text: 'CQTC NƯỚC NGOÀI',
        id: 1
    }, {
        text: 'CQTC VIỆT NAM',
        id: 2
    }]

    data: BaoCaoCQTC[] = [
        {
            coQuan: "Viện FESS",
            soLanPH: "3",
            kinhPhi: [200000000, 30000],
            loaiCoQuanID: 1,
            guid: "1",
        },
        {
            coQuan: "Viện AGK",
            soLanPH: "2",
            kinhPhi: [100000000],
            loaiCoQuanID: 1,
            guid: "2",
        },
        {
            coQuan: "Viện khoa học 1",
            soLanPH: "2",
            kinhPhi: [100000000],
            loaiCoQuanID: 2,
            guid: "3",
        },
        {
            coQuan: "Viện khoa học 2",
            soLanPH: "2",
            kinhPhi: [100000000],
            loaiCoQuanID: 2,
            guid: "4",
        }
    ]

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSBaoCaoCQTC(params?: Filter): Observable<BaoCaoCQTC[]> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy theo id
    LayBaoCaoCQTC(guid: string): Observable<BaoCaoCQTC> {
        const item = this.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatBaoCaoCQTC(guid: string, data: BaoCaoCQTC): Observable<BaoCaoCQTC> {
        const existingItemIndex = this.data.findIndex(item => item.guid === guid);
        if (existingItemIndex !== -1) {
            this.data[existingItemIndex] = {guid, ...data};
            return of({ guid, ...data });
        } else {
            // Trả về lỗi hoặc thông báo nếu không tìm thấy
            return of(null);
        }
    }

    // Thêm
    ThemBaoCaoCQTC(data: BaoCaoCQTC): Observable<BaoCaoCQTC> {
        const newGuid = (this.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaBaoCaoCQTC(guid: string): Observable<BaoCaoCQTC> {
        this.data = this.data.filter(item => item.guid !== guid);
        const existingItemIndex = this.data.findIndex(item => item.guid === guid);
        if (existingItemIndex !== -1) {
            const deletedItem = this.data.splice(existingItemIndex, 1)[0];
            return of(deletedItem);
        } else {
            // Trả về lỗi hoặc thông báo nếu không tìm thấy
            return of(null);
        }
    }
}

@Injectable()
export class BaoCaoNhaKHService {

    data: BaoCaoNKH[] = [
        {
            guid: '1',
            tenNhaKH: 'Mr. David Raya',
            quocTich: "Úc",
            soLanPH: '3',
            coQuan: 'Viện nghiên cứu A'
        },
        {
            guid: '2',
            tenNhaKH: 'Mr. Aaron Hickey',
            quocTich: "Mỹ",
            soLanPH: '2',
            coQuan: 'Viện nghiên cứu B'
        }
    ]

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSBaoCaoNhaKH(params?: Filter): Observable<BaoCaoNam[]> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy theo id
    LayBaoCaoNhaKH(guid: string): Observable<BaoCaoNKH> {
        const item = this.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatBaoCaoNhaKH(guid: string, data: BaoCaoNKH): Observable<BaoCaoNKH> {
        const existingItemIndex = this.data.findIndex(item => item.guid === guid);
        if (existingItemIndex !== -1) {
            this.data[existingItemIndex] = {guid, ...data};
            return of({ guid, ...data });
        } else {
            // Trả về lỗi hoặc thông báo nếu không tìm thấy
            return of(null);
        }
    }

    // Thêm
    ThemBaoCaoNhaKH(data: BaoCaoNKH): Observable<BaoCaoNKH> {
        const newGuid = (this.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaBaoCaoNhaKH(guid: string): Observable<BaoCaoNKH> {
        this.data = this.data.filter(item => item.guid !== guid);
        const existingItemIndex = this.data.findIndex(item => item.guid === guid);
        if (existingItemIndex !== -1) {
            const deletedItem = this.data.splice(existingItemIndex, 1)[0];
            return of(deletedItem);
        } else {
            // Trả về lỗi hoặc thông báo nếu không tìm thấy
            return of(null);
        }
    }
}