export type NguoiGui = {
    nguoiGuiID?: string,
    hoVaTen?: string,
    email?: string,
    avatar?: string,
}

export interface ThongBao extends NguoiGui {
    tieuDe?: string,
    thoiGian?: Date,
    nguoiGui?: NguoiGui,
    guid?: string,
}