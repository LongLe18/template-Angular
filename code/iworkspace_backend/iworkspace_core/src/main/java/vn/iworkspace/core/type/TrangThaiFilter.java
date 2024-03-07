package vn.iworkspace.core.type;

public enum TrangThaiFilter {

    HoatDong, // TrangThai = 2
    KhongHoatDong, // TrangThai = 1
    DaXoa, // TrangThai = 0
    KhacHoatDong, // TrangThai != 2
    KhacKhongHoatDong, // TrangThai != 1
    KhacDaXoa, // TrangThai != 0
    TatCa, // Tất cả các bản ghi
    HoatDongVaKhongHoatDong, // TrangThai > 0
    KhongHoatDongVaDaXoa // TrangThai < 2
}
