export type Filter = {
    search?: string,
    dateFrom?: string | Date,
    dateTo?: string | Date,
    status?: string,
    // Chức vụ
    tenChucVu?: string;
    thuTu?: number;
    moTa?: string;
    pageIndex?: number;
    pageSize?: number;
    sort?: string;
    // Menu
    tenChucNang?: string;
    // Lĩnh vực
    tenLinhVuc?: string;
    // Nhân sự
    hoVaTen?: string;
    // tổ chức, đơn vị đồng tổ chưc
    tenDonVi?: string;
    // Trình độ
    ten?: string;
    // vai trò
    tenVaiTro?: string;
    // thông báo
    tieuDe?: string;
    // công nghệ tổ chức
    tenCongNghe?: string;
    // báo cáo
    namBaoCao?: number;
    loaiCQ?: number;
};


export const filter: Filter = {
    search: '',
    dateFrom: '',
    dateTo: '',
    status: '',
} 