package vn.iworkspace.core.data.infrastructure.entity;

public enum QuyenEnum {
  NguoiDung("Người dùng"),
  QuanTriDonVi("Quản trị đơn vị"),
  QuanTriHeThong("Quản trị hệ thống");

  private final String label;

  QuyenEnum(String label) {
    this.label = label;
  }

  public String getLabel() {
    return label;
  }

}