package vn.iworkspace.core.data.infrastructure.entity;

public enum TrangThaiEnum {
  DaXoa("Đã xóa"),
  KhongHoatDong("Không hoạt động"),
  HoatDong("Hoạt động");

  private final String label;

  TrangThaiEnum(String label) {
    this.label = label;
  }

  public String getLabel() {
    return label;
  }

}