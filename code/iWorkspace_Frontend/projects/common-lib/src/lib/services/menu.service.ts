import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Filter, filterDTO, Menu } from "../constants/types";
import { environment } from "projects/main/environments/environment";

@Injectable()
export class MenuService {
    
    
    DanhMucCha: Menu[] = [
        {
            tenChucNang: "Quản trị hệ thống",
            thuTu: 0,
            guid: '20',
        }, {
            tenChucNang: "Quản trị danh mục ĐKHNHT",
            thuTu: 0,
            guid: '21',
            permission: [
                {
                    guid: '1',
                    tenChucNang: 'Đơn vị đồng tổ chức',
                }, {
                    guid: '2',
                    tenChucNang: 'Công nghệ tổ chức',
                }, {
                    guid: '3',
                    tenChucNang: 'Đại biểu nước ngoài',
                }, {
                    guid: '4',
                    tenChucNang: 'Địa điểm',
                }, {
                    guid: '5',
                    tenChucNang: 'Loại tiền tệ',
                }
            ]
        }, {
            tenChucNang: "Đăng ký HNHTQT",
            thuTu: 0,
            guid: '23',
            permission: [
                {
                    guid: '6',
                    tenChucNang: 'Đăng ký thủ tục hành chính',
                    permission: [
                        {
                            guid: '8',
                            tenChucNang: 'Tiếp nhận xử lý hồ sơ mức phòng ban',
                        }, {
                            guid: '9',
                            tenChucNang: 'Trao đổi xử lý hồ sơ mức phòng ban',
                        }
                    ]
                }, {
                    guid: '7',
                    tenChucNang: 'Phê duyệt thủ tục hành chính',
                    permission: [
                        {
                            guid: '10',
                            tenChucNang: 'Phê duyệt xử lý hồ sơ mức phòng ban',
                        }
                    ]
                }
            ]
        }, 
    ];

    data: filterDTO<Menu> = {
        totalCount: 30, 
        pageIndex: 1, 
        totalPage: 2,
        data: [{
            guid: "1",
            tenChucNang: "Quản lý cơ cấu tổ chức",
            url: '/tochuc',
            chucNangCha: 'Quản trị hệ thống',
            chucNangChaID: '20',
            thuTu: 1,
            vaiTro: ['1']
        }, {
            guid: "2",
            tenChucNang: "Quản lý nhân sự",
            url: '/nhansu',
            chucNangCha: 'Quản trị danh mục ĐKHNHT',
            chucNangChaID: '21',
            thuTu: 2,
            vaiTro: ['2']
        }]
    }

    constructor(private http: HttpClient) {}

    // lấy danh sâch 
    LayDSMenu(params?: Filter): Observable<filterDTO<Menu>> {
        let newParams = new HttpParams();
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                newParams = newParams.set(key, params[key]);
            }
          }

          return of(this.data);
    }
    
    // Lấy menu theo id
    LayMenu(guid: string): Observable<Menu> {
        const item = this.data.data.find(item => item.guid === guid);
        return of(item);
    }

    // Cập nhât 
    CapNhatMenu(guid: string, data: Menu): Observable<Menu> {
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
    ThemMenu(data: Menu): Observable<Menu> {
        const newGuid = (this.data.data.length + 1).toString();
        const newData = { guid: newGuid, ...data };
        this.data.data.push(newData);
        return of(newData);
    }

    // Xóa 
    XoaMenu(guid: string): Observable<Menu> {
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