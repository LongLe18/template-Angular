import { TRANGTHAI } from "../enums";

export type Permission = {
    guid?: string,
    tenChucNang?: string,
    permission?: Permission[],
}

export type Menu = {
    tenChucNang?: string,
    chucNangCha?: string,
    chucNangChaID?: string,
    thuTu?: number | string,
    guid?: string,
    url?: string,
    permission?: Permission[],
    vaiTro?: string[],
    trangThai?: TRANGTHAI,
};



export const permission: Permission[] = [
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
    }, {
        guid: '6',
        tenChucNang: 'Đăng ký thủ tục hành chính',
    }, {
        guid: '7',
        tenChucNang: 'Phê duyệt thủ tục hành chính',
    }, {
        guid: '8',
        tenChucNang: 'Tiếp nhận xử lý hồ sơ mức phòng ban',
    }, {
        guid: '9',
        tenChucNang: 'Trao đổi xử lý hồ sơ mức phòng ban',
    }, {
        guid: '10',
        tenChucNang: 'Phê duyệt xử lý hồ sơ mức phòng ban',
    }
]